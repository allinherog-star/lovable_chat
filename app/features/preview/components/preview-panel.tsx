"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, ExternalLink, Maximize2, Monitor, Tablet, Smartphone } from "lucide-react";
import { PreviewLoader } from "./preview-loader";

type DeviceType = "desktop" | "tablet" | "mobile";

interface PreviewPanelProps {
  /** 预览 URL */
  previewUrl?: string;
  /** 是否正在加载/生成中 */
  isLoading?: boolean;
  /** 是否显示预览面板 */
  isVisible?: boolean;
}

const deviceSizes: Record<DeviceType, { width: string; maxWidth: number }> = {
  desktop: { width: "100%", maxWidth: 9999 },
  tablet: { width: "768px", maxWidth: 768 },
  mobile: { width: "375px", maxWidth: 375 },
};

/**
 * 预览面板组件
 * 显示生成的应用预览，支持加载状态切换
 */
export function PreviewPanel({
  previewUrl,
  isLoading = false,
  isVisible = true,
}: PreviewPanelProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 当 URL 改变时重置加载状态
  useEffect(() => {
    setIframeLoaded(false);
  }, [previewUrl, refreshKey]);

  // 刷新预览
  const handleRefresh = () => {
    setIframeLoaded(false);
    setRefreshKey((k) => k + 1);
  };

  // 在新窗口打开
  const handleOpenExternal = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank");
    }
  };

  // 判断是否显示内容（有 URL 且不在加载中）
  const showPreview = previewUrl && !isLoading;

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
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                实时预览
              </span>
              {showPreview && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  已就绪
                </motion.span>
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

              {/* 刷新按钮 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={!showPreview}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                title="刷新预览"
              >
                <RefreshCw className="h-4 w-4" />
              </motion.button>

              {/* 新窗口打开 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenExternal}
                disabled={!showPreview}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                title="在新窗口打开"
              >
                <ExternalLink className="h-4 w-4" />
              </motion.button>

              {/* 全屏按钮 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => iframeRef.current?.requestFullscreen?.()}
                disabled={!showPreview}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                title="全屏显示"
              >
                <Maximize2 className="h-4 w-4" />
              </motion.button>
            </div>
          </div>

          {/* 预览区域 */}
          <div className="relative flex-1 overflow-hidden bg-slate-100/50 dark:bg-slate-800/50">
            <AnimatePresence mode="wait">
              {isLoading || !previewUrl ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  <PreviewLoader />
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full items-center justify-center p-4"
                >
                  {/* iframe 容器 */}
                  <div
                    className="relative h-full overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 dark:bg-slate-900"
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
                          className="absolute inset-0 z-10 flex items-center justify-center bg-white dark:bg-slate-900"
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
                      src={previewUrl}
                      onLoad={() => setIframeLoaded(true)}
                      className="h-full w-full border-0"
                      title="应用预览"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* URL 地址栏 */}
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-slate-200/60 bg-white/80 px-4 py-2 dark:border-slate-700/60 dark:bg-slate-800/80"
            >
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 dark:bg-slate-700/50">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="flex-1 truncate text-xs text-slate-500 dark:text-slate-400">
                  {previewUrl}
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

