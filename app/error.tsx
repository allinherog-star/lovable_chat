"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 错误边界组件
 * 当页面发生错误时显示
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 记录错误到控制台
    console.error("页面错误:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        {/* 错误图标 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
        >
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </motion.div>

        {/* 错误信息 */}
        <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white">
          哎呀，出错了！
        </h1>
        <p className="mb-6 text-slate-600 dark:text-slate-400">
          页面遇到了一些问题，请尝试刷新或返回首页
        </p>

        {/* 错误详情（开发环境显示） */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-left dark:bg-red-900/20">
            <p className="text-xs font-mono text-red-600 dark:text-red-400">
              {error.message}
            </p>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/30 transition-colors hover:bg-primary-600"
          >
            <RefreshCw className="h-4 w-4" />
            重试
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Home className="h-4 w-4" />
            返回首页
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

