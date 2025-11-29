"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  ExternalLink,
  Maximize2,
  Monitor,
  Tablet,
  Smartphone,
  Play,
  Square,
  AlertCircle,
  CheckCircle,
  Loader,
  FolderOpen,
} from "lucide-react";
import { PreviewLoader } from "./preview-loader";
import type { Project } from "@/app/lib/agent-types";

type DeviceType = "desktop" | "tablet" | "mobile";

interface ProjectPreviewPanelProps {
  project: Project | null;
  onRestart?: () => void;
  isVisible?: boolean;
  /** 是否正在请求中（用于显示等待页面） */
  isGenerating?: boolean;
}

const deviceSizes: Record<DeviceType, { width: string; maxWidth: number }> = {
  desktop: { width: "100%", maxWidth: 9999 },
  tablet: { width: "768px", maxWidth: 768 },
  mobile: { width: "375px", maxWidth: 375 },
};

const statusConfig: Record<
  Project["status"],
  { label: string; color: string; icon: React.ReactNode }
> = {
  idle: { label: "空闲", color: "slate", icon: <FolderOpen className="h-3 w-3" /> },
  creating: { label: "创建中", color: "blue", icon: <Loader className="h-3 w-3 animate-spin" /> },
  generating: { label: "生成中", color: "purple", icon: <Loader className="h-3 w-3 animate-spin" /> },
  installing: { label: "安装依赖", color: "yellow", icon: <Loader className="h-3 w-3 animate-spin" /> },
  building: { label: "构建中", color: "orange", icon: <Loader className="h-3 w-3 animate-spin" /> },
  running: { label: "运行中", color: "green", icon: <CheckCircle className="h-3 w-3" /> },
  error: { label: "错误", color: "red", icon: <AlertCircle className="h-3 w-3" /> },
  completed: { label: "完成", color: "emerald", icon: <CheckCircle className="h-3 w-3" /> },
};

/**
 * 项目预览面板
 */
export function ProjectPreviewPanel({
  project,
  onRestart,
  isVisible = true,
  isGenerating = false,
}: ProjectPreviewPanelProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 当项目或预览 URL 改变时重置加载状态
  useEffect(() => {
    setIframeLoaded(false);
  }, [project?.previewUrl, refreshKey]);

  // 刷新预览
  const handleRefresh = () => {
    setIframeLoaded(false);
    setRefreshKey((k) => k + 1);
  };

  // 在新窗口打开
  const handleOpenExternal = () => {
    if (project?.previewUrl) {
      window.open(project.previewUrl, "_blank");
    }
  };

  // 判断状态 - 使用 isGenerating prop 或 project.status
  const isLoading = isGenerating || (project && ["creating", "generating", "installing", "building"].includes(project.status));
  const isRunning = !isGenerating && project?.status === "running" && project?.previewUrl;
  const hasError = !isGenerating && project?.status === "error";

  const status = project ? statusConfig[project.status] : null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="flex h-full flex-col bg-white/50 backdrop-blur-sm dark:bg-slate-900/50"
        >
          {/* 工具栏 */}
          <div className="flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 py-2.5 dark:border-slate-700/60 dark:bg-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                实时预览
              </span>

              {/* 状态标签 */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium
                    ${status.color === "green" ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400" : ""}
                    ${status.color === "blue" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400" : ""}
                    ${status.color === "purple" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400" : ""}
                    ${status.color === "yellow" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400" : ""}
                    ${status.color === "orange" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400" : ""}
                    ${status.color === "red" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400" : ""}
                    ${status.color === "emerald" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400" : ""}
                    ${status.color === "slate" ? "bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-400" : ""}
                  `}
                >
                  {status.icon}
                  <span>{status.label}</span>
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-1">
              {/* 设备切换 */}
              <div className="mr-2 flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5 dark:bg-slate-700/50">
                <DeviceButton
                  icon={Monitor}
                  active={device === "desktop"}
                  onClick={() => setDevice("desktop")}
                  title="桌面视图"
                />
                <DeviceButton
                  icon={Tablet}
                  active={device === "tablet"}
                  onClick={() => setDevice("tablet")}
                  title="平板视图"
                />
                <DeviceButton
                  icon={Smartphone}
                  active={device === "mobile"}
                  onClick={() => setDevice("mobile")}
                  title="手机视图"
                />
              </div>

              {/* 重启按钮 */}
              {onRestart && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRestart}
                  disabled={isLoading}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 
                             transition-colors hover:bg-slate-100 hover:text-slate-700 
                             disabled:opacity-40 dark:text-slate-400 
                             dark:hover:bg-slate-700 dark:hover:text-slate-200"
                  title="重启预览"
                >
                  <Play className="h-4 w-4" />
                </motion.button>
              )}

              {/* 刷新按钮 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={!isRunning}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 
                           transition-colors hover:bg-slate-100 hover:text-slate-700 
                           disabled:opacity-40 dark:text-slate-400 
                           dark:hover:bg-slate-700 dark:hover:text-slate-200"
                title="刷新预览"
              >
                <RefreshCw className="h-4 w-4" />
              </motion.button>

              {/* 新窗口打开 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenExternal}
                disabled={!isRunning}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 
                           transition-colors hover:bg-slate-100 hover:text-slate-700 
                           disabled:opacity-40 dark:text-slate-400 
                           dark:hover:bg-slate-700 dark:hover:text-slate-200"
                title="在新窗口打开"
              >
                <ExternalLink className="h-4 w-4" />
              </motion.button>

              {/* 全屏按钮 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => iframeRef.current?.requestFullscreen?.()}
                disabled={!isRunning}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 
                           transition-colors hover:bg-slate-100 hover:text-slate-700 
                           disabled:opacity-40 dark:text-slate-400 
                           dark:hover:bg-slate-700 dark:hover:text-slate-200"
                title="全屏显示"
              >
                <Maximize2 className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* 预览区域 */}
          <div className="relative flex-1 overflow-hidden bg-slate-100/50 dark:bg-slate-800/50">
            <AnimatePresence mode="wait">
              {!project ? (
                // 无项目状态
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl 
                                  bg-slate-200/50 dark:bg-slate-700/50">
                    <Monitor className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300">
                    等待生成
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                    开始对话后，AI 将自动生成应用并在这里显示预览
                  </p>
                </motion.div>
              ) : isLoading ? (
                // 加载中
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <PreviewLoader />
                </motion.div>
              ) : hasError ? (
                // 错误状态
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl 
                                  bg-red-100 dark:bg-red-900/30">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
                    构建失败
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                    {project.error || "发生了一些错误，请检查代码或重试"}
                  </p>
                  {onRestart && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onRestart}
                      className="mt-4 rounded-lg bg-primary-500 px-4 py-2 text-sm text-white 
                                 shadow-lg shadow-primary-500/30 hover:bg-primary-600"
                    >
                      重新构建
                    </motion.button>
                  )}
                </motion.div>
              ) : isRunning && project.previewUrl ? (
                // 预览 iframe
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full items-center justify-center p-4"
                >
                  <div
                    className="relative h-full overflow-hidden rounded-lg bg-white shadow-xl 
                               transition-all duration-300 dark:bg-slate-900"
                    style={{
                      width: deviceSizes[device].width,
                      maxWidth: deviceSizes[device].maxWidth,
                    }}
                  >
                    {/* iframe 加载状态 */}
                    <AnimatePresence>
                      {!iframeLoaded && (
                        <motion.div
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-10 flex items-center justify-center 
                                     bg-white dark:bg-slate-900"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-8 w-8 rounded-full border-2 border-primary-500 border-t-transparent"
                            />
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              加载预览...
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* iframe */}
                    <iframe
                      ref={iframeRef}
                      key={refreshKey}
                      src={project.previewUrl}
                      onLoad={() => setIframeLoaded(true)}
                      className="h-full w-full border-0"
                      title="应用预览"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                    />
                  </div>
                </motion.div>
              ) : (
                // 等待启动
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl 
                                  bg-slate-200/50 dark:bg-slate-700/50">
                    <Play className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300">
                    准备就绪
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                    项目已生成，点击上方按钮启动预览
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* URL 地址栏 */}
          {isRunning && project?.previewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-slate-200/60 bg-white/80 px-4 py-2 
                         dark:border-slate-700/60 dark:bg-slate-800/80"
            >
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 dark:bg-slate-700/50">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="flex-1 truncate text-xs text-slate-500 dark:text-slate-400">
                  {project.previewUrl}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** 设备切换按钮 */
interface DeviceButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
  title: string;
}

function DeviceButton({ icon: Icon, active, onClick, title }: DeviceButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${
        active
          ? "bg-white text-primary-600 shadow-sm dark:bg-slate-600 dark:text-primary-400"
          : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      }`}
      title={title}
    >
      <Icon className="h-4 w-4" />
    </motion.button>
  );
}

