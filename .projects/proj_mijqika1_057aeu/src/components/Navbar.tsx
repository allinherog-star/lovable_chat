import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center gap-2 text-brand-500 font-bold text-xl">
                <Rocket className="h-8 w-8" />
                <span>FutureTech</span>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">首页</a>
                <a href="#features" className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">功能</a>
                <a href="#stats" className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">数据</a>
                <a href="#contact" className="hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">联系我们</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              开始使用
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">首页</a>
            <a href="#features" className="block hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">功能</a>
            <a href="#stats" className="block hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">数据</a>
            <a href="#contact" className="block hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">联系我们</a>
            <button className="w-full mt-4 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-md text-base font-medium">
              开始使用
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}