import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "./providers/theme-provider";
import "./globals.css";

/** 应用元数据 - SEO 优化 */
export const metadata: Metadata = {
  title: "Lovable Chat - 让AI释放你的每一个创意",
  description: "极简优雅的 AI 对话生成应用，让创意触手可及",
  keywords: ["AI", "对话", "生成", "聊天", "人工智能"],
  authors: [{ name: "Lovable Chat" }],
  openGraph: {
    title: "Lovable Chat - 让AI释放你的每一个创意",
    description: "极简优雅的 AI 对话生成应用",
    type: "website",
  },
};

/** 视口配置 - 防止移动端自动缩放 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1625" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/** 防止主题闪烁的脚本 */
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('lovable-chat-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = theme === 'dark' || (theme === 'system' && prefersDark) || (!theme && prefersDark);
      document.documentElement.classList.toggle('dark', isDark);
    } catch (e) {}
  })();
`;

/**
 * 根布局组件
 * Server Component - 不需要 "use client"
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 防止主题闪烁 */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* 预加载关键字体 */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="app-body min-h-screen antialiased transition-colors duration-300"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <ThemeProvider defaultTheme="system">
          {/* 背景装饰 */}
          <div className="app-background pointer-events-none fixed inset-0 overflow-hidden">
            {/* 渐变光晕 */}
            <div className="app-glow-1 absolute -left-40 -top-40 h-80 w-80 rounded-full blur-3xl" />
            <div className="app-glow-2 absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl" />
            {/* 网格背景 */}
            <div className="app-grid absolute inset-0" />
          </div>
          
          {/* 主内容 */}
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

