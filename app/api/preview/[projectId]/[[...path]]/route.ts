/**
 * 预览代理路由
 * 生产环境：直接服务构建后的静态文件
 * 开发环境：代理到 Vite 开发服务器
 */

import { NextRequest, NextResponse } from "next/server";
import { loadProject } from "@/app/lib/project-manager";
import { promises as fs } from "fs";
import path from "path";

// MIME 类型映射
const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

/**
 * 获取文件的 MIME 类型
 */
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || "application/octet-stream";
}

/**
 * 检查是否为生产环境
 */
function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === "production" || 
         !!process.env.RAILWAY_PUBLIC_DOMAIN ||
         !!process.env.VERCEL_URL;
}

/**
 * 生成友好的错误/加载页面
 */
function getLoadingPage(message: string, autoReload = true): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${message}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .container {
            text-align: center;
            padding: 2rem;
            max-width: 400px;
          }
          .spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          h1 { font-size: 1.5rem; margin-bottom: 0.75rem; font-weight: 600; }
          p { opacity: 0.9; line-height: 1.5; }
          .btn {
            margin-top: 1.5rem;
            padding: 0.75rem 2rem;
            border: 2px solid white;
            background: rgba(255,255,255,0.1);
            color: white;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.2s;
          }
          .btn:hover { background: rgba(255,255,255,0.2); }
        </style>
        ${autoReload ? '<script>setTimeout(() => location.reload(), 2000);</script>' : ''}
      </head>
      <body>
        <div class="container">
          <div class="spinner"></div>
          <h1>${message}</h1>
          <p>正在构建您的应用，请稍候...</p>
          <button class="btn" onclick="location.reload()">刷新页面</button>
        </div>
      </body>
    </html>
  `;
}

/**
 * 从构建目录服务静态文件
 */
async function serveStaticFile(
  projectPath: string,
  requestPath: string,
  projectId: string
): Promise<NextResponse | null> {
  // Vite 构建输出到 dist 目录
  const distPath = path.join(projectPath, "dist");
  
  // 清理请求路径
  let filePath = requestPath || "";
  if (filePath.startsWith("/")) {
    filePath = filePath.slice(1);
  }
  
  // 尝试查找文件
  const possiblePaths = [
    path.join(distPath, filePath),
    path.join(distPath, filePath, "index.html"),
    path.join(distPath, "index.html"), // SPA fallback
  ];
  
  for (const tryPath of possiblePaths) {
    try {
      const stat = await fs.stat(tryPath);
      if (stat.isFile()) {
        const content = await fs.readFile(tryPath);
        const mimeType = getMimeType(tryPath);
        
        // 如果是 HTML 文件，修复资源路径
        if (mimeType.includes("text/html")) {
          let html = content.toString("utf-8");
          const baseUrl = `/api/preview/${projectId}`;
          
          // 修复资源路径
          html = html.replace(/src="\//g, `src="${baseUrl}/`);
          html = html.replace(/href="\//g, `href="${baseUrl}/`);
          
          // 添加 base 标签
          if (!html.includes("<base")) {
            html = html.replace("<head>", `<head>\n    <base href="${baseUrl}/">`);
          }
          
          return new NextResponse(html, {
            status: 200,
            headers: {
              "Content-Type": mimeType,
              "Cache-Control": "no-cache, no-store, must-revalidate",
            },
          });
        }
        
        // 其他静态资源
        return new NextResponse(content, {
          status: 200,
          headers: {
            "Content-Type": mimeType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch {
      // 文件不存在，继续尝试
    }
  }
  
  return null;
}

// 处理 GET 请求
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; path?: string[] }> }
): Promise<NextResponse | Response> {
  const { projectId, path: pathSegments } = await params;
  
  // 加载项目
  const project = await loadProject(projectId);
  
  if (!project) {
    return new NextResponse(getLoadingPage("项目不存在", false), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
  
  // 检查项目状态
  if (project.status === "building" || project.status === "installing") {
    return new NextResponse(getLoadingPage("正在构建中..."), {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
  
  if (project.status === "generating" || project.status === "creating") {
    return new NextResponse(getLoadingPage("正在生成代码..."), {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
  
  const requestPath = pathSegments ? pathSegments.join("/") : "";
  
  // 生产环境：服务静态文件
  if (isProductionEnvironment()) {
    const staticResponse = await serveStaticFile(project.path, requestPath, projectId);
    
    if (staticResponse) {
      return staticResponse;
    }
    
    // 文件不存在，检查是否有构建产物
    try {
      await fs.access(path.join(project.path, "dist", "index.html"));
      // dist 存在但请求的文件不存在，返回 404
      return new NextResponse("File not found", { status: 404 });
    } catch {
      // dist 不存在，可能还在构建中
      return new NextResponse(getLoadingPage("正在准备预览..."), {
        status: 503,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  }
  
  // 开发环境：代理到 Vite 服务器
  if (!project.previewPort) {
    return new NextResponse(getLoadingPage("预览服务未启动"), {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
  
  const targetUrl = `http://127.0.0.1:${project.previewPort}/${requestPath}${request.nextUrl.search}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Accept": request.headers.get("Accept") || "*/*",
        "Accept-Encoding": request.headers.get("Accept-Encoding") || "gzip, deflate",
      },
    });
    
    const contentType = response.headers.get("Content-Type") || "text/html";
    const body = await response.arrayBuffer();
    
    if (contentType.includes("text/html")) {
      let html = new TextDecoder().decode(body);
      const baseUrl = `/api/preview/${projectId}`;
      
      html = html.replace(/src="\//g, `src="${baseUrl}/`);
      html = html.replace(/href="\//g, `href="${baseUrl}/`);
      
      if (!html.includes("<base")) {
        html = html.replace("<head>", `<head><base href="${baseUrl}/">`);
      }
      
      return new NextResponse(html, {
        status: response.status,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-cache",
        },
      });
    }
    
    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": response.headers.get("Cache-Control") || "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("预览代理错误:", error);
    return new NextResponse(getLoadingPage("预览服务正在启动..."), {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}

// 处理 POST 请求（用于开发环境的 HMR）
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; path?: string[] }> }
): Promise<NextResponse> {
  const { projectId, path: pathSegments } = await params;
  
  const project = await loadProject(projectId);
  
  if (!project || !project.previewPort) {
    return NextResponse.json({ error: "预览服务未启动" }, { status: 503 });
  }
  
  // 生产环境不支持 POST
  if (isProductionEnvironment()) {
    return NextResponse.json({ error: "静态模式不支持此操作" }, { status: 405 });
  }
  
  const targetPath = pathSegments ? pathSegments.join("/") : "";
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
    return NextResponse.json({ error: "代理请求失败" }, { status: 502 });
  }
}
