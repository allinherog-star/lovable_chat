/**
 * Agent API 路由
 * 处理 AI 代码生成和项目管理
 * 支持 SSE 流式响应
 */

import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/app/lib/gemini";
import {
  createProject,
  loadProject,
  updateProjectStatus,
  executeAgentActions,
  getProjectFiles,
  installDependencies,
  startDevServer,
  listProjects,
} from "@/app/lib/project-manager";
import type { AgentChatRequest, Project, StreamEvent } from "@/app/lib/agent-types";

/**
 * 发送 SSE 事件
 */
function sendEvent(controller: ReadableStreamDefaultController, event: StreamEvent) {
  const data = JSON.stringify(event);
  controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
}

/**
 * POST /api/agent
 * 处理 Agent 对话请求（支持流式响应）
 */
export async function POST(request: NextRequest): Promise<Response> {
  // 检查是否请求流式响应
  const acceptHeader = request.headers.get("accept") || "";
  const useStream = acceptHeader.includes("text/event-stream");

  try {
    const body: AgentChatRequest = await request.json();
    const { message, imageData, projectId, conversationHistory = [] } = body;

    if (!message && !imageData) {
      if (useStream) {
        return new Response(
          `data: ${JSON.stringify({ type: "error", data: { error: "消息内容不能为空" } })}\n\n`,
          { headers: { "Content-Type": "text/event-stream" } }
        );
      }
      return NextResponse.json(
        { success: false, message: "", error: "消息内容不能为空", completed: false },
        { status: 400 }
      );
    }

    // 流式响应
    if (useStream) {
      const stream = new ReadableStream({
        async start(controller) {
          try {
            // ========== 阶段 1: 理解需求（0% - 25%）==========
            
            // 1.1 魔法启动
            sendEvent(controller, {
              type: "progress",
              data: { message: "✨ 魔法启动中...", progress: 2 }
            });
            await new Promise(resolve => setTimeout(resolve, 400));

            // 1.2 分析用户输入
            sendEvent(controller, {
              type: "progress",
              data: { message: "👀 正在阅读你的需求...", progress: 5 }
            });
            await new Promise(resolve => setTimeout(resolve, 500));

            // 1.3 提取关键信息 - 展示理解的需求
            const userRequest = message.trim();
            const hasImage = !!imageData;
            
            // 生成需求摘要
            let requirementSummary = "";
            if (hasImage) {
              requirementSummary = "📸 收到设计截图，正在分析界面元素...";
            } else if (userRequest.length > 50) {
              requirementSummary = `📝 "${userRequest.substring(0, 40)}..."`;
            } else {
              requirementSummary = `📝 "${userRequest}"`;
            }
            
            sendEvent(controller, {
              type: "understanding",
              data: { 
                message: "🔍 分析需求关键词...", 
                progress: 10,
                requirement: requirementSummary
              }
            });
            await new Promise(resolve => setTimeout(resolve, 600));

            // 1.4 识别需求类型
            const keywords = [];
            if (userRequest.includes("官网") || userRequest.includes("网站") || userRequest.includes("landing")) {
              keywords.push("🌐 网站/官网");
            }
            if (userRequest.includes("应用") || userRequest.includes("app") || userRequest.includes("工具")) {
              keywords.push("📱 应用工具");
            }
            if (userRequest.includes("表单") || userRequest.includes("登录") || userRequest.includes("注册")) {
              keywords.push("📋 表单功能");
            }
            if (userRequest.includes("动画") || userRequest.includes("交互") || userRequest.includes("效果")) {
              keywords.push("✨ 动画效果");
            }
            if (userRequest.includes("响应式") || userRequest.includes("移动端") || userRequest.includes("手机")) {
              keywords.push("📱 响应式设计");
            }
            if (hasImage) {
              keywords.push("🎨 视觉还原");
            }
            if (keywords.length === 0) {
              keywords.push("🎯 创意项目");
            }

            sendEvent(controller, {
              type: "understanding",
              data: { 
                message: "🏷️ 识别需求类型...", 
                progress: 15,
                keywords: keywords.slice(0, 3)
              }
            });
            await new Promise(resolve => setTimeout(resolve, 500));

            // 1.5 确认理解完成
            sendEvent(controller, {
              type: "understanding",
              data: { 
                message: "✅ 需求理解完成!", 
                progress: 20,
                confirmed: true
              }
            });
            await new Promise(resolve => setTimeout(resolve, 400));

            // ========== 阶段 2: 创意构思（25% - 50%）==========
            
            // 2.1 获取或创建项目
            let project: Project;
            if (projectId) {
              const existingProject = await loadProject(projectId);
              if (existingProject) {
                project = existingProject;
                sendEvent(controller, {
                  type: "progress",
                  data: { message: "📦 加载现有项目...", progress: 25 }
                });
              } else {
                project = await createProject();
              }
            } else {
              project = await createProject();
              sendEvent(controller, {
                type: "progress",
                data: { message: "🎨 创建全新画布...", progress: 25 }
              });
            }
            await new Promise(resolve => setTimeout(resolve, 300));

            // 更新项目状态为生成中
            await updateProjectStatus(project, "generating");

            // 2.2 准备上下文
            sendEvent(controller, {
              type: "progress",
              data: { message: "📚 准备设计资源...", progress: 28 }
            });
            const projectFiles = await getProjectFiles(project);
            await new Promise(resolve => setTimeout(resolve, 300));

            // 构建消息历史
            const messages: { role: "user" | "assistant"; content: string; imageData?: string }[] = [];
            for (const msg of conversationHistory) {
              if (msg.role !== "system") {
                messages.push({
                  role: msg.role as "user" | "assistant",
                  content: msg.content,
                  imageData: msg.imageData,
                });
              }
            }
            messages.push({ role: "user", content: message, imageData });

            // 2.3 调用 AI 思考
            sendEvent(controller, {
              type: "thinking",
              data: { message: "🧠 AI 正在构思方案..." }
            });
            await new Promise(resolve => setTimeout(resolve, 200));

            sendEvent(controller, {
              type: "progress",
              data: { message: "⚡ 召唤创意精灵...", progress: 35 }
            });

            const geminiResult = await callGemini(messages, { files: projectFiles });

            if (!geminiResult.success || !geminiResult.data) {
              await updateProjectStatus(project, "error", { error: geminiResult.error });
              sendEvent(controller, {
                type: "error",
                data: { error: geminiResult.error || "AI 服务暂时不可用，请稍后再试", project }
              });
              controller.close();
              return;
            }

            sendEvent(controller, {
              type: "progress",
              data: { message: "💡 灵感已获得!", progress: 50 }
            });

            const { thinking, actions, message: aiMessage, completed } = geminiResult.data;

            // 阶段 4: 执行操作 - 施展魔法
            if (actions && actions.length > 0) {
              const totalActions = actions.length;
              
              sendEvent(controller, {
                type: "progress",
                data: { message: "🪄 开始施展魔法...", progress: 55 }
              });

              // 模拟魔法制作过程，不显示具体文件
              const magicSteps = [
                "🎭 塑造界面结构...",
                "🎨 绘制视觉风格...",
                "✨ 添加交互魔法...",
                "💫 注入动画灵魂...",
              ];

              for (let i = 0; i < Math.min(magicSteps.length, totalActions); i++) {
                const progress = 55 + Math.floor(((i + 1) / magicSteps.length) * 25);
                await new Promise(resolve => setTimeout(resolve, 300)); // 小延迟让动画更流畅
                sendEvent(controller, {
                  type: "action",
                  data: { message: magicSteps[i], progress }
                });
              }

              const actionResult = await executeAgentActions(project, actions);
              
              if (actionResult.success) {
                sendEvent(controller, {
                  type: "progress",
                  data: { message: "🌟 魔法制作完成!", progress: 80 }
                });
              }
            }

            // 阶段 5: 安装依赖和启动预览
            // 检查是否需要启动服务器：
            // 1. 新项目：创建了 package.json 且 completed
            // 2. 修改项目：项目之前有 previewUrl（说明之前在运行）
            const isNewProject = completed && actions && actions.some(a => a.type === "create_file" && a.path === "package.json");
            const wasRunning = project.previewUrl || project.previewPort;
            const shouldStartServer = isNewProject || wasRunning;

            if (shouldStartServer) {
              try {
                sendEvent(controller, {
                  type: "progress",
                  data: { message: "📚 准备魔法材料...", progress: 85 }
                });

                // 只有新项目才需要安装依赖
                if (isNewProject) {
                  const installResult = await installDependencies(project);
                  
                  if (!installResult.success) {
                    sendEvent(controller, {
                      type: "progress",
                      data: { message: "⏳ 正在优化中...", progress: 90 }
                    });
                  }
                }

                sendEvent(controller, {
                  type: "progress",
                  data: { message: "🚀 唤醒预览精灵...", progress: 92 }
                });

                const serverResult = await startDevServer(project);
                
                if (serverResult.success && serverResult.previewUrl) {
                  await updateProjectStatus(project, "running", { 
                    previewUrl: serverResult.previewUrl 
                  });
                  sendEvent(controller, {
                    type: "progress",
                    data: { message: "🎉 作品已就绪!", progress: 100 }
                  });
                }
              } catch {
                sendEvent(controller, {
                  type: "progress",
                  data: { message: "🔧 调整魔法参数...", progress: 88 }
                });
              }
            }

            // 重新加载项目获取最新状态
            const updatedProject = await loadProject(project.id);

            // 发送最终结果
            sendEvent(controller, {
              type: "result",
              data: {
                message: aiMessage,
                thinking,
                actions,
                project: updatedProject || project,
                completed,
                progress: 100
              }
            });

            controller.close();
          } catch {
            sendEvent(controller, {
              type: "error",
              data: { error: "魔法暂时失灵了，请稍后再试" }
            });
            controller.close();
          }
        }
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    // 非流式响应（保持原有逻辑）
    // 获取或创建项目
    let project: Project;
    if (projectId) {
      const existingProject = await loadProject(projectId);
      if (existingProject) {
        project = existingProject;
      } else {
        project = await createProject();
      }
    } else {
      project = await createProject();
    }

    // 更新项目状态为生成中
    await updateProjectStatus(project, "generating");

    // 获取项目当前文件（作为上下文）
    const projectFiles = await getProjectFiles(project);

    // 构建消息历史
    const messages: { role: "user" | "assistant"; content: string; imageData?: string }[] = [];

    // 添加历史消息
    for (const msg of conversationHistory) {
      if (msg.role !== "system") {
        messages.push({
          role: msg.role as "user" | "assistant",
          content: msg.content,
          imageData: msg.imageData,
        });
      }
    }

    // 添加当前消息
    messages.push({
      role: "user",
      content: message,
      imageData,
    });

    // 调用 Gemini API
    const geminiResult = await callGemini(messages, {
      files: projectFiles,
    });

    if (!geminiResult.success || !geminiResult.data) {
      await updateProjectStatus(project, "error", { error: geminiResult.error });
      return NextResponse.json({
        success: false,
        message: "",
        error: geminiResult.error || "AI 响应失败",
        completed: false,
        project,
      });
    }

    const { thinking, actions, message: aiMessage, completed } = geminiResult.data;

    // 执行 Agent 操作
    if (actions && actions.length > 0) {
      const actionResult = await executeAgentActions(project, actions);
      
      if (!actionResult.success) {
        console.warn("部分操作失败:", actionResult.results);
      }
    }

    // 如果项目已完成，自动安装依赖并启动预览
    // 检查是否需要启动服务器：
    // 1. 新项目：创建了 package.json 且 completed
    // 2. 修改项目：项目之前有 previewUrl（说明之前在运行）
    const isNewProject = completed && actions && actions.some(a => a.type === "create_file" && a.path === "package.json");
    const wasRunning = project.previewUrl || project.previewPort;
    const shouldStartServer = isNewProject || wasRunning;

    if (shouldStartServer) {
      try {
        // 只有新项目才需要安装依赖
        if (isNewProject) {
          const installResult = await installDependencies(project);
          if (!installResult.success) {
            console.error("依赖安装失败:", installResult.error);
          }
        }

        // 启动开发服务器
        const serverResult = await startDevServer(project);
        
        if (serverResult.success && serverResult.previewUrl) {
          await updateProjectStatus(project, "running", { 
            previewUrl: serverResult.previewUrl 
          });
        }
      } catch (error) {
        console.error("启动预览失败:", error);
      }
    }

    // 重新加载项目获取最新状态
    const updatedProject = await loadProject(project.id);

    return NextResponse.json({
      success: true,
      message: aiMessage,
      thinking,
      actions,
      project: updatedProject || project,
      completed,
    });
  } catch (error) {
    console.error("Agent API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "",
        error: error instanceof Error ? error.message : "服务器内部错误",
        completed: false,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/agent
 * 获取项目列表
 */
export async function GET(): Promise<NextResponse> {
  try {
    const projects = await listProjects();
    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "获取项目列表失败",
      },
      { status: 500 }
    );
  }
}

