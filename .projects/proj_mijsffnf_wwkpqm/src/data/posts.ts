export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export const posts: BlogPost[] = [
  {
    id: 1,
    title: "深入理解 React 18 的并发模式",
    excerpt: "React 18 引入了并发渲染机制，这不仅仅是一个性能优化，更是对 React 核心渲染模型的根本性改变。本文将带你深入了解它是如何工作的。",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-03-15",
    author: "Alex Dev",
    category: "Frontend",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Tailwind CSS：现代 Web 开发的样式利器",
    excerpt: "从实用优先的 CSS 框架到设计系统的构建，Tailwind CSS 改变了我们编写样式的方式。让我们看看如何高效使用它。",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-03-12",
    author: "Sarah Design",
    category: "CSS",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "TypeScript 高级类型技巧指南",
    excerpt: "掌握泛型、映射类型和条件类型，让你的代码更加健壮和类型安全。这里有5个实用的技巧。",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-03-10",
    author: "Code Master",
    category: "TypeScript",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "2024年 Web 开发趋势展望",
    excerpt: "AI 辅助编码、Server Components、WebAssembly... 这些技术正在重塑 Web 开发的未来。",
    coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-03-08",
    author: "Tech Radar",
    category: "Trends",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "构建高性能的 Next.js 应用",
    excerpt: "利用 Next.js 的 SSR 和 ISR 特性，优化核心 Web 指标，提升用户体验和 SEO 排名。",
    coverImage: "https://images.unsplash.com/photo-1618477247222-ac5912453634?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-03-05",
    author: "Next Expert",
    category: "Backend",
    readTime: "12 min read"
  },
  {
    id: 6,
    title: "极简主义工作流：提升开发者效率",
    excerpt: "清理你的数字空间，配置你的 IDE，专注于最重要的事情。打造完美的开发者工作环境。",
    coverImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024-03-01",
    author: "Productivity",
    category: "Lifestyle",
    readTime: "4 min read"
  }
];