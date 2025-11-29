/**
 * 调试 API - 用于检查环境变量配置
 * 部署后通过访问 /api/debug 查看状态
 */

import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const geminiKey = process.env.GEMINI_API_KEY;
  
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: {
      // 只显示密钥是否存在和长度，不暴露实际密钥
      GEMINI_API_KEY_EXISTS: !!geminiKey,
      GEMINI_API_KEY_LENGTH: geminiKey?.length || 0,
      GEMINI_API_KEY_PREFIX: geminiKey?.substring(0, 5) || "N/A",
      // 检查是否有多余的空格
      GEMINI_API_KEY_HAS_LEADING_SPACE: geminiKey?.startsWith(" ") || false,
      GEMINI_API_KEY_HAS_TRAILING_SPACE: geminiKey?.endsWith(" ") || false,
      // 检查是否有引号
      GEMINI_API_KEY_HAS_QUOTES: geminiKey?.includes('"') || geminiKey?.includes("'") || false,
    },
    // 列出所有以 GEMINI 开头的环境变量名（不显示值）
    allGeminiEnvVars: Object.keys(process.env).filter(key => key.toUpperCase().includes("GEMINI")),
  });
}

