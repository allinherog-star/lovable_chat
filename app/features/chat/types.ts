/** 消息角色类型 */
export type MessageRole = "user" | "assistant" | "system";

/** 消息状态 */
export type MessageStatus = "pending" | "streaming" | "completed" | "error";

/** 单条消息接口 */
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status: MessageStatus;
}

/** 对话接口 */
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

/** API 请求体 */
export interface ChatRequest {
  message: string;
  conversationId?: string;
  stream?: boolean;
}

/** API 响应体 */
export interface ChatResponse {
  id: string;
  content: string;
  role: MessageRole;
  conversationId: string;
}

/** 简单的自增 ID 计数器 */
let idCounter = 0;

/** 生成唯一 ID - 仅在客户端使用 */
export function generateId(): string {
  idCounter += 1;
  return `msg-${idCounter}-${Math.random().toString(36).substring(2, 9)}`;
}

