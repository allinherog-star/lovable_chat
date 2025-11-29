/**
 * Agent 系统类型定义
 */

/** Agent 工具类型 */
export type AgentTool = "create_file" | "modify_file" | "delete_file" | "execute_command" | "read_file";

/** 文件操作 */
export interface FileAction {
  type: "create_file" | "modify_file" | "delete_file";
  path: string;
  content?: string;
}

/** 命令执行操作 */
export interface CommandAction {
  type: "execute_command";
  command: string;
}

/** 读取文件操作 */
export interface ReadFileAction {
  type: "read_file";
  path: string;
}

/** Agent 操作联合类型 */
export type AgentAction = FileAction | CommandAction | ReadFileAction;

/** 项目状态 */
export type ProjectStatus = 
  | "idle"           // 空闲
  | "creating"       // 创建中
  | "generating"     // 生成代码中
  | "installing"     // 安装依赖中
  | "building"       // 构建中
  | "running"        // 运行中
  | "error"          // 错误
  | "completed";     // 完成

/** 项目信息 */
export interface Project {
  id: string;
  name: string;
  path: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  previewUrl?: string;
  previewPort?: number;
  error?: string;
}

/** 文件信息 */
export interface FileInfo {
  path: string;
  content: string;
  language?: string;
}

/** Agent 响应 */
export interface AgentResponse {
  thinking: string;
  actions: AgentAction[];
  message: string;
  completed: boolean;
  needsMoreInfo: boolean;
}

/** 聊天消息（增强版） */
export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  imageData?: string;      // Base64 图片数据
  actions?: AgentAction[]; // Agent 执行的操作
  thinking?: string;       // Agent 的思考过程
  status: "pending" | "streaming" | "completed" | "error";
}

/** 执行命令结果 */
export interface CommandResult {
  success: boolean;
  output: string;
  error?: string;
  exitCode?: number;
}

/** 构建结果 */
export interface BuildResult {
  success: boolean;
  output: string;
  error?: string;
  previewUrl?: string;
}

/** API 请求体 */
export interface AgentChatRequest {
  message: string;
  imageData?: string;
  projectId?: string;
  conversationHistory?: AgentMessage[];
}

/** API 响应体 */
export interface AgentChatResponse {
  success: boolean;
  message: string;
  thinking?: string;
  actions?: AgentAction[];
  project?: Project;
  error?: string;
  completed: boolean;
}

