import type { NextConfig } from "next";

/** 是否为静态导出模式 */
const isExport = process.env.NEXT_EXPORT === "true";

const nextConfig: NextConfig = {
  // 静态导出配置
  ...(isExport && {
    output: "export",
    distDir: "out",
    // 静态导出时禁用图片优化（需要服务端）
    images: {
      unoptimized: true,
    },
    // 跳过 API 路由的类型检查
    typescript: {
      ignoreBuildErrors: false,
    },
    eslint: {
      ignoreDuringBuilds: false,
    },
  }),

  // 启用实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // 图片优化配置（非导出模式）
  ...(!isExport && {
    images: {
      formats: ["image/avif", "image/webp"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
  }),

  // 尾部斜杠配置（静态托管兼容）
  trailingSlash: isExport,

  // 忽略 ESLint 字体警告
  eslint: {
    ignoreDuringBuilds: isExport,
  },
};

export default nextConfig;

