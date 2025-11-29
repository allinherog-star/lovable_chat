"use client";

import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { 
  User, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronRight,
  FileCode,
  Terminal,
  Trash2,
  Edit,
  Image
} from "lucide-react";
import { useState, useEffect } from "react";
import type { AgentMessage, AgentAction } from "@/app/lib/agent-types";

interface AgentChatMessageProps {
  message: AgentMessage;
  isLatest?: boolean;
}

/**
 * Agent 消息组件
 * 支持显示思考过程、代码操作等
 */
export function AgentChatMessage({ message, isLatest = false }: AgentChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const isUser = message.role === "user";
  const isStreaming = message.status === "streaming";

  // 复制消息内容
  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 获取操作图标
  const getActionIcon = (type: AgentAction["type"]) => {
    switch (type) {
      case "create_file":
        return <FileCode className="h-3.5 w-3.5 text-green-500" />;
      case "modify_file":
        return <Edit className="h-3.5 w-3.5 text-blue-500" />;
      case "delete_file":
        return <Trash2 className="h-3.5 w-3.5 text-red-500" />;
      case "execute_command":
        return <Terminal className="h-3.5 w-3.5 text-yellow-500" />;
      default:
        return <FileCode className="h-3.5 w-3.5 text-slate-500" />;
    }
  };

  // 获取操作标签
  const getActionLabel = (action: AgentAction) => {
    switch (action.type) {
      case "create_file":
        return `创建 ${action.path}`;
      case "modify_file":
        return `修改 ${action.path}`;
      case "delete_file":
        return `删除 ${action.path}`;
      case "execute_command":
        return `执行 ${action.command}`;
      default:
        return "未知操作";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: isLatest ? 0.1 : 0,
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
          "relative max-w-[85%] md:max-w-[80%]",
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
          {isUser ? "你" : "AI Agent"}
        </div>

        {/* 用户图片预览 */}
        {isUser && message.imageData && (
          <div className="mb-2">
            <img
              src={message.imageData}
              alt="用户上传的图片"
              className="max-h-48 rounded-lg shadow-md"
            />
          </div>
        )}

        {/* 消息气泡 */}
        <div
          className={clsx(
            "relative rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white"
              : "border border-slate-200/60 bg-white/90 text-slate-700 shadow-sm dark:border-slate-600/50 dark:bg-slate-800/90 dark:text-slate-100"
          )}
        >
          {/* 思考过程折叠区 */}
          {!isUser && message.thinking && (
            <div className="mb-3">
              <button
                onClick={() => setShowThinking(!showThinking)}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 
                           dark:text-slate-400 dark:hover:text-slate-300"
              >
                {showThinking ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
                <span>💭 思考过程</span>
              </button>
              <AnimatePresence>
                {showThinking && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 overflow-hidden rounded-lg bg-slate-100/50 p-3 text-xs 
                               text-slate-600 dark:bg-slate-700/50 dark:text-slate-300"
                  >
                    {message.thinking}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* 消息文本 */}
          <div className="whitespace-pre-wrap break-words">
            {message.content}
            {isStreaming && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="ml-1 inline-block h-4 w-0.5 bg-current"
              />
            )}
          </div>

          {/* 操作列表 */}
          {!isUser && message.actions && message.actions.length > 0 && (
            <div className="mt-3 border-t border-slate-200/50 pt-3 dark:border-slate-600/30">
              <button
                onClick={() => setShowActions(!showActions)}
                className="mb-2 flex items-center gap-1 text-xs font-medium 
                           text-slate-600 dark:text-slate-300"
              >
                {showActions ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
                <span>🔧 执行了 {message.actions.length} 个操作</span>
              </button>
              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-1.5 overflow-hidden"
                  >
                    {message.actions.map((action, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 rounded-lg bg-slate-100/50 
                                   px-2.5 py-1.5 text-xs dark:bg-slate-700/50"
                      >
                        {getActionIcon(action.type)}
                        <span className="truncate text-slate-600 dark:text-slate-300">
                          {getActionLabel(action)}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* 复制按钮 */}
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

/** 加载指示器 */
export function AgentTypingIndicator() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // 计时器
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 根据时间显示不同的提示
  const getStatusMessage = () => {
    if (elapsedSeconds < 10) return "正在分析需求...";
    if (elapsedSeconds < 30) return "正在设计代码结构...";
    if (elapsedSeconds < 60) return "正在编写代码...";
    if (elapsedSeconds < 90) return "正在生成完整项目...（复杂项目需要较长时间）";
    return "仍在处理中，请耐心等待...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 px-4 py-4 md:px-6"
    >
      {/* 头像 */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl 
                   bg-gradient-to-br from-accent-400 to-accent-500 text-white 
                   shadow-lg shadow-accent-500/30"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>
      </div>

      {/* 状态信息 */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          AI Agent
        </span>
        <div
          className="flex flex-col gap-1 rounded-2xl border border-slate-200/60 
                     bg-white/90 px-4 py-3 shadow-sm 
                     dark:border-slate-600/50 dark:bg-slate-800/90"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-primary-500"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {getStatusMessage()}
            </span>
          </div>
          {elapsedSeconds >= 5 && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-slate-400 dark:text-slate-500"
            >
              已用时 {elapsedSeconds} 秒
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

