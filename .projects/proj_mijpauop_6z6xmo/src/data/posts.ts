import { Post } from '../types';

export const posts: Post[] = [
  {
    id: 1,
    title: '探索 React 18 的新特性',
    author: 'AI开发者',
    date: '2023年10月27日',
    excerpt: 'React 18 带来了并发特性、自动批处理等一系列激动人心的更新，极大地提升了应用性能和用户体验。',
    content: '<h2>并发渲染 (Concurrent Rendering)</h2><p>这是 React 18 最核心的更新。它允许 React 在渲染过程中暂停和恢复，从而避免长时间的渲染任务阻塞主线程，让应用保持响应。这为 `startTransition` 等新 API 提供了基础。</p><h2>自动批处理 (Automatic Batching)</h2><p>在之前的版本中，只有在 React 事件处理函数中的状态更新会被批处理。现在，Promise、setTimeout、原生事件处理函数等异步操作中的多次状态更新也会被自动合并为一次渲染，减少了不必要的重渲染。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    title: 'Tailwind CSS 从入门到精通',
    author: '设计爱好者',
    date: '2023年10月25日',
    excerpt: 'Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了一系列底层的 CSS 功能类，让我们可以直接在 HTML 中构建任何设计。',
    content: '<h2>为什么选择 Tailwind CSS?</h2><p>与传统的组件库（如 Bootstrap）不同，Tailwind 不提供预设的 UI 组件。相反，它提供了一套完整的、可组合的功能类，让你能够以极高的效率构建完全自定义的设计。这避免了为了覆盖默认样式而编写大量 CSS 的痛苦。</p><h2>核心概念</h2><ul><li>功能类优先 (Utility-First)</li><li>响应式设计 (Responsive Design)</li><li>自定义和扩展 (Customization and Extensibility)</li></ul>',
    imageUrl: 'https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    title: 'Vite：下一代前端构建工具',
    author: '性能优化师',
    date: '2023年10月22日',
    excerpt: 'Vite 利用浏览器原生的 ES 模块支持，实现了闪电般的冷启动和极速的热模块替换（HMR），彻底改变了前端开发体验。',
    content: '<h2>Vite 的优势</h2><p>传统的构建工具（如 Webpack）需要先将所有模块打包，然后才能启动开发服务器。而 Vite 通过利用浏览器原生支持的 ES 模块，按需提供源码，无需打包，因此启动速度极快。在生产构建时，Vite 使用 Rollup 进行打包，以获得高度优化的静态资源。</p>',
    imageUrl: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  }
];
