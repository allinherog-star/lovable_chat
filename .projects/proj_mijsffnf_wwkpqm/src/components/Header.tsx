import { Code2, Github, Twitter, Search } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Code2 size={24} />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">DevBlog</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">首页</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">技术文章</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">关于作者</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">订阅</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
            <Search size={20} />
          </button>
          <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
          <div className="flex gap-3">
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};