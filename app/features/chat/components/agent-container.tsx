"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentChatMessage, AgentTypingIndicator } from "./agent-message";
import { ChatInputWithImage } from "./chat-input-with-image";
import type { AgentMessage } from "@/app/lib/agent-types";

interface AgentContainerProps {
  messages: AgentMessage[];
  onSendMessage: (content: string, imageData?: string) => void;
  isLoading?: boolean;
}

/**
 * Agent 聊天容器组件
 */
export function AgentContainer({
  messages,
  onSendMessage,
  isLoading = false,
}: AgentContainerProps) {
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
        <div className="mx-auto max-w-full px-3">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <AgentChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
              />
            ))}
          </AnimatePresence>

          {/* 加载指示器 */}
          <AnimatePresence>
            {isLoading && <AgentTypingIndicator />}
          </AnimatePresence>

          {/* 滚动锚点 */}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* 输入区域 */}
      <div
        className="shrink-0 border-t border-slate-200/50 bg-white/70 
                   pt-4 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70"
      >
        <ChatInputWithImage onSend={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

/** Agent 空状态组件 */
export function AgentEmptyState() {
  const suggestions = [
    { icon: "🚀", text: "创建一个现代化的 Todo 应用", desc: "带有动画和本地存储" },
    { icon: "🎨", text: "设计一个个人作品集网站", desc: "响应式布局，暗色主题" },
    { icon: "📊", text: "构建一个数据仪表板", desc: "图表展示，实时更新" },
    { icon: "🛒", text: "开发一个电商产品页面", desc: "商品展示，购物车功能" },
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
        <div
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center 
                     rounded-2xl bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 
                     shadow-2xl shadow-primary-500/40"
        >
          <span className="text-4xl">⚡</span>
        </div>
        <h1 className="gradient-text text-4xl font-bold tracking-tight md:text-5xl">
          AI App Builder
        </h1>
        <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
          描述你想要的应用，或者粘贴设计截图，AI 将帮你生成完整的代码并预览
        </p>
      </motion.div>

      {/* 功能亮点 */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {[
          { icon: "📝", label: "描述需求" },
          { icon: "📸", label: "粘贴截图" },
          { icon: "🔧", label: "自动生成" },
          { icon: "👀", label: "实时预览" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-2 rounded-full border border-slate-200/60 
                       bg-white/80 px-4 py-2 text-sm shadow-sm
                       dark:border-slate-600/50 dark:bg-slate-800/80"
          >
            <span>{item.icon}</span>
            <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* 快速建议 */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-xl border border-slate-200/60 bg-white/80 p-4 
                       text-left transition-all
                       hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10
                       dark:border-slate-600/50 dark:bg-slate-800/80 
                       dark:hover:border-primary-600"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{suggestion.icon}</span>
              <div>
                <span
                  className="block font-medium text-slate-700 group-hover:text-primary-600 
                             dark:text-slate-200 dark:group-hover:text-primary-400"
                >
                  {suggestion.text}
                </span>
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  {suggestion.desc}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 提示 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-sm text-slate-400 dark:text-slate-500"
      >
        💡 提示: 使用 <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">Cmd/Ctrl + V</kbd> 可以直接粘贴截图
      </motion.p>
    </motion.div>
  );
}

