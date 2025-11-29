"use client";

import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { 
  User, 
  Sparkles, 
  Copy, 
  Check, 
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { AgentMessage, OperationLog, RequirementUnderstanding } from "@/app/lib/agent-types";

interface AgentChatMessageProps {
  message: AgentMessage;
  isLatest?: boolean;
}

/**
 * Agent 消息组件
 * 简洁版本，不显示思考过程和操作细节
 */
export function AgentChatMessage({ message, isLatest = false }: AgentChatMessageProps) {
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
          {isUser ? "你" : "AI 魔法师"}
        </div>

        {/* 用户图片预览 */}
        {isUser && message.imageData && (
          <div className="mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
          {/* 消息文本 - 用户消息直接显示，AI消息使用Markdown */}
          {isUser ? (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          ) : (
            <div className="prose prose-sm prose-slate max-w-none dark:prose-invert
                            prose-p:my-1.5 prose-p:leading-relaxed
                            prose-headings:mt-3 prose-headings:mb-2 prose-headings:font-semibold
                            prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
                            prose-ul:my-2 prose-ul:pl-4 prose-ol:my-2 prose-ol:pl-4
                            prose-li:my-0.5
                            prose-strong:font-semibold prose-strong:text-primary-600 dark:prose-strong:text-primary-400
                            prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 
                            prose-code:text-xs prose-code:font-normal prose-code:text-pink-600
                            dark:prose-code:bg-slate-700 dark:prose-code:text-pink-400
                            prose-pre:my-2 prose-pre:rounded-lg prose-pre:bg-slate-900 prose-pre:p-3
                            prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
              {isStreaming && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="ml-1 inline-block h-4 w-0.5 bg-current"
                />
              )}
            </div>
          )}

          {/* 制作完成提示 */}
          {!isUser && message.actions && message.actions.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>已为你完成制作，请查看右侧预览 ✨</span>
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

/** 魔法进度面板属性 */
interface MagicProgressPanelProps {
  logs: OperationLog[];
  progress: number;
  understanding?: RequirementUnderstanding | null;
}

/**
 * 魔法进度面板组件
 * 简洁友好的进度展示，适合非程序员用户
 */
export function OperationLogPanel({ logs, progress, understanding }: MagicProgressPanelProps) {
  // 获取最新的状态消息
  const latestMessage = logs.length > 0 ? logs[logs.length - 1].message : "准备中...";
  
  // 进度阶段图标
  const getStageIcon = (stageProgress: number) => {
    if (progress >= stageProgress) {
      return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    }
    if (progress >= stageProgress - 20) {
      return <Loader2 className="h-4 w-4 animate-spin text-primary-400" />;
    }
    return <div className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />;
  };

  const stages = [
    { name: "理解需求", progress: 25 },
    { name: "创意构思", progress: 50 },
    { name: "魔法制作", progress: 80 },
    { name: "完成", progress: 100 },
  ];

  // 判断是否在理解需求阶段
  const isUnderstandingPhase = progress > 0 && progress <= 25;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl border border-primary-200/30 
                 bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20 
                 p-4 shadow-lg shadow-primary-500/5
                 dark:border-primary-500/20 dark:from-slate-800/90 
                 dark:via-primary-900/20 dark:to-accent-900/10"
    >
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 
                      rounded-full bg-gradient-to-br from-primary-400/20 to-accent-400/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 
                      rounded-full bg-gradient-to-br from-accent-400/15 to-primary-400/15 blur-2xl" />

      {/* 魔法动画图标 */}
      <div className="relative mb-4 flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="flex h-16 w-16 items-center justify-center rounded-full 
                     bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 
                     shadow-lg shadow-primary-500/30"
        >
          <motion.span 
            className="text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isUnderstandingPhase ? "🔍" : "✨"}
          </motion.span>
        </motion.div>
        
        {/* 环绕的粒子效果 */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-accent-400"
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "linear",
            }}
            style={{
              transformOrigin: "40px 40px",
            }}
          />
        ))}
      </div>

      {/* 当前状态文字 */}
      <motion.div 
        key={latestMessage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 text-center"
      >
        <p className="text-base font-medium text-slate-700 dark:text-slate-200">
          {latestMessage}
        </p>
      </motion.div>

      {/* 需求理解展示区域 */}
      <AnimatePresence>
        {understanding && (understanding.requirement || understanding.keywords) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden rounded-xl bg-white/60 p-3 
                       dark:bg-slate-700/40"
          >
            {/* 需求摘要 */}
            {understanding.requirement && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-2"
              >
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {understanding.requirement}
                </p>
              </motion.div>
            )}
            
            {/* 识别的关键词标签 */}
            {understanding.keywords && understanding.keywords.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-1.5"
              >
                {understanding.keywords.map((keyword, idx) => (
                  <motion.span
                    key={keyword}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * idx }}
                    className="inline-flex items-center rounded-full bg-primary-100 
                               px-2 py-0.5 text-xs font-medium text-primary-700
                               dark:bg-primary-900/50 dark:text-primary-300"
                  >
                    {keyword}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* 理解确认标记 */}
            {understanding.confirmed && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-2 flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>需求已理解，开始创作！</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 进度条 */}
      <div className="mb-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/50 dark:bg-slate-700/50">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <div className="mt-1 text-center">
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
            {progress}%
          </span>
        </div>
      </div>

      {/* 阶段指示器 */}
      <div className="flex items-center justify-between px-2">
        {stages.map((stage) => (
          <div key={stage.name} className="flex flex-col items-center gap-1">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: progress >= stage.progress ? 1 : 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {getStageIcon(stage.progress)}
            </motion.div>
            <span className={clsx(
              "text-[10px] font-medium transition-colors",
              progress >= stage.progress 
                ? "text-primary-600 dark:text-primary-400" 
                : "text-slate-400 dark:text-slate-500"
            )}>
              {stage.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/** 加载指示器属性 */
interface AgentTypingIndicatorProps {
  logs?: OperationLog[];
  progress?: number;
  understanding?: RequirementUnderstanding | null;
}

/** 加载指示器 - 魔法风格 */
export function AgentTypingIndicator({ logs = [], progress = 0, understanding = null }: AgentTypingIndicatorProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // 计时器
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}分${secs}秒`;
    }
    return `${secs}秒`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 px-4 py-4 md:px-6"
    >
      {/* 头像 */}
      <motion.div
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(139, 92, 246, 0.3)",
            "0 0 40px rgba(251, 146, 60, 0.4)",
            "0 0 20px rgba(139, 92, 246, 0.3)",
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl 
                   bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 text-white"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* 魔法进度面板 */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            AI 魔法师
          </span>
          {elapsedSeconds >= 3 && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-slate-400 dark:text-slate-500"
            >
              · 已用时 {formatTime(elapsedSeconds)}
            </motion.span>
          )}
        </div>
        
        {/* 魔法进度面板 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-md"
        >
          <OperationLogPanel logs={logs} progress={progress} understanding={understanding} />
        </motion.div>
      </div>
    </motion.div>
  );
}

