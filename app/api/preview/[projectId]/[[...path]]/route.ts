/**
 * 预览代理路由
 * 将预览请求代理到内部的 Vite 开发服务器
 * 解决 Railway 等平台上无法直接访问 localhost 端口的问题
 */

import { NextRequest, NextResponse } from "next/server";
import { loadProject } from "@/app/lib/project-manager";

// 处理 GET 请求 - 用于加载页面和静态资源
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; path?: string[] }> }
): Promise<NextResponse | Response> {
  const { projectId, path } = await params;
  
  // 加载项目获取端口信息
  const project = await loadProject(projectId);
  
  if (!project) {
    return NextResponse.json(
      { error: "项目不存在" },
      { status: 404 }
    );
  }
  
  if (!project.previewPort) {
    return NextResponse.json(
      { error: "项目预览服务未启动" },
      { status: 503 }
    );
  }
  
  // 构建目标 URL
  const targetPath = path ? path.join("/") : "";
  const targetUrl = `http://127.0.0.1:${project.previewPort}/${targetPath}${request.nextUrl.search}`;
  
  try {
    // 代理请求到 Vite 服务器
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        // 转发必要的请求头
        "Accept": request.headers.get("Accept") || "*/*",
        "Accept-Encoding": request.headers.get("Accept-Encoding") || "gzip, deflate",
        "User-Agent": request.headers.get("User-Agent") || "Preview-Proxy",
      },
    });
    
    // 获取响应内容
    const contentType = response.headers.get("Content-Type") || "text/html";
    const body = await response.arrayBuffer();
    
    // 处理 HTML 响应 - 需要修复资源路径
    if (contentType.includes("text/html")) {
      let html = new TextDecoder().decode(body);
      
      // 修复 Vite 的 HMR WebSocket 连接路径
      // Vite 默认使用 /@vite/client，需要改为代理路径
      const baseUrl = `/api/preview/${projectId}`;
      
      // 修复 script 和 link 标签中的绝对路径
      html = html.replace(/src="\//g, `src="${baseUrl}/`);
      html = html.replace(/href="\//g, `href="${baseUrl}/`);
      
      // 添加 base 标签确保相对路径正确
      if (!html.includes("<base")) {
        html = html.replace("<head>", `<head><base href="${baseUrl}/">`);
      }
      
      return new NextResponse(html, {
        status: response.status,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }
    
    // 其他资源直接返回
    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": response.headers.get("Cache-Control") || "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("预览代理错误:", error);
    
    // 返回友好的错误页面
    const errorHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>预览加载中...</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
            }
            .spinner {
              width: 50px;
              height: 50px;
              border: 3px solid rgba(255,255,255,0.3);
              border-top-color: white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin: 0 auto 1rem;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
            p { opacity: 0.8; }
            button {
              margin-top: 1rem;
              padding: 0.75rem 1.5rem;
              border: 2px solid white;
              background: transparent;
              color: white;
              border-radius: 8px;
              cursor: pointer;
              font-size: 1rem;
            }
            button:hover { background: rgba(255,255,255,0.1); }
          </style>
          <script>
            setTimeout(() => location.reload(), 3000);
          </script>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h1>预览正在启动...</h1>
            <p>服务正在初始化，请稍候</p>
            <button onclick="location.reload()">刷新页面</button>
          </div>
        </body>
      </html>
    `;
    
    return new NextResponse(errorHtml, {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  }
}

// 处理 POST 请求 - 用于 HMR 和其他 API 调用
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; path?: string[] }> }
): Promise<NextResponse | Response> {
  const { projectId, path } = await params;
  
  const project = await loadProject(projectId);
  
  if (!project || !project.previewPort) {
    return NextResponse.json(
      { error: "项目预览服务未启动" },
      { status: 503 }
    );
  }
  
  const targetPath = path ? path.join("/") : "";
  const targetUrl = `http://127.0.0.1:${project.previewPort}/${targetPath}`;
  
  try {
    const body = await request.text();
    
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": request.headers.get("Content-Type") || "application/json",
      },
      body,
    });
    
    const responseBody = await response.text();
    
    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("预览代理 POST 错误:", error);
    return NextResponse.json(
      { error: "代理请求失败" },
      { status: 502 }
    );
  }
}

