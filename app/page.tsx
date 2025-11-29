"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/layout/header";
import { ChatContainer, EmptyState, ChatInput } from "./features/chat";
import { PreviewPanel } from "./features/preview";
import { useChat } from "./features/chat/hooks";

/** 检测是否为静态导出模式（无 API 可用时自动启用模拟模式） */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

/** 模拟预览 URL（实际项目中应从 API 返回） */
const MOCK_PREVIEW_URL = "https://stackblitz.com/edit/vitejs-vite-4x1zfw?embed=1&file=src%2FApp.tsx&theme=dark";

/**
 * 首页 - 主聊天界面
 * 
 * 功能：
 * - 展示对话消息列表
 * - 发送新消息
 * - 暗黑/亮色模式切换
 * - 新建对话
 * - 左右分栏预览功能
 */
export default function HomePage() {
  const { messages, isLoading, sendMessage, clearMessages } = useChat({
    mockMode: isStaticExport,
  });

  // 是否显示分栏布局（有消息时启用）
  const hasMessages = messages.length > 0;
  
  // 预览状态管理
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);

  // 当有新的助手消息时，模拟生成预览
  useEffect(() => {
    if (isLoading) {
      // 开始生成，显示加载状态
      setIsGenerating(true);
      setPreviewUrl(undefined);
    } else if (hasMessages && !isLoading) {
      // 生成完成，延迟显示预览（模拟构建时间）
      const timer = setTimeout(() => {
        setPreviewUrl(MOCK_PREVIEW_URL);
        setIsGenerating(false);
      }, 1500); // 模拟额外的构建延迟
      return () => clearTimeout(timer);
    }
  }, [isLoading, hasMessages]);

  // 新建对话时重置预览状态
  const handleNewChat = () => {
    clearMessages();
    setPreviewUrl(undefined);
    setIsGenerating(false);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* 顶部导航 */}
      <Header onNewChat={handleNewChat} />

      {/* 主内容区 */}
      <main className="flex-1 overflow-hidden pt-14">
        <AnimatePresence mode="wait">
          {hasMessages ? (
            /* 分栏布局 */
            <motion.div
              key="split-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full"
            >
              {/* 左侧 - 聊天区域 (1/4) */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "25%" }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 200,
                  duration: 0.5 
                }}
                className="relative h-full min-w-[320px] border-r border-slate-200/50 dark:border-slate-700/50"
              >
                <ChatContainer
                  messages={messages}
                  onSendMessage={sendMessage}
                  isLoading={isLoading}
                />
              </motion.div>

              {/* 右侧 - 预览区域 (3/4) */}
              <motion.div
                initial={{ width: "0%", opacity: 0 }}
                animate={{ width: "75%", opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 200,
                  duration: 0.5,
                  delay: 0.1
                }}
                className="relative h-full flex-1 overflow-hidden"
              >
                <PreviewPanel
                  previewUrl={previewUrl}
                  isLoading={isGenerating}
                  isVisible={true}
                />
              </motion.div>
            </motion.div>
          ) : (
            /* 空状态 - 单栏布局 */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col"
            >
              {/* 空状态 */}
              <div className="flex-1">
                <EmptyState />
              </div>
              
              {/* 底部输入框 */}
              <div className="shrink-0 border-t border-slate-200/50 bg-white/70 
                              pt-4 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70">
                <ChatInput onSend={sendMessage} isLoading={isLoading} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
