"use client";

import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

/**
 * 404 页面
 * 当访问不存在的页面时显示
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        {/* 404 数字 */}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-8xl font-bold text-transparent">
            404
          </span>
        </motion.div>

        {/* 错误图标 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
        >
          <Search className="h-8 w-8 text-slate-400" />
        </motion.div>

        {/* 错误信息 */}
        <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white">
          页面未找到
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          抱歉，您访问的页面不存在或已被移除
        </p>

        {/* 返回首页按钮 */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/30 transition-colors hover:bg-primary-600"
        >
          <Home className="h-4 w-4" />
          返回首页
        </motion.a>
      </motion.div>
    </div>
  );
}

