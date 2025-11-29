"use client";

import { useState, useCallback, useRef } from "react";
import type { AgentMessage, Project, AgentChatResponse, OperationLog, StreamEvent, RequirementUnderstanding } from "@/app/lib/agent-types";

/** 生成唯一 ID */
function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

interface UseAgentChatOptions {
  onError?: (error: Error) => void;
  onProjectUpdate?: (project: Project) => void;
}

interface UseAgentChatReturn {
  messages: AgentMessage[];
  isLoading: boolean;
  error: Error | null;
  project: Project | null;
  operationLogs: OperationLog[];
  progress: number;
  understanding: RequirementUnderstanding | null;
  sendMessage: (content: string, imageData?: string) => Promise<void>;
  clearMessages: () => void;
  setProject: (project: Project | null) => void;
  restartPreview: () => Promise<void>;
  clearLogs: () => void;
}

/**
 * Agent 聊天 Hook
 * 管理与 AI Agent 的对话、项目状态等
 * 支持流式日志显示
 */
export function useAgentChat(options: UseAgentChatOptions = {}): UseAgentChatReturn {
  const { onError, onProjectUpdate } = options;

  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [operationLogs, setOperationLogs] = useState<OperationLog[]>([]);
  const [progress, setProgress] = useState(0);
  const [understanding, setUnderstanding] = useState<RequirementUnderstanding | null>(null);
  
  const conversationHistoryRef = useRef<AgentMessage[]>([]);

  /**
   * 添加操作日志
   */
  const addLog = useCallback((type: OperationLog["type"], message: string, detail?: string) => {
    const log: OperationLog = {
      id: generateId(),
      timestamp: new Date(),
      type,
      message,
      detail,
    };
    setOperationLogs(prev => [...prev, log]);
  }, []);

  /**
   * 清空日志
   */
  const clearLogs = useCallback(() => {
    setOperationLogs([]);
    setProgress(0);
    setUnderstanding(null);
  }, []);

  /**
   * 发送消息给 Agent（使用流式响应）
   */
  const sendMessage = useCallback(async (content: string, imageData?: string) => {
    if ((!content.trim() && !imageData) || isLoading) return;

    // 创建用户消息
    const userMessage: AgentMessage = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
      imageData,
      status: "completed",
    };

    // 添加用户消息
    setMessages((prev) => [...prev, userMessage]);
    conversationHistoryRef.current = [...conversationHistoryRef.current, userMessage];
    
    setIsLoading(true);
    setError(null);
    clearLogs();

    try {
      addLog("info", "开始处理请求...");

      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify({
          message: content.trim(),
          imageData,
          projectId: project?.id,
          conversationHistory: conversationHistoryRef.current.slice(-10),
        }),
      });

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`);
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("无法读取响应流");
      }

      const decoder = new TextDecoder();
      let buffer = "";
      let finalResult: StreamEvent["data"] | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const event: StreamEvent = JSON.parse(line.slice(6));
              
              switch (event.type) {
                case "log":
                  addLog("info", event.data.message || "", event.data.detail);
                  break;
                case "thinking":
                  addLog("thinking", event.data.message || "思考中...", event.data.thinking);
                  break;
                case "action":
                  addLog("action", event.data.message || "", event.data.detail);
                  if (event.data.progress !== undefined) {
                    setProgress(event.data.progress);
                  }
                  break;
                case "progress":
                  addLog("progress", event.data.message || "");
                  if (event.data.progress !== undefined) {
                    setProgress(event.data.progress);
                  }
                  break;
                case "understanding":
                  addLog("understanding", event.data.message || "理解需求中...");
                  if (event.data.progress !== undefined) {
                    setProgress(event.data.progress);
                  }
                  // 更新需求理解状态
                  setUnderstanding(prev => ({
                    ...prev,
                    requirement: event.data.requirement || prev?.requirement,
                    keywords: event.data.keywords || prev?.keywords,
                    confirmed: event.data.confirmed || prev?.confirmed,
                  }));
                  break;
                case "error":
                  addLog("error", event.data.error || "发生错误");
                  throw new Error(event.data.error);
                case "result":
                  finalResult = event.data;
                  addLog("success", "处理完成!");
                  setProgress(100);
                  break;
              }
            } catch (e) {
              // 忽略解析错误
              if (e instanceof Error && e.message !== "发生错误" && !e.message.includes("AI")) {
                console.warn("解析 SSE 事件失败:", e);
              } else {
                throw e;
              }
            }
          }
        }
      }

      if (!finalResult) {
        throw new Error("未收到完整响应");
      }

      // 更新项目
      if (finalResult.project) {
        setProject(finalResult.project);
        onProjectUpdate?.(finalResult.project);
      }

      // 创建助手消息
      const assistantMessage: AgentMessage = {
        id: generateId(),
        role: "assistant",
        content: finalResult.message || "",
        timestamp: new Date(),
        thinking: finalResult.thinking,
        actions: finalResult.actions,
        status: "completed",
      };

      // 添加助手消息
      setMessages((prev) => [...prev, assistantMessage]);
      conversationHistoryRef.current = [...conversationHistoryRef.current, assistantMessage];
    } catch (err) {
      const error = err instanceof Error ? err : new Error("未知错误");
      setError(error);
      onError?.(error);
      addLog("error", error.message);

      // 添加错误消息
      const errorMessage: AgentMessage = {
        id: generateId(),
        role: "assistant",
        content: `抱歉，发生了错误: ${error.message}`,
        timestamp: new Date(),
        status: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, project, onError, onProjectUpdate, addLog, clearLogs]);

  /**
   * 重启预览
   */
  const restartPreview = useCallback(async () => {
    if (!project) return;

    try {
      const response = await fetch(`/api/agent/${project.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "restart" }),
      });

      const data = await response.json();
      if (data.success && data.project) {
        setProject(data.project);
        onProjectUpdate?.(data.project);
      }
    } catch (err) {
      console.error("重启预览失败:", err);
    }
  }, [project, onProjectUpdate]);

  /**
   * 清空消息
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    conversationHistoryRef.current = [];
    setProject(null);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    project,
    operationLogs,
    progress,
    understanding,
    sendMessage,
    clearMessages,
    setProject,
    restartPreview,
    clearLogs,
  };
}
