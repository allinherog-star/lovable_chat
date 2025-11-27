import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // 图片优化配置
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;

