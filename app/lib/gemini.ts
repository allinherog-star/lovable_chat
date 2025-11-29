/**
 * Gemini API 集成模块
 * 接入 gemini-2.5-pro-preview 模型
 */

import { AgentAction } from "./agent-types";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = "gemini-2.5-pro-preview-05-06";
// API URL - 使用函数生成以便传入 key 参数
const getGeminiApiUrl = (apiKey: string) => 
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

/**
 * 修复 JSON 内容中的常见问题
 * 主要处理 content 字段中未正确转义的特殊字符
 */
function fixJsonContent(jsonText: string): string {
  try {
    // 首先尝试直接解析，如果成功就不需要修复
    JSON.parse(jsonText);
    return jsonText;
  } catch {
    // 解析失败，尝试修复
  }

  // 策略1: 修复 content 字段中的问题
  // 找到所有 "content": "..." 模式并修复其中的特殊字符
  let fixed = jsonText;
  
  // 修复未转义的反斜杠（但保留已转义的）
  // 这个正则会匹配单独的反斜杠（不是 \n, \t, \\, \", 等转义序列的一部分）
  fixed = fixed.replace(/\\(?![nrtbf\\"\/])/g, '\\\\');
  
  // 修复 content 字段中的实际换行符
  // 首先找到 "content": " 开始的位置
  const contentPattern = /"content"\s*:\s*"/g;
  let match;
  const positions: number[] = [];
  
  while ((match = contentPattern.exec(fixed)) !== null) {
    positions.push(match.index + match[0].length);
  }
  
  // 对于每个 content 字段的开始位置，找到对应的结束引号
  // 并修复其中的实际换行符
  for (let i = positions.length - 1; i >= 0; i--) {
    const startPos = positions[i];
    
    for (let j = startPos; j < fixed.length; j++) {
      const char = fixed[j];
      const prevChar = j > 0 ? fixed[j - 1] : '';
      
      // 找到结束引号就停止
      if (char === '"' && prevChar !== '\\') {
        break;
      }
      
      // 检查实际的换行符（不是 \n 字符串）
      if (char === '\n' && prevChar !== '\\') {
        // 将实际换行符替换为 \\n
        fixed = fixed.substring(0, j) + '\\n' + fixed.substring(j + 1);
      }
    }
  }
  
  return fixed;
}

/** Gemini 消息格式 */
interface GeminiMessage {
  role: "user" | "model";
  parts: GeminiPart[];
}

type GeminiPart = { text: string } | { inlineData: { mimeType: string; data: string } };

/** Gemini 请求体 */
interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
  };
  systemInstruction?: {
    parts: { text: string }[];
  };
}

/** Gemini 响应体 */
interface GeminiResponse {
  candidates?: {
    content: {
      parts: { text: string }[];
      role: string;
    };
    finishReason: string;
  }[];
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

/** Agent 系统提示词 */
const AGENT_SYSTEM_PROMPT = `你是一个专业的全栈开发 AI Agent，类似于 Cursor AI。你的任务是帮助用户创建完整的 Web 应用程序。

## 你的能力

1. **创建文件** - 你可以创建任何类型的文件（HTML、CSS、JavaScript、TypeScript、React 组件等）
2. **修改文件** - 你可以读取和修改现有文件
3. **执行命令** - 你可以执行 shell 命令来安装依赖、构建项目等
4. **分析图片** - 你可以分析用户发送的截图，理解 UI 设计并实现它
5. **修复错误** - 你可以分析错误信息并修复代码问题

## 响应格式

你必须以 JSON 格式响应，包含以下结构：

\`\`\`json
{
  "thinking": "你的思考过程，分析用户需求",
  "actions": [
    {
      "type": "create_file",
      "path": "文件相对路径",
      "content": "文件完整内容"
    },
    {
      "type": "modify_file",
      "path": "文件路径",
      "content": "新的完整文件内容"
    },
    {
      "type": "execute_command",
      "command": "要执行的命令"
    },
    {
      "type": "delete_file",
      "path": "要删除的文件路径"
    }
  ],
  "message": "给用户的友好消息，解释你做了什么",
  "completed": true/false,
  "needsMoreInfo": false
}
\`\`\`

## 重要规则

1. **始终创建完整的项目结构**：包括 package.json、必要的配置文件、源代码文件等
2. **使用现代技术栈**：优先使用 React + Vite + TypeScript + Tailwind CSS
3. **代码质量**：生成高质量、可运行的代码，带有适当的注释
4. **美观的 UI**：创建现代、美观的用户界面，使用渐变、阴影、动画等效果
5. **响应式设计**：确保应用在各种设备上都能正常显示
6. **错误处理**：包含适当的错误处理和用户反馈

## 项目模板

对于新项目，请使用以下技术栈：
- Vite 作为构建工具
- React 18 作为 UI 框架
- TypeScript 作为开发语言
- Tailwind CSS 作为样式框架
- 使用 ES Modules

## 文件结构示例

\`\`\`
project/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   └── components/
│       └── ...
└── public/
    └── ...
\`\`\`

请始终确保生成的代码可以直接运行。当用户发送截图时，仔细分析图片中的 UI 元素并精确实现。`;

/**
 * 调用 Gemini API
 */
export async function callGemini(
  messages: { role: "user" | "assistant"; content: string; imageData?: string }[],
  projectContext?: { files: { path: string; content: string }[] }
): Promise<{
  success: boolean;
  data?: {
    thinking: string;
    actions: AgentAction[];
    message: string;
    completed: boolean;
    needsMoreInfo: boolean;
  };
  error?: string;
  rawResponse?: string;
}> {
  if (!GEMINI_API_KEY) {
    return {
      success: false,
      error: `未配置 GEMINI_API_KEY 环境变量 (检测到的环境变量: ${Object.keys(process.env).filter(k => k.includes('GEMINI')).join(', ') || '无'})`,
    };
  }
  
  // 调试：检查密钥格式
  const trimmedKey = GEMINI_API_KEY.trim();
  if (trimmedKey !== GEMINI_API_KEY) {
    console.warn("警告: GEMINI_API_KEY 包含前后空格");
  }
  if (trimmedKey.startsWith('"') || trimmedKey.startsWith("'")) {
    console.warn("警告: GEMINI_API_KEY 可能包含引号");
  }

  try {
    // 构建项目上下文
    let contextText = "";
    if (projectContext?.files && projectContext.files.length > 0) {
      contextText = "\n\n## 当前项目文件\n\n";
      for (const file of projectContext.files) {
        contextText += `### ${file.path}\n\`\`\`\n${file.content}\n\`\`\`\n\n`;
      }
    }

    // 转换消息格式
    const geminiMessages: GeminiMessage[] = messages.map((msg) => {
      const parts: GeminiPart[] = [];

      // 添加文本内容
      if (msg.content) {
        parts.push({ text: msg.content });
      }

      // 添加图片（如果有）
      if (msg.imageData) {
        // imageData 格式: "data:image/png;base64,xxxxx"
        const matches = msg.imageData.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
          parts.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2],
            },
          });
        }
      }

      return {
        role: msg.role === "assistant" ? "model" : "user",
        parts,
      };
    });

    // 构建请求
    const request: GeminiRequest = {
      contents: geminiMessages,
      systemInstruction: {
        parts: [{ text: AGENT_SYSTEM_PROMPT + contextText }],
      },
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 65536,
      },
    };

    // 使用 trim 后的密钥，避免空格问题
    const apiKey = GEMINI_API_KEY.trim();
    
    // 调试日志（只在服务端打印）
    console.log(`[Gemini] API Key 长度: ${apiKey.length}, 前缀: ${apiKey.substring(0, 5)}...`);
    
    // 发送请求 - 使用 URL 参数传递 API Key
    const response = await fetch(getGeminiApiUrl(apiKey), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      return {
        success: false,
        error: `API 请求失败: ${response.status} - ${errorText}`,
      };
    }

    const data: GeminiResponse = await response.json();

    if (data.error) {
      return {
        success: false,
        error: `Gemini API 错误: ${data.error.message}`,
      };
    }

    if (!data.candidates || data.candidates.length === 0) {
      return {
        success: false,
        error: "未收到有效响应",
      };
    }

    const responseText = data.candidates[0].content.parts
      .map((p) => p.text)
      .join("");

    // 解析 JSON 响应
    try {
      // 尝试提取 JSON 块
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
        responseText.match(/```\s*([\s\S]*?)\s*```/) ||
        [null, responseText];

      let jsonText = jsonMatch[1] || responseText;
      
      // 清理可能的前后缀
      jsonText = jsonText.trim();
      
      // 尝试修复常见的 JSON 问题
      // 1. 修复 content 字段中未转义的换行符
      jsonText = fixJsonContent(jsonText);
      
      const parsed = JSON.parse(jsonText);

      return {
        success: true,
        data: {
          thinking: parsed.thinking || "",
          actions: parsed.actions || [],
          message: parsed.message || "完成",
          completed: parsed.completed ?? true,
          needsMoreInfo: parsed.needsMoreInfo ?? false,
        },
        rawResponse: responseText,
      };
    } catch (parseError) {
      console.error("JSON 解析错误:", parseError);
      console.log("原始响应:", responseText.substring(0, 500) + "...");
      
      // 尝试从原始响应中提取有用信息
      const messageMatch = responseText.match(/"message"\s*:\s*"([^"]+)"/);
      const thinkingMatch = responseText.match(/"thinking"\s*:\s*"([^"]+)"/);
      
      if (messageMatch) {
        // 如果能提取到 message 字段，返回它
        return {
          success: true,
          data: {
            thinking: thinkingMatch ? thinkingMatch[1] : "",
            actions: [],
            message: messageMatch[1].replace(/\\n/g, '\n'),
            completed: true,
            needsMoreInfo: false,
          },
          rawResponse: responseText,
        };
      }
      
      // 如果实在解析不了，返回友好的错误消息
      return {
        success: false,
        error: "AI 返回的格式有误，请重试",
        rawResponse: responseText,
      };
    }
  } catch (error) {
    console.error("Gemini 调用错误:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "未知错误",
    };
  }
}

/**
 * 流式调用 Gemini API（用于实时显示生成过程）
 */
export async function* streamGemini(
  messages: { role: "user" | "assistant"; content: string; imageData?: string }[],
  projectContext?: { files: { path: string; content: string }[] }
): AsyncGenerator<{ type: "text" | "done"; content: string }> {
  if (!GEMINI_API_KEY) {
    yield { type: "done", content: "错误: 未配置 GEMINI_API_KEY" };
    return;
  }

  try {
    // 构建项目上下文
    let contextText = "";
    if (projectContext?.files && projectContext.files.length > 0) {
      contextText = "\n\n## 当前项目文件\n\n";
      for (const file of projectContext.files) {
        contextText += `### ${file.path}\n\`\`\`\n${file.content}\n\`\`\`\n\n`;
      }
    }

    // 转换消息格式
    const geminiMessages: GeminiMessage[] = messages.map((msg) => {
      const parts: GeminiPart[] = [];
      if (msg.content) {
        parts.push({ text: msg.content });
      }
      if (msg.imageData) {
        const matches = msg.imageData.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
          parts.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2],
            },
          });
        }
      }
      return {
        role: msg.role === "assistant" ? "model" : "user",
        parts,
      };
    });

    const request: GeminiRequest = {
      contents: geminiMessages,
      systemInstruction: {
        parts: [{ text: AGENT_SYSTEM_PROMPT + contextText }],
      },
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 65536,
      },
    };

    // 使用 trim 后的密钥
    const apiKey = GEMINI_API_KEY.trim();
    
    // 使用 URL 参数传递 API Key
    const streamUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?key=${apiKey}&alt=sse`;

    const response = await fetch(streamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok || !response.body) {
      yield { type: "done", content: `API 错误: ${response.status}` };
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.candidates?.[0]?.content?.parts) {
              for (const part of data.candidates[0].content.parts) {
                if (part.text) {
                  yield { type: "text", content: part.text };
                }
              }
            }
          } catch {
            // 忽略解析错误
          }
        }
      }
    }

    yield { type: "done", content: "" };
  } catch (error) {
    yield { type: "done", content: `错误: ${error instanceof Error ? error.message : "未知错误"}` };
  }
}
