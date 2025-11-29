"use client";

import { useState, useCallback, useRef } from "react";
import type { AgentMessage, Project, AgentChatResponse } from "@/app/lib/agent-types";

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
  sendMessage: (content: string, imageData?: string) => Promise<void>;
  clearMessages: () => void;
  setProject: (project: Project | null) => void;
  restartPreview: () => Promise<void>;
}

/**
 * Agent 聊天 Hook
 * 管理与 AI Agent 的对话、项目状态等
 */
export function useAgentChat(options: UseAgentChatOptions = {}): UseAgentChatReturn {
  const { onError, onProjectUpdate } = options;

  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  
  const conversationHistoryRef = useRef<AgentMessage[]>([]);

  /**
   * 发送消息给 Agent
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

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

      const data: AgentChatResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || "AI 响应失败");
      }

      // 更新项目
      if (data.project) {
        setProject(data.project);
        onProjectUpdate?.(data.project);
      }

      // 创建助手消息
      const assistantMessage: AgentMessage = {
        id: generateId(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
        thinking: data.thinking,
        actions: data.actions,
        status: "completed",
      };

      // 添加助手消息
      setMessages((prev) => [...prev, assistantMessage]);
      conversationHistoryRef.current = [...conversationHistoryRef.current, assistantMessage];
    } catch (err) {
      const error = err instanceof Error ? err : new Error("未知错误");
      setError(error);
      onError?.(error);

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
  }, [isLoading, project, onError, onProjectUpdate]);

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
    sendMessage,
    clearMessages,
    setProject,
    restartPreview,
  };
}
