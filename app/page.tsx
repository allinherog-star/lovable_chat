"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/layout/header";
import { ChatContainer, EmptyState, ChatInput } from "./features/chat";
import { useChat } from "./features/chat/hooks";

/**
 * 首页 - 主聊天界面
 * 
 * 功能：
 * - 展示对话消息列表
 * - 发送新消息
 * - 暗黑/亮色模式切换
 * - 新建对话
 */
export default function HomePage() {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen flex-col">
      {/* 顶部导航 */}
      <Header onNewChat={clearMessages} />

      {/* 主内容区 */}
      <main className="flex-1 overflow-hidden pt-16">
        <AnimatePresence mode="wait">
          {hasMessages ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <ChatContainer
                messages={messages}
                onSendMessage={sendMessage}
                isLoading={isLoading}
              />
            </motion.div>
          ) : (
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

