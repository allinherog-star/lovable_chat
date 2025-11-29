"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Image, X, Camera } from "lucide-react";
import { useState, useRef, useEffect, useCallback, type KeyboardEvent, type FormEvent, type DragEvent } from "react";

interface ChatInputWithImageProps {
  onSend: (message: string, imageData?: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

/**
 * 支持图片上传的聊天输入框
 */
export function ChatInputWithImage({
  onSend,
  isLoading = false,
  placeholder = "描述你想创建的应用，或者粘贴截图...",
}: ChatInputWithImageProps) {
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理图片文件
  const handleImageFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageData(result);
    };
    reader.readAsDataURL(file);
  }, []);

  // 自动调整高度
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  // 处理粘贴事件（支持粘贴图片）
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            handleImageFile(file);
          }
          break;
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handleImageFile]);

  // 处理拖拽
  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageFile(files[0]);
    }
  }, [handleImageFile]);

  // 处理文件选择
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
    // 重置 input 以便可以重复选择相同文件
    e.target.value = "";
  }, [handleImageFile]);

  // 移除图片
  const removeImage = useCallback(() => {
    setImageData(null);
  }, []);

  // 处理发送
  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if ((message.trim() || imageData) && !isLoading) {
      onSend(message.trim(), imageData || undefined);
      setMessage("");
      setImageData(null);
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
      className="relative mx-auto w-full max-w-4xl px-4 pb-6"
    >
      <form onSubmit={handleSubmit} className="relative">
        {/* 输入框容器 */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group relative overflow-hidden rounded-2xl border transition-all duration-300
            ${isDragging 
              ? "border-primary-400 bg-primary-50/50 dark:border-primary-500 dark:bg-primary-900/20"
              : "border-slate-200/60 bg-white/90 dark:border-slate-600/50 dark:bg-slate-800/90"
            }
            shadow-xl shadow-slate-200/20
            focus-within:border-primary-300 focus-within:shadow-primary-500/10
            hover:border-slate-300/70
            dark:shadow-slate-900/30
            dark:focus-within:border-primary-600 dark:hover:border-slate-500/70`}
        >
          {/* 渐变装饰线 */}
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r 
                       from-transparent via-primary-400/50 to-transparent 
                       opacity-0 transition-opacity group-focus-within:opacity-100"
          />

          {/* 拖拽提示 */}
          <AnimatePresence>
            {isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex items-center justify-center 
                           bg-primary-500/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image className="h-6 w-6" aria-hidden="true" />
                  <span className="font-medium">释放以添加图片</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 图片预览 */}
          <AnimatePresence>
            {imageData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative border-b border-slate-200/50 p-3 dark:border-slate-700/50"
              >
                <div className="relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageData}
                    alt="上传的图片预览"
                    className="max-h-32 rounded-lg object-contain shadow-md"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={removeImage}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center 
                               rounded-full bg-red-500 text-white shadow-lg
                               hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  📸 已添加截图 - AI 将分析此图片并实现相应的 UI
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 文本输入区 */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className="block w-full resize-none bg-transparent px-4 py-4 pb-14 
                       text-base text-slate-800 placeholder-slate-400 
                       focus:outline-none disabled:cursor-not-allowed disabled:opacity-50
                       dark:text-white dark:placeholder-slate-400
                       sm:pb-4 sm:pr-36"
          />

          {/* 工具栏 - 移动端在底部，桌面端在右侧 */}
          <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2
                          sm:inset-x-auto sm:right-2 sm:justify-end">
            {/* 隐藏的文件 input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* 左侧按钮组（移动端显示在左边） */}
            <div className="flex items-center gap-1">
              {/* 添加图片按钮 */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex h-9 w-9 items-center justify-center rounded-lg 
                           text-slate-400 transition-colors hover:bg-slate-100 
                           hover:text-slate-600 active:bg-slate-200
                           dark:hover:bg-slate-800 dark:hover:text-slate-300
                           sm:h-8 sm:w-8"
                title="添加图片 (或直接粘贴)"
                aria-label="添加图片"
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
              </motion.button>

              {/* 截图提示 - 移动端隐藏 */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (textareaRef.current) {
                    textareaRef.current.focus();
                  }
                }}
                className="hidden h-8 w-8 items-center justify-center rounded-lg 
                           text-slate-400 transition-colors hover:bg-slate-100 
                           hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300
                           sm:flex"
                title="提示: Cmd/Ctrl+V 粘贴截图"
              >
                <Camera className="h-4 w-4" />
              </motion.button>
            </div>

            {/* 发送按钮 */}
            <motion.button
              type="submit"
              disabled={(!message.trim() && !imageData) || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl 
                         bg-gradient-to-r from-primary-500 to-primary-600 
                         text-white shadow-lg shadow-primary-500/30 
                         transition-all disabled:cursor-not-allowed 
                         disabled:opacity-40 disabled:shadow-none
                         active:scale-95
                         hover:shadow-xl hover:shadow-primary-500/40
                         dark:from-primary-600 dark:to-primary-700
                         sm:h-9 sm:w-9"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 sm:h-4 sm:w-4" />
                </motion.div>
              ) : (
                <Send className="h-5 w-5 sm:h-4 sm:w-4" />
              )}
            </motion.button>
          </div>
        </div>

        {/* 提示文字 - 移动端简化显示 */}
        <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
          <span className="hidden sm:inline">
            按 <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">Enter</kbd> 发送，
            <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">Shift + Enter</kbd> 换行，
            <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">Cmd/Ctrl + V</kbd> 粘贴截图
          </span>
          <span className="sm:hidden">
            点击 📎 上传截图，AI 将为你生成应用
          </span>
        </p>
      </form>
    </motion.div>
  );
}

