import React, { useState } from 'react';
import { Menu, X, Rss } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer flex items-center gap-2">
              <Rss className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl tracking-tight text-slate-900">yang</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">首页</a>
                <a href="#articles" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">文章</a>
                <a href="#about" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">关于我</a>
                <a href="#contact" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">联系</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-blue-600/20">
              订阅更新
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="hover:bg-slate-50 block px-3 py-2 rounded-md text-base font-medium">首页</a>
            <a href="#articles" className="hover:bg-slate-50 block px-3 py-2 rounded-md text-base font-medium">文章</a>
            <a href="#about" className="hover:bg-slate-50 block px-3 py-2 rounded-md text-base font-medium">关于我</a>
            <div className="pt-4">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
                订阅更新
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}