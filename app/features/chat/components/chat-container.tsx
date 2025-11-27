"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage, TypingIndicator } from "./chat-message";
import { ChatInput } from "./chat-input";
import type { Message } from "../types";

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

/**
 * 聊天容器组件
 * 管理消息列表、自动滚动、输入发送
 */
export function ChatContainer({
  messages,
  onSendMessage,
  isLoading = false,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      {/* 消息列表区域 */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
              />
            ))}
          </AnimatePresence>

          {/* 加载指示器 */}
          <AnimatePresence>
            {isLoading && <TypingIndicator />}
          </AnimatePresence>

          {/* 滚动锚点 */}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* 输入区域 */}
      <div className="shrink-0 border-t border-slate-200/50 bg-white/70 
                      pt-4 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70">
        <ChatInput onSend={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

/** 空状态组件 */
export function EmptyState() {
  const suggestions = [
    "帮我写一首关于春天的现代诗",
    "用 React 实现一个计数器组件",
    "解释量子纠缠的概念",
    "规划一次东京5日游",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex h-full flex-col items-center justify-center px-4"
    >
      {/* Logo 和标题 */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center 
                        rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 
                        shadow-xl shadow-primary-500/30">
          <span className="text-3xl">✨</span>
        </div>
        <h1 className="gradient-text text-3xl font-bold tracking-tight md:text-4xl">
          Lovable Chat
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          让 AI 帮你实现每一个创意
        </p>
      </motion.div>

      {/* 快速建议 */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={suggestion}
            text={suggestion}
            delay={0.3 + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface SuggestionCardProps {
  text: string;
  delay?: number;
}

function SuggestionCard({ text, delay = 0 }: SuggestionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group rounded-xl border border-slate-200/60 bg-white/80 p-4 
                 text-left text-sm text-slate-600 transition-all
                 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10
                 dark:border-slate-600/50 dark:bg-slate-800/80 dark:text-slate-300 
                 dark:hover:border-primary-600"
    >
      <span className="block truncate group-hover:text-primary-600 
                       dark:group-hover:text-primary-400">
        {text}
      </span>
    </motion.button>
  );
}

