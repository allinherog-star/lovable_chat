"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/layout/header";
import { AgentContainer, AgentEmptyState } from "./features/chat/components/agent-container";
import { ChatInputWithImage } from "./features/chat/components/chat-input-with-image";
import { ProjectPreviewPanel } from "./features/preview/components/project-preview-panel";
import { useAgentChat } from "./features/chat/hooks/use-agent-chat";

/**
 * 首页 - AI App Builder
 * 
 * 功能：
 * - AI Agent 对话生成应用
 * - 支持图片上传（截图）
 * - 自动创建项目目录
 * - 自动构建并预览
 * - 错误修复
 */
export default function HomePage() {
  const {
    messages,
    isLoading,
    project,
    operationLogs,
    progress,
    understanding,
    sendMessage,
    clearMessages,
    restartPreview,
  } = useAgentChat({
    onError: (error) => {
      console.error("Agent Error:", error);
    },
    onProjectUpdate: (project) => {
      console.log("Project Updated:", project);
    },
  });

  // 是否显示分栏布局（有消息时启用）
  const hasMessages = messages.length > 0;

  // 新建对话
  const handleNewChat = useCallback(() => {
    clearMessages();
  }, [clearMessages]);

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
              {/* 左侧 - 聊天区域 */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "30%" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  duration: 0.5,
                }}
                className="relative h-full min-w-[360px] border-r border-slate-200/50 dark:border-slate-700/50"
              >
                <AgentContainer
                  messages={messages}
                  onSendMessage={sendMessage}
                  isLoading={isLoading}
                  operationLogs={operationLogs}
                  progress={progress}
                  understanding={understanding}
                />
              </motion.div>

              {/* 右侧 - 预览区域 */}
              <motion.div
                initial={{ width: "0%", opacity: 0 }}
                animate={{ width: "70%", opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="relative h-full flex-1 overflow-hidden"
              >
                <ProjectPreviewPanel
                  project={project}
                  onRestart={restartPreview}
                  isVisible={true}
                  isGenerating={isLoading}
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
                <AgentEmptyState />
              </div>

              {/* 底部输入框 */}
              <div
                className="shrink-0 border-t border-slate-200/50 bg-white/70 
                           pt-4 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70"
              >
                <ChatInputWithImage onSend={sendMessage} isLoading={isLoading} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
