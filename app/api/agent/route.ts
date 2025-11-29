/**
 * Agent API 路由
 * 处理 AI 代码生成和项目管理
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
import type { AgentChatRequest, AgentChatResponse, AgentMessage, Project } from "@/app/lib/agent-types";

/**
 * POST /api/agent
 * 处理 Agent 对话请求
 */
export async function POST(request: NextRequest): Promise<NextResponse<AgentChatResponse>> {
  try {
    const body: AgentChatRequest = await request.json();
    const { message, imageData, projectId, conversationHistory = [] } = body;

    if (!message && !imageData) {
      return NextResponse.json(
        { success: false, message: "", error: "消息内容不能为空", completed: false },
        { status: 400 }
      );
    }

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
    if (completed && actions && actions.some(a => a.type === "create_file" && a.path === "package.json")) {
      try {
        // 安装依赖
        const installResult = await installDependencies(project);
        
        if (installResult.success) {
          // 启动开发服务器
          const serverResult = await startDevServer(project);
          
          if (serverResult.success && serverResult.previewUrl) {
            await updateProjectStatus(project, "running", { 
              previewUrl: serverResult.previewUrl 
            });
          }
        } else {
          console.error("依赖安装失败:", installResult.error);
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

