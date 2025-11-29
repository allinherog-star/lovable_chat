/**
 * 项目管理器
 * 负责创建临时目录、管理文件、执行构建等
 */

import { promises as fs } from "fs";
import path from "path";
import { exec, spawn, ChildProcess } from "child_process";
import { promisify } from "util";
import net from "net";
import type { Project, FileInfo, CommandResult, BuildResult, AgentAction } from "./agent-types";

const execAsync = promisify(exec);

// 项目存储目录
const PROJECTS_BASE_DIR = process.env.PROJECTS_DIR || path.join(process.cwd(), ".projects");

// 存储运行中的项目进程
const runningProcesses: Map<string, ChildProcess> = new Map();

// 端口管理 - 使用项目ID到端口的映射，确保每个项目使用固定端口
const BASE_PORT = 5173;
const PORT_RANGE = 100; // 100个端口循环利用

/**
 * 根据项目 ID 计算固定端口号
 * 使用简单哈希确保同一项目始终使用同一端口
 */
function getPortFromProjectId(projectId: string): number {
  let hash = 0;
  for (let i = 0; i < projectId.length; i++) {
    const char = projectId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // 确保正数并映射到端口范围内
  const portOffset = Math.abs(hash) % PORT_RANGE;
  return BASE_PORT + portOffset;
}

/**
 * 检查端口是否被占用
 */
async function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(true)); // 端口被占用
    server.once("listening", () => {
      server.close();
      resolve(false); // 端口可用
    });
    server.listen(port, "127.0.0.1");
  });
}

/**
 * 强制 kill 占用指定端口的进程
 */
async function killProcessOnPort(port: number): Promise<boolean> {
  try {
    // 先检查端口是否被占用
    const inUse = await isPortInUse(port);
    if (!inUse) {
      return true; // 端口未被占用，无需 kill
    }

    // 使用 lsof 找出占用端口的进程 PID（macOS/Linux）
    const { stdout } = await execAsync(`lsof -ti:${port} 2>/dev/null || true`);
    const pids = stdout.trim().split("\n").filter(pid => pid);
    
    if (pids.length > 0) {
      console.log(`端口 ${port} 被进程占用: ${pids.join(", ")}，正在 kill...`);
      for (const pid of pids) {
        try {
          await execAsync(`kill -9 ${pid}`);
          console.log(`已 kill 进程 ${pid}`);
        } catch {
          // 进程可能已经退出，忽略错误
        }
      }
      // 等待进程完全退出
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    }
    
    return true;
  } catch (error) {
    console.error(`kill 端口 ${port} 失败:`, error);
    return false;
  }
}

/**
 * 获取项目的端口（每个项目分配固定端口）
 * 如果端口被占用，会先 kill 掉占用的进程
 */
async function getPortForProject(projectId: string): Promise<number> {
  // 根据项目 ID 计算固定端口
  const targetPort = getPortFromProjectId(projectId);
  
  // 尝试 kill 占用该端口的进程
  await killProcessOnPort(targetPort);
  
  // 再次检查端口是否可用
  const inUse = await isPortInUse(targetPort);
  if (!inUse) {
    return targetPort;
  }
  
  // 如果还是被占用（可能是系统进程），尝试相邻端口
  console.log(`端口 ${targetPort} 仍被占用，尝试相邻端口...`);
  for (let i = 1; i < PORT_RANGE; i++) {
    const alternatePort = BASE_PORT + ((targetPort - BASE_PORT + i) % PORT_RANGE);
    await killProcessOnPort(alternatePort);
    const altInUse = await isPortInUse(alternatePort);
    if (!altInUse) {
      console.log(`使用备用端口: ${alternatePort}`);
      return alternatePort;
    }
  }
  
  // 所有端口都不可用，使用随机高端口
  const randomPort = Math.floor(Math.random() * 10000) + 20000;
  console.log(`所有端口都被占用，使用随机端口: ${randomPort}`);
  return randomPort;
}

/**
 * 生成唯一项目 ID
 */
export function generateProjectId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `proj_${timestamp}_${random}`;
}

/**
 * 创建新项目目录
 */
export async function createProject(name?: string): Promise<Project> {
  const id = generateProjectId();
  const projectName = name || `app_${id}`;
  const projectPath = path.join(PROJECTS_BASE_DIR, id);

  // 确保项目目录存在
  await fs.mkdir(projectPath, { recursive: true });

  const project: Project = {
    id,
    name: projectName,
    path: projectPath,
    status: "creating",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // 保存项目元数据
  await saveProjectMetadata(project);

  return project;
}

/**
 * 保存项目元数据
 */
async function saveProjectMetadata(project: Project): Promise<void> {
  const metaPath = path.join(project.path, ".project-meta.json");
  await fs.writeFile(metaPath, JSON.stringify(project, null, 2));
}

/**
 * 加载项目元数据
 */
export async function loadProject(projectId: string): Promise<Project | null> {
  try {
    const projectPath = path.join(PROJECTS_BASE_DIR, projectId);
    const metaPath = path.join(projectPath, ".project-meta.json");
    const content = await fs.readFile(metaPath, "utf-8");
    const project = JSON.parse(content);
    project.createdAt = new Date(project.createdAt);
    project.updatedAt = new Date(project.updatedAt);
    return project;
  } catch {
    return null;
  }
}

/**
 * 更新项目状态
 */
export async function updateProjectStatus(
  project: Project,
  status: Project["status"],
  extra?: Partial<Project>
): Promise<Project> {
  project.status = status;
  project.updatedAt = new Date();
  if (extra) {
    Object.assign(project, extra);
  }
  await saveProjectMetadata(project);
  return project;
}

/**
 * 创建或更新文件
 */
export async function writeFile(project: Project, filePath: string, content: string): Promise<void> {
  const fullPath = path.join(project.path, filePath);
  const dir = path.dirname(fullPath);
  
  // 确保目录存在
  await fs.mkdir(dir, { recursive: true });
  
  // 写入文件
  await fs.writeFile(fullPath, content, "utf-8");
}

/**
 * 读取文件
 */
export async function readFile(project: Project, filePath: string): Promise<string | null> {
  try {
    const fullPath = path.join(project.path, filePath);
    return await fs.readFile(fullPath, "utf-8");
  } catch {
    return null;
  }
}

/**
 * 删除文件
 */
export async function deleteFile(project: Project, filePath: string): Promise<boolean> {
  try {
    const fullPath = path.join(project.path, filePath);
    await fs.unlink(fullPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * 获取项目所有文件
 */
export async function getProjectFiles(project: Project): Promise<FileInfo[]> {
  const files: FileInfo[] = [];
  
  async function scanDir(dir: string, basePath: string = ""): Promise<void> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.join(basePath, entry.name);
        
        // 跳过特殊目录和文件
        if (entry.name.startsWith(".") || 
            entry.name === "node_modules" || 
            entry.name === "dist" ||
            entry.name === "build") {
          continue;
        }
        
        if (entry.isDirectory()) {
          await scanDir(fullPath, relativePath);
        } else if (entry.isFile()) {
          try {
            const content = await fs.readFile(fullPath, "utf-8");
            const ext = path.extname(entry.name).slice(1);
            files.push({
              path: relativePath,
              content,
              language: getLanguageFromExt(ext),
            });
          } catch {
            // 跳过无法读取的文件（可能是二进制文件）
          }
        }
      }
    } catch {
      // 目录不存在或无法读取
    }
  }
  
  await scanDir(project.path);
  return files;
}

/**
 * 根据文件扩展名获取语言
 */
function getLanguageFromExt(ext: string): string {
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    css: "css",
    html: "html",
    json: "json",
    md: "markdown",
    py: "python",
    sh: "shell",
  };
  return map[ext] || "text";
}

/**
 * 执行命令
 */
export async function executeCommand(
  project: Project,
  command: string
): Promise<CommandResult> {
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd: project.path,
      env: { ...process.env, CI: "true" },
      timeout: 120000, // 2分钟超时
    });
    
    return {
      success: true,
      output: stdout + (stderr ? `\n${stderr}` : ""),
    };
  } catch (error: unknown) {
    const execError = error as { stdout?: string; stderr?: string; code?: number; message?: string };
    return {
      success: false,
      output: execError.stdout || "",
      error: execError.stderr || execError.message || "命令执行失败",
      exitCode: execError.code,
    };
  }
}

/**
 * 安装项目依赖
 */
export async function installDependencies(project: Project): Promise<CommandResult> {
  await updateProjectStatus(project, "installing");
  
  // 检查是否存在 package.json
  const pkgExists = await readFile(project, "package.json");
  if (!pkgExists) {
    return {
      success: false,
      output: "",
      error: "未找到 package.json 文件",
    };
  }
  
  // 使用 npm install
  return executeCommand(project, "npm install --legacy-peer-deps");
}

/**
 * 构建项目
 */
export async function buildProject(project: Project): Promise<BuildResult> {
  await updateProjectStatus(project, "building");
  
  const result = await executeCommand(project, "npm run build");
  
  if (result.success) {
    return {
      success: true,
      output: result.output,
    };
  }
  
  return {
    success: false,
    output: result.output,
    error: result.error,
  };
}

/**
 * 检查是否为生产环境（需要使用静态构建）
 */
function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === "production" || 
         !!process.env.RAILWAY_PUBLIC_DOMAIN ||
         !!process.env.VERCEL_URL;
}

/**
 * 构建并准备静态文件服务（用于生产环境）
 */
export async function buildAndServeStatic(project: Project): Promise<BuildResult> {
  await updateProjectStatus(project, "building");
  
  // 运行构建
  const buildResult = await executeCommand(project, "npm run build");
  
  if (!buildResult.success) {
    await updateProjectStatus(project, "error", { error: buildResult.error });
    return {
      success: false,
      output: buildResult.output,
      error: buildResult.error || "构建失败",
    };
  }
  
  // 生成预览 URL（使用静态文件代理路由）
  const previewUrl = `/api/preview/${project.id}`;
  
  await updateProjectStatus(project, "running", { 
    previewUrl,
    previewPort: 0, // 标记为静态服务模式
  });
  
  return {
    success: true,
    output: buildResult.output,
    previewUrl,
  };
}

/**
 * 启动开发服务器或构建静态文件
 * 在生产环境使用静态构建，开发环境使用 Vite dev server
 */
export async function startDevServer(project: Project): Promise<BuildResult> {
  // 生产环境使用静态构建
  if (isProductionEnvironment()) {
    return buildAndServeStatic(project);
  }
  
  // 开发环境使用 Vite dev server
  return startViteDevServer(project);
}

/**
 * 启动 Vite 开发服务器（仅用于开发环境）
 */
async function startViteDevServer(project: Project): Promise<BuildResult> {
  // 如果已有进程在运行，先停止
  await stopDevServer(project);
  
  // 获取该项目专属的端口
  const port = await getPortForProject(project.id);
  
  await updateProjectStatus(project, "running", { previewPort: port });
  
  return new Promise((resolve) => {
    const child = spawn("npm", ["run", "dev", "--", "--port", port.toString(), "--host"], {
      cwd: project.path,
      env: { ...process.env, CI: "true" },
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });
    
    runningProcesses.set(project.id, child);
    
    let output = "";
    let resolved = false;
    
    const checkReady = (data: string) => {
      output += data;
      // Vite 服务器启动后会输出 URL
      if (!resolved && (output.includes("Local:") || output.includes("localhost") || output.includes("Network:"))) {
        resolved = true;
        const previewUrl = `http://localhost:${port}`;
        updateProjectStatus(project, "running", { previewUrl, previewPort: port });
        resolve({
          success: true,
          output,
          previewUrl,
        });
      }
    };
    
    child.stdout?.on("data", (data) => checkReady(data.toString()));
    child.stderr?.on("data", (data) => checkReady(data.toString()));
    
    child.on("error", (error) => {
      if (!resolved) {
        resolved = true;
        resolve({
          success: false,
          output,
          error: error.message,
        });
      }
    });
    
    child.on("exit", (code) => {
      runningProcesses.delete(project.id);
      if (!resolved) {
        resolved = true;
        resolve({
          success: code === 0,
          output,
          error: code !== 0 ? `进程退出，代码: ${code}` : undefined,
        });
      }
    });
    
    // 超时处理
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        const previewUrl = `http://localhost:${port}`;
        resolve({
          success: true,
          output,
          previewUrl,
        });
      }
    }, 15000);
  });
}

/**
 * 停止开发服务器
 */
export async function stopDevServer(project: Project): Promise<void> {
  const child = runningProcesses.get(project.id);
  if (child) {
    child.kill("SIGTERM");
    runningProcesses.delete(project.id);
  }
  
  // 如果有记录的端口，也 kill 掉占用该端口的进程
  if (project.previewPort) {
    await killProcessOnPort(project.previewPort);
  }
  
  await updateProjectStatus(project, "idle", { previewUrl: undefined, previewPort: undefined });
}

/**
 * 执行 Agent 操作
 */
export async function executeAgentActions(
  project: Project,
  actions: AgentAction[]
): Promise<{ success: boolean; results: string[] }> {
  const results: string[] = [];
  let allSuccess = true;
  
  for (const action of actions) {
    try {
      switch (action.type) {
        case "create_file":
        case "modify_file":
          await writeFile(project, action.path, action.content || "");
          results.push(`✓ ${action.type === "create_file" ? "创建" : "修改"}文件: ${action.path}`);
          break;
          
        case "delete_file":
          await deleteFile(project, action.path);
          results.push(`✓ 删除文件: ${action.path}`);
          break;
          
        case "execute_command":
          const cmdResult = await executeCommand(project, action.command);
          if (cmdResult.success) {
            results.push(`✓ 执行命令: ${action.command}`);
          } else {
            results.push(`✗ 命令失败: ${action.command}\n${cmdResult.error}`);
            allSuccess = false;
          }
          break;
          
        case "read_file":
          const content = await readFile(project, action.path);
          if (content !== null) {
            results.push(`✓ 读取文件: ${action.path}`);
          } else {
            results.push(`✗ 文件不存在: ${action.path}`);
          }
          break;
      }
    } catch (error) {
      results.push(`✗ 操作失败: ${JSON.stringify(action)}\n${error}`);
      allSuccess = false;
    }
  }
  
  return { success: allSuccess, results };
}

/**
 * 清理项目
 */
export async function cleanupProject(projectId: string): Promise<void> {
  const project = await loadProject(projectId);
  if (project) {
    await stopDevServer(project);
    try {
      await fs.rm(project.path, { recursive: true, force: true });
    } catch {
      // 忽略删除错误
    }
  }
}

/**
 * 列出所有项目
 */
export async function listProjects(): Promise<Project[]> {
  try {
    await fs.mkdir(PROJECTS_BASE_DIR, { recursive: true });
    const entries = await fs.readdir(PROJECTS_BASE_DIR, { withFileTypes: true });
    const projects: Project[] = [];
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const project = await loadProject(entry.name);
        if (project) {
          projects.push(project);
        }
      }
    }
    
    return projects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch {
    return [];
  }
}

