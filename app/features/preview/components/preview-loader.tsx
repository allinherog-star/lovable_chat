"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 制作过程的趣味提示
const magicMessages = [
  { emoji: "🎨", text: "正在调配色彩魔法..." },
  { emoji: "✨", text: "施展界面咒语中..." },
  { emoji: "🪄", text: "挥动魔杖编织代码..." },
  { emoji: "🌟", text: "注入交互灵魂..." },
  { emoji: "💫", text: "让像素翩翩起舞..." },
  { emoji: "🔮", text: "预见精彩的成果..." },
  { emoji: "🎭", text: "雕琢每一个细节..." },
  { emoji: "🌈", text: "添加最后的光彩..." },
];

// 模拟真实的系统日志
const FAKE_LOGS = [
  "[INFO] Initializing AI model pipeline...",
  "[GET] /api/v1/models/gemini-2.0 → 200 OK",
  "✓ Loading tokenizer: vocab_size=256000",
  "[DEBUG] Context window: 1M tokens allocated",
  "→ Parsing user requirements...",
  "[POST] /api/generate/stream → connected",
  "✓ Module loaded: @react/jsx-runtime",
  "[INFO] Building component tree...",
  "→ Analyzing design patterns...",
  "[DEBUG] Memory: 847MB / 4096MB",
  "✓ CSS-in-JS engine initialized",
  "[INFO] Applying Tailwind optimizations...",
  "→ Resolving dependencies: 23 modules",
  "[GET] /cdn/fonts/inter.woff2 → cached",
  "✓ Layout engine: flexbox mode",
  "[DEBUG] GPU acceleration: enabled",
  "→ Generating responsive breakpoints...",
  "[INFO] Code splitting: 4 chunks",
  "✓ Tree shaking: removed 12KB",
  "[POST] /api/preview/compile → queued",
  "→ Processing JSX transforms...",
  "[DEBUG] Hot reload: standby",
  "✓ Static analysis: 0 warnings",
  "[INFO] Minification: terser v5.x",
  "→ Asset optimization: images, fonts",
  "[GET] /api/health → 200 OK (3ms)",
  "✓ Build cache: 98% hit rate",
  "[DEBUG] Worker threads: 4 active",
  "→ Streaming response chunks...",
  "[INFO] Rendering preview frame...",
];

/**
 * 预览区域加载动画组件
 * AI正在努力制作中的等待画面
 */
export function PreviewLoader() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  // 切换消息
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % magicMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 计时
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 模拟真实日志滚动
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogIndex(prev => (prev + 1) % FAKE_LOGS.length);
    }, 600 + Math.random() * 500); // 随机间隔，更真实
    return () => clearInterval(interval);
  }, []);

  const currentMessage = magicMessages[messageIndex];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-violet-950">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 动态光晕 */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-primary-400/20 to-accent-400/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [-30, 30, -30],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-accent-400/20 to-primary-400/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
            y: [-20, 20, -20],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* 自由漂浮的思考星星 */}
        {[...Array(18)].map((_, i) => {
          // 为每颗星星生成独特的漂浮路径
          const baseX = 5 + (i * 5.5) % 90;
          const baseY = 5 + (i * 7.3) % 90;
          const size = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'][i % 5];
          const star = ['✦', '✧', '⋆', '✶', '✴', '❋'][i % 6];
          
          // 生成随机但确定性的漂浮路径
          const driftX1 = ((i * 17) % 60) - 30;
          const driftX2 = ((i * 23) % 80) - 40;
          const driftX3 = ((i * 31) % 50) - 25;
          const driftY1 = ((i * 19) % 50) - 25;
          const driftY2 = ((i * 29) % 70) - 35;
          const driftY3 = ((i * 37) % 40) - 20;
          
          return (
            <motion.div
              key={i}
              className={`absolute ${size} text-slate-400/60 dark:text-slate-300/40`}
              style={{
                left: `${baseX}%`,
                top: `${baseY}%`,
                filter: i % 3 === 0 ? 'blur(0.5px)' : 'none',
              }}
              animate={{
                x: [0, driftX1, driftX2, driftX3, 0],
                y: [0, driftY1, driftY2, driftY3, 0],
                opacity: [0.2, 0.6, 0.9, 0.5, 0.2],
                scale: [0.6, 1, 1.3, 0.9, 0.6],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 12 + (i % 8) * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              {star}
            </motion.div>
          );
        })}
        
        {/* 快速穿梭的灵感火花 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-primary-400 to-accent-400"
            style={{
              left: `${(i * 16) % 100}%`,
              top: `${(i * 20) % 100}%`,
            }}
            animate={{
              x: [0, 100 + i * 20, -50, 80, 0],
              y: [0, -60 + i * 10, 40, -30, 0],
              opacity: [0, 0.8, 1, 0.6, 0],
              scale: [0.5, 1.5, 1, 2, 0.5],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}
        
        {/* 缓慢旋转的星座连线效果 */}
        <motion.svg
          className="absolute inset-0 h-full w-full opacity-10 dark:opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(251, 146, 60)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* 星座连线 */}
          <motion.path
            d="M 10% 20% Q 30% 10%, 50% 25% T 90% 15%"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
            animate={{ strokeDashoffset: [0, 20] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 5% 60% Q 25% 80%, 45% 55% T 85% 70%"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.svg>
      </div>

      {/* 主要内容 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center px-8"
      >
        {/* 魔法水晶球动画 */}
        <div className="relative mb-10">
          {/* 外圈光环 */}
          <motion.div
            className="absolute -inset-8 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(139,92,246,0.3), transparent, rgba(251,146,60,0.3), transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          
          {/* 中间光环 */}
          <motion.div
            className="absolute -inset-4 rounded-full border-2 border-dashed border-primary-300/50 dark:border-primary-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* 核心水晶球 */}
          <motion.div
            className="relative flex h-28 w-28 items-center justify-center rounded-full 
                       bg-gradient-to-br from-primary-400 via-accent-400 to-primary-500
                       shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(251, 146, 60, 0.2)",
                "0 0 60px rgba(251, 146, 60, 0.4), 0 0 100px rgba(139, 92, 246, 0.2)",
                "0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(251, 146, 60, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* 内部高光 */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
            
            {/* 动态表情 */}
            <motion.span
              className="relative text-5xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🪄
            </motion.span>
          </motion.div>

          {/* 环绕粒子 */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-3 w-3 rounded-full"
              style={{
                background: i % 2 === 0 
                  ? "linear-gradient(135deg, #8b5cf6, #a855f7)" 
                  : "linear-gradient(135deg, #f97316, #fb923c)",
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos((i * 45 * Math.PI) / 180) * 70],
                y: [0, Math.sin((i * 45 * Math.PI) / 180) * 70],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* 主标题 */}
        <motion.h2
          className="mb-4 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 
                     bg-clip-text text-2xl font-bold text-transparent
                     dark:from-primary-400 dark:via-accent-400 dark:to-primary-300"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AI 正在努力制作中
        </motion.h2>

        {/* 动态消息 */}
        <div className="mb-6 h-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-lg text-slate-600 dark:text-slate-300"
            >
              <span className="text-2xl">{currentMessage.emoji}</span>
              <span>{currentMessage.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 实时日志输出 - 给用户真实感 */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.3 }}
          className="mb-5 w-80 overflow-hidden rounded-lg bg-slate-900/95 px-4 py-3 font-mono shadow-xl"
        >
          <motion.div
            key={currentLogIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 text-[11px] text-green-400/90"
          >
            <span className="animate-pulse text-green-500">▸</span>
            <span className="truncate">{FAKE_LOGS[currentLogIndex]}</span>
          </motion.div>
        </motion.div>

        {/* 进度条 */}
        <div className="mb-4 h-2 w-64 overflow-hidden rounded-full bg-slate-200/60 dark:bg-slate-700/60">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-400"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: "50%" }}
          />
        </div>

        {/* 用时显示 */}
        <motion.p
          className="text-sm text-slate-400 dark:text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          已用时 {elapsedTime} 秒
        </motion.p>
      </motion.div>

      {/* 底部提示 */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <span>精彩即将呈现，请稍候</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          >
            ✨
          </motion.span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          复杂应用可能需要更长时间
        </p>
      </motion.div>
    </div>
  );
}

