import React from 'react';
import { ArrowRight, Rss, Twitter, Github, Linkedin } from 'lucide-react';

// 模拟的博客文章数据
const mockPosts = [
  {
    id: 1,
    title: '探索 React 18 的新特性',
    excerpt: 'React 18 带来了并发渲染、自动批处理等激动人心的功能，极大地提升了应用性能和用户体验。',
    author: '技术先锋',
    date: '2024年5月10日',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    tags: ['React', '前端开发', 'JavaScript']
  },
  {
    id: 2,
    title: 'Tailwind CSS 实战指南',
    excerpt: '从入门到精通，本指南将带你领略 Tailwind CSS 的魅力，学习如何用它快速构建现代化、响应式的用户界面。',
    author: '设计之风',
    date: '2024年5月8日',
    imageUrl: 'https://images.unsplash.com/photo-1617042375876-a13e36732a04?q=80&w=800&auto=format&fit=crop',
    tags: ['CSS', 'Tailwind', 'UI/UX']
  },
  {
    id: 3,
    title: 'Vite：下一代前端构建工具',
    excerpt: 'Vite 以其闪电般的冷启动速度和即时的热模块替换（HMR）彻底改变了前端开发体验。',
    author: '效率黑客',
    date: '2024年5月5日',
    imageUrl: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=800&auto=format&fit=crop',
    tags: ['Vite', '构建工具', '性能优化']
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 头部导航 */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-slate-900">
            <Rss className="text-indigo-500" />
            <span>我的博客</span>
          </a>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-slate-600 hover:text-indigo-500 transition-colors">首页</a>
            <a href="#" className="text-slate-600 hover:text-indigo-500 transition-colors">关于</a>
            <a href="#" className="text-slate-600 hover:text-indigo-500 transition-colors">归档</a>
            <a href="#" className="text-slate-600 hover:text-indigo-500 transition-colors">联系</a>
          </div>
          <button className="md:hidden text-slate-600 hover:text-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
      </header>

      {/* 主体内容 */}
      <main className="container mx-auto px-6 py-12">
        {/* 欢迎区域 */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-xl p-12 text-white">
            <h1 className="text-5xl font-extrabold mb-4">分享知识，记录成长</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              这里是我的个人博客，专注于前端技术、设计美学和生活感悟。欢迎你的到来！
            </p>
          </div>
        </section>

        {/* 文章列表 */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-slate-900 border-l-4 border-indigo-500 pl-4">最新文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{post.author} · {post.date}</span>
                    <a href="#" className="flex items-center text-indigo-500 font-semibold group-hover:text-indigo-700 transition-colors">
                      阅读更多 <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-slate-800 text-slate-300 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left mb-4 md:mb-0">&copy; 2024 我的博客. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter /></a>
              <a href="#" className="hover:text-white transition-colors"><Github /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
