"use client";

import { useTheme } from "@/app/providers/theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useState } from "react";

/** 主题切换按钮组件 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: "light" as const, icon: Sun, label: "亮色模式" },
    { value: "dark" as const, icon: Moon, label: "暗色模式" },
    { value: "system" as const, icon: Monitor, label: "跟随系统" },
  ];

  // 使用 PascalCase 命名组件变量
  const CurrentIcon = resolvedTheme === "dark" ? Moon : Sun;

  // 未挂载时显示占位符
  if (!mounted) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
    );
  }

  return (
    <div className="relative">
      {/* 主切换按钮 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="focus-ring group relative flex h-10 w-10 items-center justify-center 
                   rounded-xl bg-white shadow-sm ring-1 ring-slate-200/50 
                   transition-all hover:bg-slate-50 hover:shadow-md
                   dark:bg-slate-700 dark:ring-slate-600/50 dark:hover:bg-slate-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="切换主题"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedTheme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentIcon
              className="h-5 w-5 text-slate-600 transition-colors 
                         group-hover:text-primary-600 dark:text-slate-200 
                         dark:group-hover:text-primary-400"
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* 下拉菜单 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* 菜单内容 */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full z-50 mt-2 w-40 origin-top-right 
                         overflow-hidden rounded-xl bg-white p-1.5 shadow-xl 
                         ring-1 ring-slate-200/50 backdrop-blur-xl
                         dark:bg-slate-800 dark:ring-slate-600/50"
            >
              {themes.map(({ value, icon: Icon, label }) => (
                <motion.button
                  key={value}
                  onClick={() => {
                    setTheme(value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 
                             text-left text-sm transition-colors
                             ${
                               theme === value
                                 ? "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300"
                                 : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                             }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {theme === value && (
                    <motion.div
                      layoutId="theme-indicator"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-500"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

