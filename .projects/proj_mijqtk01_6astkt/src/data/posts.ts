import { BlogPost } from '../types';

export const posts: BlogPost[] = [
  {
    id: '1',
    title: '探索 React 18 的新特性',
    excerpt: '深入了解 React 18 带来的并发模式、自动批处理和新的 Hooks，以及它们如何改变我们的开发方式。',
    content: `
React 18 引入了许多令人兴奋的新特性，最引人注目的是并发渲染（Concurrent Rendering）。

## 什么是并发渲染？

并发渲染允许 React 同时准备多个版本的 UI。这并不是说 React 在同一时刻做多件事（因为 JavaScript 是单线程的），而是指 React 可以暂停、恢复甚至放弃渲染任务。

### 自动批处理（Automatic Batching）

在 React 18 之前，只有在 React 事件处理程序中的更新才会被批处理。现在，Promise、setTimeout、原生事件处理程序中的更新也会自动批处理。

\`\`\`javascript
// React 18 之前
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 会渲染两次
}, 1000);

// React 18
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 只会渲染一次
}, 1000);
\`\`\`

## 新的 Hooks

- useTransition
- useDeferredValue
- useId

这些新特性为构建高性能的用户界面提供了强大的工具。
    `,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    date: '2024-03-15',
    author: {
      name: '张三',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    tags: ['React', 'Frontend', 'Web Development'],
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'TypeScript 高级技巧指南',
    excerpt: '掌握 TypeScript 的泛型、工具类型和类型推断，让你的代码更加健壮和易于维护。',
    content: `
TypeScript 不仅仅是给 JavaScript 加上类型注解。它的类型系统非常强大，可以帮助我们捕获潜在的错误。

## 泛型（Generics）

泛型允许我们编写可重用的代码组件。

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## 实用工具类型（Utility Types）

TypeScript 提供了许多内置的工具类型，如 \`Partial<T>\`、\`Pick<T, K>\` 和 \`Omit<T, K>\`。

### Pick 示例

\`\`\`typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;
\`\`\`

掌握这些技巧将使你在大型项目中游刃有余。
    `,
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    date: '2024-03-10',
    author: {
      name: '李四',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    tags: ['TypeScript', 'Programming', 'Guide'],
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'Tailwind CSS 的设计哲学',
    excerpt: '为什么 Utility-First CSS 框架变得如此流行？探讨 Tailwind CSS 如何提高开发效率。',
    content: `
Tailwind CSS 是一种实用优先（utility-first）的 CSS 框架，它与 Bootstrap 等传统框架有很大不同。

## 不再为类名烦恼

使用 Tailwind，你不需要发明像 \`sidebar-inner-wrapper\` 这样的类名。你只需要组合现有的工具类。

## 响应式设计变得简单

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- 内容 -->
</div>
\`\`\`

只需添加前缀，即可轻松处理不同屏幕尺寸的样式。
    `,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    date: '2024-03-05',
    author: {
      name: '王五',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    tags: ['CSS', 'Tailwind', 'Design'],
    readTime: '4 min read'
  }
];