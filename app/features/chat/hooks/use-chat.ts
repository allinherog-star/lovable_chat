"use client";

import { useState, useCallback } from "react";
import type { Message, ChatResponse } from "../types";
import { generateId } from "../types";

interface UseChatOptions {
  initialMessages?: Message[];
  onError?: (error: Error) => void;
  /** API 端点，默认 /api/chat */
  apiEndpoint?: string;
  /** 是否使用模拟模式（静态导出时使用） */
  mockMode?: boolean;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

/**
 * 生成模拟 AI 响应
 */
function generateMockResponse(userMessage: string): string {
  if (userMessage.includes("你好") || userMessage.includes("hi") || userMessage.includes("hello")) {
    return "你好！很高兴见到你 👋 我是 Lovable Chat，一个 AI 助手。有什么我可以帮助你的吗？";
  }

  if (userMessage.includes("代码") || userMessage.includes("编程") || userMessage.includes("React")) {
    return `很棒的技术问题！🔧\n\n关于「${userMessage.slice(0, 30)}${userMessage.length > 30 ? "..." : ""}」：\n\n这是一个很有意思的问题。在现代前端开发中，我们通常会考虑：\n\n1. **组件设计** - 保持组件的单一职责\n2. **状态管理** - 选择合适的状态管理方案\n3. **性能优化** - 使用 memo、useMemo 等优化手段\n\n需要我详细解释某个方面吗？`;
  }

  if (userMessage.includes("写") || userMessage.includes("诗")) {
    return `让我来发挥一下创意 ✨\n\n🌸 春日随想\n\n晨光穿透薄雾轻，\n花开枝头鸟声鸣。\n微风拂面暖意生，\n万物复苏共此情。\n\n希望这首小诗能给你带来一丝春天的气息 🌷`;
  }

  return `感谢你的提问！关于「${userMessage.slice(0, 40)}${userMessage.length > 40 ? "..." : ""}」：\n\n这是一个很好的问题。让我来帮你分析：\n\n💡 **我的建议**\n1. 首先，让我们明确你的具体目标\n2. 然后，我可以提供更有针对性的帮助\n\n有什么具体的方面你想深入探讨吗？ 🚀`;
}

/**
 * 聊天功能 Hook
 * 管理消息列表、发送消息、加载状态等
 */
export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const { 
    initialMessages = [], 
    onError, 
    apiEndpoint = "/api/chat",
    mockMode = false,
  } = options;
  
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
      let responseContent: string;

      if (mockMode) {
        // 模拟模式 - 用于静态导出
        await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 800));
        responseContent = generateMockResponse(content);
      } else {
        // 调用 API
        const response = await fetch(apiEndpoint, {
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
        responseContent = data.content;
      }

      // 创建助手消息
      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: responseContent,
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
  }, [isLoading, onError, apiEndpoint, mockMode]);

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

