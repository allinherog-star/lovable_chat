import { Post } from '../types';

export const posts: Post[] = [
  {
    id: '1',
    title: '探索 React 18 的新特性',
    excerpt: '深入了解 React 18 带来的并发模式、自动批处理以及全新的 Suspense 功能，提升你的应用性能。',
    content: 'React 18 引入了并发渲染（Concurrent Rendering），这是 React 核心渲染模型的重大更新。并发渲染允许 React 中断渲染过程，优先处理高优先级的更新，从而提供更流畅的用户体验。\n\n此外，自动批处理（Automatic Batching）现在可以处理 Promise、setTimeout 和原生事件处理器中的状态更新，减少了不必要的重新渲染。\n\nSuspense 在服务端渲染（SSR）中的支持也得到了极大改善，允许流式传输 HTML，让用户更快看到页面内容。',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    date: '2023-10-15',
    author: {
      name: '张三',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
    },
    category: '前端开发',
    readTime: '5 分钟'
  },
  {
    id: '2',
    title: 'Tailwind CSS 设计哲学',
    excerpt: '为什么 Utility-First CSS 框架如此流行？本文将带你领略 Tailwind CSS 的高效开发体验。',
    content: 'Tailwind CSS 是一种实用优先（Utility-First）的 CSS 框架。与传统的语义化 CSS 不同，Tailwind 提供了一组低级实用类，允许你直接在 HTML 中构建设计。\n\n这种方法的优点是显而易见的：你不需要费尽心思去给 CSS 类命名，也不用担心样式表的体积随着项目增长而无限膨胀。更重要的是，它使得设计系统的一致性变得非常容易维护。',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop',
    date: '2023-10-20',
    author: {
      name: '李四',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
    },
    category: 'UI 设计',
    readTime: '4 分钟'
  },
  {
    id: '3',
    title: 'TypeScript 高级技巧',
    excerpt: '掌握泛型、映射类型和条件类型，让你的代码更加健壮和类型安全。',
    content: 'TypeScript 不仅仅是给 JavaScript 加上类型注解。它的类型系统非常强大，可以用来表达复杂的逻辑。\n\n例如，条件类型（Conditional Types）允许你根据类型关系选择类型，类似于三元运算符。映射类型（Mapped Types）则允许你基于旧类型创建新类型，这在处理对象转换时非常有用。\n\n熟练掌握这些高级特性，可以让你写出更通用、更易维护的库和工具函数。',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop',
    date: '2023-11-05',
    author: {
      name: '王五',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2080&auto=format&fit=crop'
    },
    category: '编程语言',
    readTime: '8 分钟'
  },
  {
    id: '4',
    title: '现代 Web 性能优化指南',
    excerpt: '从图片懒加载到代码分割，全方位提升你的网站加载速度和 Core Web Vitals 指标。',
    content: 'Web 性能直接影响用户留存率和 SEO 排名。优化的第一步是测量，使用 Lighthouse 或 Web Vitals 扩展来评估当前状况。\n\n图片通常是页面上最大的资源，使用 WebP 格式、设置适当的尺寸以及实施懒加载（Lazy Loading）是必不可少的。对于 JavaScript，利用打包工具的代码分割（Code Splitting）功能，按需加载路由和组件，可以显著减少首屏加载时间。',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
    date: '2023-11-12',
    author: {
      name: '赵六',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop'
    },
    category: '性能优化',
    readTime: '6 分钟'
  }
];