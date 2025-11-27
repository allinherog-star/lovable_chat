import { NextResponse } from "next/server";
import type { ChatRequest, ChatResponse } from "@/app/features/chat/types";

/**
 * AI 对话 API 路由
 * POST /api/chat
 * 
 * 模拟 AI 响应，实际项目中可接入 OpenAI、Claude 等 LLM API
 */
export async function POST(request: Request): Promise<NextResponse<ChatResponse>> {
  try {
    const body: ChatRequest = await request.json();
    const { message, conversationId } = body;

    // 参数校验
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "消息内容不能为空" } as unknown as ChatResponse,
        { status: 400 }
      );
    }

    // 模拟 AI 处理延迟
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // 模拟 AI 响应（实际项目中替换为真实 LLM API 调用）
    const aiResponses: Record<string, string> = {
      "你好": "你好！很高兴见到你 👋 我是 Lovable Chat，一个 AI 助手。有什么我可以帮助你的吗？",
      "介绍一下你自己": "我是 Lovable Chat，一个基于先进 AI 技术的对话助手。我可以帮助你：\n\n✨ 回答各种问题\n💡 提供创意灵感\n📝 协助写作和编辑\n💻 解答技术问题\n\n随时告诉我你需要什么帮助！",
    };

    // 检查是否有预设回复
    let responseContent = aiResponses[message.trim()];
    
    // 如果没有预设回复，生成通用响应
    if (!responseContent) {
      responseContent = generateResponse(message);
    }

    const response: ChatResponse = {
      id: `msg-${Date.now()}`,
      content: responseContent,
      role: "assistant",
      conversationId: conversationId || `conv-${Date.now()}`,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "服务器内部错误，请稍后重试" } as unknown as ChatResponse,
      { status: 500 }
    );
  }
}

/**
 * 生成模拟 AI 响应
 * 实际项目中替换为真实 LLM API 调用
 */
function generateResponse(userMessage: string): string {
  const messageLength = userMessage.length;
  
  // 根据用户输入长度和内容生成不同类型的响应
  if (userMessage.includes("代码") || userMessage.includes("编程") || userMessage.includes("React")) {
    return `很棒的技术问题！让我来帮你分析一下 🔧

关于「${userMessage.slice(0, 30)}${userMessage.length > 30 ? "..." : ""}」：

这是一个很有意思的问题。在现代前端开发中，我们通常会考虑：

1. **组件设计** - 保持组件的单一职责
2. **状态管理** - 选择合适的状态管理方案
3. **性能优化** - 使用 memo、useMemo 等优化手段
4. **类型安全** - TypeScript 提供完整类型支持

需要我详细解释某个方面吗？`;
  }
  
  if (userMessage.includes("写") || userMessage.includes("创作") || userMessage.includes("诗")) {
    return `让我来发挥一下创意 ✨

${userMessage.includes("诗") ? `
🌸 春日随想

晨光穿透薄雾轻，
花开枝头鸟声鸣。
微风拂面暖意生，
万物复苏共此情。

希望这首小诗能给你带来一丝春天的气息 🌷` : `
好的，让我来帮你创作！根据你的需求「${userMessage.slice(0, 40)}${userMessage.length > 40 ? "..." : ""}」，我会尽力提供一个优质的创作方案。

你想要我从哪个角度开始呢？`}`;
  }

  if (messageLength < 10) {
    return `收到！你说的是「${userMessage}」。能告诉我更多细节吗？这样我可以更好地帮助你 😊`;
  }

  return `感谢你的提问！关于「${userMessage.slice(0, 50)}${userMessage.length > 50 ? "..." : ""}」：

这是一个很好的问题。让我来帮你分析一下：

🔍 **理解你的需求**
你似乎想要了解更多关于这个话题的信息。

💡 **我的建议**
1. 首先，让我们明确你的具体目标
2. 然后，我可以提供更有针对性的帮助
3. 最后，我们可以一起优化方案

有什么具体的方面你想深入探讨吗？我很乐意进一步帮助你！ 🚀`;
}

/**
 * 健康检查端点
 * GET /api/chat
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    message: "Chat API is running",
    timestamp: new Date().toISOString(),
  });
}

