"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentChatMessage, AgentTypingIndicator } from "./agent-message";
import { ChatInputWithImage } from "./chat-input-with-image";
import type { AgentMessage, OperationLog, RequirementUnderstanding } from "@/app/lib/agent-types";
import { ListTodo, Palette, BarChart3, ShoppingBag } from "lucide-react";

interface AgentContainerProps {
  messages: AgentMessage[];
  onSendMessage: (content: string, imageData?: string) => void;
  isLoading?: boolean;
  operationLogs?: OperationLog[];
  progress?: number;
  understanding?: RequirementUnderstanding | null;
}

/**
 * Agent 聊天容器组件
 */
export function AgentContainer({
  messages,
  onSendMessage,
  isLoading = false,
  operationLogs = [],
  progress = 0,
  understanding = null,
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
            {isLoading && <AgentTypingIndicator logs={operationLogs} progress={progress} understanding={understanding} />}
          </AnimatePresence>

          {/* 滚动锚点 */}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* 输入区域 - 移动端需要留出底部导航栏空间 */}
      <div
        className="shrink-0 border-t border-slate-200/50 bg-white/70 
                   pb-16 pt-4 backdrop-blur-xl 
                   dark:border-slate-700/50 dark:bg-slate-900/70
                   md:pb-0"
      >
        <ChatInputWithImage onSend={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

/** Agent 空状态组件 */
export function AgentEmptyState() {
  const suggestions = [
    { 
      icon: ListTodo, 
      text: "创建一个现代化的 Todo 应用", 
      desc: "带有动画和本地存储",
      color: "from-emerald-500 to-teal-500"
    },
    { 
      icon: Palette, 
      text: "设计一个个人作品集网站", 
      desc: "响应式布局，暗色主题",
      color: "from-violet-500 to-purple-500"
    },
    { 
      icon: BarChart3, 
      text: "构建一个数据仪表板", 
      desc: "图表展示，实时更新",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: ShoppingBag, 
      text: "开发一个电商产品页面", 
      desc: "商品展示，购物车功能",
      color: "from-orange-500 to-amber-500"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex min-h-full flex-col items-center justify-center px-4 py-8"
    >
      {/* Logo 和标题 */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-6 text-center sm:mb-8"
      >
        <div
          className="mx-auto mb-3 flex h-16 w-16 items-center justify-center 
                     rounded-2xl bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 
                     shadow-2xl shadow-primary-500/40 sm:mb-4 sm:h-20 sm:w-20"
        >
          <span className="text-3xl sm:text-4xl">⚡</span>
        </div>
        <h1 className="gradient-text text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Lovable Chat
        </h1>
        <p className="mt-2 max-w-md text-base text-slate-400 dark:text-slate-500 sm:mt-3 sm:text-lg">
          让AI释放你的每一个创意
        </p>
      </motion.div>

      {/* 功能亮点 */}
      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8 sm:gap-3">
        {[
          { icon: "💡", label: "描述需求" },
          { icon: "🖼️", label: "粘贴截图" },
          { icon: "✨", label: "自动生成" },
          { icon: "👁️", label: "实时预览" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-1.5 rounded-full border border-slate-200/60 
                       bg-white/80 px-3 py-1.5 text-xs shadow-sm
                       dark:border-slate-600/50 dark:bg-slate-800/80
                       sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span>{item.icon}</span>
            <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* 快速建议 */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-xl border border-slate-200/60 bg-white/80 p-3 
                       text-left transition-all active:scale-[0.98]
                       hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10
                       dark:border-slate-600/50 dark:bg-slate-800/80 
                       dark:hover:border-primary-600 sm:p-4"
          >
            <div className="flex items-start gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${suggestion.color} shadow-md sm:h-10 sm:w-10`}>
                <suggestion.icon className="h-4 w-4 text-white sm:h-5 sm:w-5" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className="block text-sm font-medium text-slate-700 group-hover:text-primary-600 
                             dark:text-slate-200 dark:group-hover:text-primary-400 sm:text-base"
                >
                  {suggestion.text}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400 sm:mt-1">
                  {suggestion.desc}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 提示 - 移动端隐藏键盘快捷键提示 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 sm:mt-8 sm:text-sm"
      >
        <span className="hidden sm:inline">
          💡 提示: 使用 <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">Cmd/Ctrl + V</kbd> 可以直接粘贴截图
        </span>
        <span className="sm:hidden">
          💡 在下方输入你的想法，或上传截图
        </span>
      </motion.p>
    </motion.div>
  );
}

