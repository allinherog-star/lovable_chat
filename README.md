# AI App Builder

一个类似 Cursor 的 AI 应用生成器，使用 Gemini 2.5 Pro 模型来生成完整的 Web 应用程序。

## ✨ 功能特性

- 🤖 **Gemini 2.5 Pro** - 接入最新的 Gemini 模型进行代码生成
- 🔧 **完整 Agent 系统** - 类似 Cursor，支持创建文件、修改代码、执行命令
- 📁 **自动项目管理** - 每次创建应用时自动创建独立的临时目录
- 🏗️ **自动构建预览** - 应用完成后自动安装依赖、构建并启动开发服务器
- 📸 **截图支持** - 支持粘贴或拖拽截图，AI 会分析 UI 并实现
- 🐛 **错误修复** - 可以贴报错信息给 AI，自动分析并修复代码

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```bash
# Gemini API Key (必需)
# 获取地址: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# 项目存储目录 (可选，默认为 .projects)
# PROJECTS_DIR=/path/to/projects
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 开始使用。

## 📖 使用方式

### 创建新应用

1. 在输入框中描述你想要创建的应用，例如：
   - "创建一个带有动画效果的 Todo 应用"
   - "设计一个现代化的博客首页"
   - "构建一个天气查询应用"

2. AI 会自动：
   - 创建项目目录
   - 生成所有必要的代码文件
   - 安装依赖
   - 启动开发服务器
   - 在右侧显示实时预览

### 使用截图

1. 截取你想要实现的 UI 设计
2. 使用 `Cmd/Ctrl + V` 粘贴截图，或者拖拽图片到输入框
3. 添加描述说明（可选）
4. AI 会分析截图并生成相应的代码

### 修改应用

1. 描述你想要的修改，例如：
   - "把按钮颜色改成蓝色"
   - "添加一个搜索功能"
   - "让标题居中显示"

2. AI 会修改现有代码并自动刷新预览

### 修复错误

1. 如果预览页面有报错，复制错误信息
2. 粘贴到输入框中发送给 AI
3. AI 会分析错误并自动修复

## 🛠️ 技术栈

- **前端框架**: Next.js 15 + React 18
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **图标**: Lucide React
- **AI 模型**: Gemini 2.5 Pro
- **生成的项目**: Vite + React + TypeScript + Tailwind CSS

## 📁 项目结构

```
auto_app3/
├── app/
│   ├── api/
│   │   └── agent/           # Agent API 路由
│   ├── components/          # 通用组件
│   ├── features/
│   │   ├── chat/           # 聊天功能
│   │   └── preview/        # 预览功能
│   ├── lib/
│   │   ├── gemini.ts       # Gemini API 集成
│   │   ├── agent-types.ts  # 类型定义
│   │   └── project-manager.ts # 项目管理
│   └── page.tsx            # 主页面
├── .projects/              # 生成的项目存储目录
└── ...
```

## ⚙️ 配置说明

### 环境变量

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `GEMINI_API_KEY` | ✅ | Gemini API 密钥 |
| `PROJECTS_DIR` | ❌ | 项目存储目录，默认为 `.projects` |

### 获取 Gemini API Key

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 登录 Google 账号
3. 点击 "Create API Key" 创建密钥
4. 复制密钥到 `.env.local` 文件

## 🔧 开发

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 代码检查
npm run lint

# 清理缓存
npm run clean
```

## 📝 注意事项

1. **API 限制**: Gemini API 有请求频率限制，请合理使用
2. **端口占用**: 生成的项目会自动分配端口（从 5173 开始）
3. **临时项目**: 生成的项目存储在 `.projects` 目录，可以定期清理
4. **网络要求**: 需要能够访问 Google API 服务

## 📄 许可证

MIT License
