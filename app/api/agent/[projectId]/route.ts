/**
 * 项目操作 API 路由
 * 处理单个项目的操作（启动、停止、删除等）
 */

import { NextRequest, NextResponse } from "next/server";
import {
  loadProject,
  updateProjectStatus,
  installDependencies,
  startDevServer,
  stopDevServer,
  cleanupProject,
  getProjectFiles,
} from "@/app/lib/project-manager";

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

/**
 * GET /api/agent/[projectId]
 * 获取项目详情
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { projectId } = await params;
    const project = await loadProject(projectId);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "项目不存在" },
        { status: 404 }
      );
    }

    const files = await getProjectFiles(project);

    return NextResponse.json({
      success: true,
      project,
      files,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "获取项目失败",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/agent/[projectId]
 * 执行项目操作
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { projectId } = await params;
    const body = await request.json();
    const { action } = body;

    const project = await loadProject(projectId);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "项目不存在" },
        { status: 404 }
      );
    }

    switch (action) {
      case "start": {
        // 启动开发服务器
        const installResult = await installDependencies(project);
        if (!installResult.success) {
          return NextResponse.json({
            success: false,
            error: `安装依赖失败: ${installResult.error}`,
          });
        }

        const startResult = await startDevServer(project);
        const updatedProject = await loadProject(projectId);

        return NextResponse.json({
          success: startResult.success,
          project: updatedProject,
          previewUrl: startResult.previewUrl,
          error: startResult.error,
        });
      }

      case "stop": {
        await stopDevServer(project);
        const updatedProject = await loadProject(projectId);
        
        return NextResponse.json({
          success: true,
          project: updatedProject,
        });
      }

      case "restart": {
        await stopDevServer(project);
        const startResult = await startDevServer(project);
        const updatedProject = await loadProject(projectId);

        return NextResponse.json({
          success: startResult.success,
          project: updatedProject,
          previewUrl: startResult.previewUrl,
          error: startResult.error,
        });
      }

      default:
        return NextResponse.json(
          { success: false, error: `未知操作: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "操作失败",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/agent/[projectId]
 * 删除项目
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { projectId } = await params;
    await cleanupProject(projectId);

    return NextResponse.json({
      success: true,
      message: "项目已删除",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "删除失败",
      },
      { status: 500 }
    );
  }
}

