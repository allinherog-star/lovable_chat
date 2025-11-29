"use client";

import { motion } from "framer-motion";

/**
 * 预览区域加载动画组件
 * 在应用生成过程中显示精美的等待动画
 */
export function PreviewLoader() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-violet-950">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 动态光晕 */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-primary-400/20 to-accent-400/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-accent-400/20 to-primary-400/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.3, 0.4],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* 主要内容 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* 动画图标容器 */}
        <div className="relative mb-8">
          {/* 外圈旋转环 */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary-300/30 dark:border-primary-600/30"
            style={{ width: 120, height: 120, margin: -20 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* 中圈反向旋转 */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-accent-400/40 dark:border-accent-500/40"
            style={{ width: 100, height: 100, margin: -10 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* 中心图标 */}
          <motion.div
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-xl shadow-primary-500/30"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 20px 40px rgba(139, 92, 246, 0.3)",
                "0 25px 50px rgba(139, 92, 246, 0.4)",
                "0 20px 40px rgba(139, 92, 246, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡
            </motion.span>
          </motion.div>

          {/* 浮动粒子 */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-primary-400 dark:bg-primary-500"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 60],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 60],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* 文字标题 */}
        <motion.h3
          className="mb-3 text-xl font-semibold text-slate-800 dark:text-slate-100"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          正在生成应用...
        </motion.h3>

        {/* 进度条 */}
        <div className="mb-4 h-1.5 w-48 overflow-hidden rounded-full bg-slate-200/50 dark:bg-slate-700/50">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"
            style={{ backgroundSize: "200% 100%" }}
            animate={{
              x: ["-100%", "100%"],
              backgroundPosition: ["0% 0%", "100% 0%"],
            }}
            transition={{
              x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
            }}
          />
        </div>

        {/* 状态文字 */}
        <motion.div
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LoadingDots />
          <span>AI 正在努力创造中</span>
        </motion.div>
      </motion.div>

      {/* 底部提示 */}
      <motion.p
        className="absolute bottom-8 text-xs text-slate-400 dark:text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        预览将在应用生成完成后自动显示
      </motion.p>
    </div>
  );
}

/** 加载点动画 */
function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary-500"
          animate={{
            y: [0, -4, 0],
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
  );
}

