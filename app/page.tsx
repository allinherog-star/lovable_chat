"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/layout/header";
import { AgentContainer, AgentEmptyState } from "./features/chat/components/agent-container";
import { ChatInputWithImage } from "./features/chat/components/chat-input-with-image";
import { ProjectPreviewPanel } from "./features/preview/components/project-preview-panel";
import { useAgentChat } from "./features/chat/hooks/use-agent-chat";
import { MessageSquare, Eye } from "lucide-react";

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
  
  // 移动端视图切换 (chat / preview)
  const [mobileView, setMobileView] = useState<"chat" | "preview">("chat");
  
  // 检测是否移动端
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // 当有新项目时，移动端自动切换到预览
  useEffect(() => {
    if (isMobile && project?.previewUrl) {
      setMobileView("preview");
    }
  }, [isMobile, project?.previewUrl]);

  // 新建对话
  const handleNewChat = useCallback(() => {
    clearMessages();
    setMobileView("chat");
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
              className="flex h-full flex-col md:flex-row"
            >
              {/* 左侧 - 聊天区域 */}
              <motion.div
                initial={{ width: isMobile ? "100%" : "100%" }}
                animate={{ width: isMobile ? "100%" : "30%" }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  duration: 0.5,
                }}
                className={`relative h-full border-r border-slate-200/50 dark:border-slate-700/50
                           md:min-w-[360px] md:block
                           ${isMobile && mobileView !== "chat" ? "hidden" : ""}`}
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
                initial={{ width: isMobile ? "100%" : "0%", opacity: isMobile ? 1 : 0 }}
                animate={{ width: isMobile ? "100%" : "70%", opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  duration: 0.5,
                  delay: isMobile ? 0 : 0.1,
                }}
                className={`relative h-full flex-1 overflow-hidden
                           ${isMobile && mobileView !== "preview" ? "hidden" : ""}`}
              >
                <ProjectPreviewPanel
                  project={project}
                  onRestart={restartPreview}
                  isVisible={true}
                  isGenerating={isLoading}
                />
              </motion.div>
              
              {/* 移动端底部切换栏 */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around
                             border-t border-slate-200/80 bg-white/95 px-4 py-2
                             backdrop-blur-xl safe-bottom
                             dark:border-slate-700/80 dark:bg-slate-900/95"
                >
                  <button
                    onClick={() => setMobileView("chat")}
                    className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-all
                               ${mobileView === "chat" 
                                 ? "text-primary-600 dark:text-primary-400" 
                                 : "text-slate-400 dark:text-slate-500"}`}
                  >
                    <MessageSquare className={`h-5 w-5 ${mobileView === "chat" ? "fill-current" : ""}`} />
                    <span className="text-xs font-medium">对话</span>
                    {isLoading && mobileView !== "chat" && (
                      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
                    )}
                  </button>
                  <button
                    onClick={() => setMobileView("preview")}
                    className={`relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-all
                               ${mobileView === "preview" 
                                 ? "text-primary-600 dark:text-primary-400" 
                                 : "text-slate-400 dark:text-slate-500"}`}
                  >
                    <Eye className={`h-5 w-5 ${mobileView === "preview" ? "fill-current" : ""}`} />
                    <span className="text-xs font-medium">预览</span>
                    {project?.previewUrl && mobileView !== "preview" && (
                      <span className="absolute right-1/4 top-1 h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                  </button>
                </motion.div>
              )}
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
              <div className="flex-1 overflow-y-auto">
                <AgentEmptyState />
              </div>

              {/* 底部输入框 */}
              <div
                className="shrink-0 border-t border-slate-200/50 bg-white/70 
                           pb-safe pt-4 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70"
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
