"use client";

import { motion } from "framer-motion";
import { Send, Sparkles, Mic, Paperclip } from "lucide-react";
import { useState, useRef, useEffect, type KeyboardEvent, type FormEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

/**
 * 聊天输入框组件
 * 支持自动扩展、快捷键发送
 */
export function ChatInput({ 
  onSend, 
  isLoading = false, 
  placeholder = "发送消息，开始创造..." 
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整高度
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  // 处理发送
  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
      // 重置高度
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  // 键盘事件处理
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto w-full max-w-3xl px-4 pb-6"
    >
      <form onSubmit={handleSubmit} className="relative">
        {/* 输入框容器 */}
        <div
          className="group relative overflow-hidden rounded-2xl border 
                     border-slate-200/60 bg-white/90 shadow-xl shadow-slate-200/20 
                     transition-all duration-300 
                     focus-within:border-primary-300 focus-within:shadow-primary-500/10
                     hover:border-slate-300/70
                     dark:border-slate-600/50 dark:bg-slate-800/90 dark:shadow-slate-900/30
                     dark:focus-within:border-primary-600 dark:hover:border-slate-500/70"
        >
          {/* 渐变装饰线 */}
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r 
                       from-transparent via-primary-400/50 to-transparent 
                       opacity-0 transition-opacity group-focus-within:opacity-100"
          />

          {/* 文本输入区 */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className="block w-full resize-none bg-transparent px-4 py-4 pr-32 
                       text-sm text-slate-800 placeholder-slate-400 
                       focus:outline-none disabled:cursor-not-allowed disabled:opacity-50
                       dark:text-white dark:placeholder-slate-400"
          />

          {/* 工具栏 */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            {/* 附件按钮 */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg 
                         text-slate-400 transition-colors hover:bg-slate-100 
                         hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              title="添加附件"
            >
              <Paperclip className="h-4 w-4" />
            </motion.button>

            {/* 语音按钮 */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg 
                         text-slate-400 transition-colors hover:bg-slate-100 
                         hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              title="语音输入"
            >
              <Mic className="h-4 w-4" />
            </motion.button>

            {/* 发送按钮 */}
            <motion.button
              type="submit"
              disabled={!message.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl 
                         bg-gradient-to-r from-primary-500 to-primary-600 
                         text-white shadow-lg shadow-primary-500/30 
                         transition-all disabled:cursor-not-allowed 
                         disabled:opacity-40 disabled:shadow-none
                         hover:shadow-xl hover:shadow-primary-500/40
                         dark:from-primary-600 dark:to-primary-700"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </motion.button>
          </div>
        </div>

        {/* 提示文字 */}
        <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
          按 <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">Enter</kbd> 发送，
          <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">Shift + Enter</kbd> 换行
        </p>
      </form>
    </motion.div>
  );
}

