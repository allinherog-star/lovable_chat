# Lovable Chat - AI 对话生成应用

一个极简、美观、具有交互感的 AI 对话生成应用，采用 Next.js 15 App Router 最佳实践构建。

## ✨ 特性

- 🎨 **极简设计** - 现代化 UI，玻璃态效果，流畅动画
- 🌓 **暗黑模式** - 支持亮色/暗色/跟随系统三种模式
- 💬 **实时对话** - 流畅的消息发送与接收体验
- 📱 **响应式布局** - 完美适配桌面端和移动端
- ⚡ **性能优先** - RSC 优先，智能缓存，懒加载

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript 5.6+
- **样式**: Tailwind CSS 4.0
- **动画**: Framer Motion
- **图标**: Lucide React
- **代码规范**: ESLint + Prettier

## 📁 目录结构

\`\`\`
app/
├── api/                    # API 路由
│   └── chat/
│       └── route.ts        # 对话 API
├── components/             # 通用组件
│   ├── layout/
│   │   └── header.tsx      # 顶部导航
│   └── ui/
│       ├── button.tsx      # 按钮组件
│       └── theme-toggle.tsx # 主题切换
├── features/               # 功能模块
│   └── chat/
│       ├── components/     # Chat 组件
│       ├── hooks/          # Chat Hooks
│       ├── types.ts        # 类型定义
│       └── index.ts        # 模块导出
├── providers/              # 上下文提供者
│   └── theme-provider.tsx  # 主题上下文
├── globals.css             # 全局样式
├── layout.tsx              # 根布局
└── page.tsx                # 首页
\`\`\`

## 🚀 快速开始

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000)

### 生产构建

\`\`\`bash
npm run build
npm start
\`\`\`

## 🎯 最佳实践

### Server Components vs Client Components

- **默认使用 Server Components** - 减少客户端 JavaScript 负载
- **仅在需要时使用 Client Components** - 交互、状态、浏览器 API

\`\`\`tsx
// Server Component (默认)
export default function Page() {
  return <div>Static content</div>;
}

// Client Component (需要交互)
"use client";
export function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState(...)}>Click</button>;
}
\`\`\`

### 数据获取

\`\`\`tsx
// Server Component 中直接 fetch
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // 缓存 1 小时
  });
  return res.json();
}
\`\`\`

### 性能优化

1. **RSC 优先** - 静态内容使用 Server Components
2. **缓存策略** - 合理设置 fetch 缓存时间
3. **懒加载** - 使用 \`next/dynamic\` 延迟加载非关键组件
4. **图片优化** - 使用 \`next/image\` 自动优化

## 📄 License

MIT


