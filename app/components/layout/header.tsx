"use client";

import { motion } from "framer-motion";
import { Sparkles, Plus, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";

interface HeaderProps {
  onNewChat?: () => void;
}

/**
 * 顶部导航栏组件
 * 包含 Logo、新建对话按钮和主题切换
 */
export function Header({ onNewChat }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/50 
                 bg-white/90 backdrop-blur-xl
                 dark:border-slate-700/50 dark:bg-slate-900/90"
    >
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg 
                          bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 
                          shadow-md shadow-primary-500/30">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="gradient-text text-base font-semibold tracking-tight">
              Lovable Chat
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              让AI释放你的每一个创意
            </p>
          </div>
        </motion.div>

        {/* 桌面端操作区 */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewChat}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            新对话
          </Button>
          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />
          <ThemeToggle />
        </div>

        {/* 移动端菜单按钮 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg 
                       bg-slate-100 text-slate-600 transition-colors 
                       hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 
                       dark:hover:bg-slate-700"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-slate-200/50 px-4 py-3 dark:border-slate-700/50"
        >
          <Button
            variant="primary"
            className="w-full"
            size="sm"
            onClick={() => {
              onNewChat?.();
              setIsMobileMenuOpen(false);
            }}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            开始新对话
          </Button>
        </motion.div>
      )}
    </motion.header>
  );
}
