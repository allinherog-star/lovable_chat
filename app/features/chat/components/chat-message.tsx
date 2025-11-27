"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { User, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { Message } from "../types";

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
}

/**
 * 聊天消息气泡组件
 * 区分用户消息和 AI 助手消息，支持复制功能
 */
export function ChatMessage({ message, isLatest = false }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const isStreaming = message.status === "streaming";

  // 复制消息内容
  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: isLatest ? 0.1 : 0 
      }}
      className={clsx(
        "group flex w-full gap-3 px-4 py-4 md:px-6",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* 头像 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className={clsx(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          isUser
            ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
            : "bg-gradient-to-br from-accent-400 to-accent-500 text-white shadow-lg shadow-accent-500/30"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
      </motion.div>

      {/* 消息内容 */}
      <div
        className={clsx(
          "relative max-w-[80%] md:max-w-[70%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* 角色标签 */}
        <div
          className={clsx(
            "mb-1.5 text-xs font-medium",
            isUser
              ? "text-right text-slate-500 dark:text-slate-400"
              : "text-left text-slate-500 dark:text-slate-400"
          )}
        >
          {isUser ? "你" : "AI 助手"}
        </div>

        {/* 消息气泡 */}
        <div
          className={clsx(
            "relative rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white"
              : "border border-slate-200/60 bg-white/90 text-slate-700 shadow-sm dark:border-slate-600/50 dark:bg-slate-800/90 dark:text-slate-100"
          )}
        >
          {/* 消息文本 */}
          <p className="whitespace-pre-wrap break-words">
            {message.content}
            {isStreaming && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="ml-1 inline-block h-4 w-0.5 bg-current"
              />
            )}
          </p>

          {/* 复制按钮 - 仅非用户消息显示 */}
          {!isUser && message.status === "completed" && (
            <motion.button
              initial={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={handleCopy}
              className="absolute -bottom-8 left-0 flex items-center gap-1 
                         text-xs text-slate-400 opacity-0 transition-opacity 
                         hover:text-primary-500 group-hover:opacity-100
                         dark:text-slate-500 dark:hover:text-primary-400"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>复制</span>
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/** 打字中指示器 */
export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 px-4 py-4 md:px-6"
    >
      {/* 头像 */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl 
                      bg-gradient-to-br from-accent-400 to-accent-500 text-white 
                      shadow-lg shadow-accent-500/30">
        <Sparkles className="h-4 w-4" />
      </div>

      {/* 打字动画 */}
      <div className="flex items-center gap-1 rounded-2xl border border-slate-200/60 
                      bg-white/90 px-4 py-3 shadow-sm 
                      dark:border-slate-600/50 dark:bg-slate-800/90">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="typing-dot h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

