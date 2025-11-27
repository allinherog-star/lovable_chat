"use client";

import { useState, useCallback } from "react";
import type { Message, ChatResponse } from "../types";
import { generateId } from "../types";

interface UseChatOptions {
  initialMessages?: Message[];
  onError?: (error: Error) => void;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

/**
 * 聊天功能 Hook
 * 管理消息列表、发送消息、加载状态等
 */
export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const { initialMessages = [], onError } = options;
  
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * 发送消息
   */
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // 创建用户消息
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
      status: "completed",
    };

    // 添加用户消息
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // 调用 API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      // 创建助手消息
      const assistantMessage: Message = {
        id: data.id || generateId(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        status: "completed",
      };

      // 添加助手消息
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("未知错误");
      setError(error);
      onError?.(error);
      
      // 添加错误消息
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: "抱歉，发生了一些错误。请稍后重试。",
        timestamp: new Date(),
        status: "error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, onError]);

  /**
   * 清空消息
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}

