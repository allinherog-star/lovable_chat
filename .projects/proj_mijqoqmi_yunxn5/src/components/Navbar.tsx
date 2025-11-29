import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-slate-900">NextTech</span>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#home" className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">首页</a>
              <a href="#features" className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">产品特性</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">价格方案</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">关于我们</a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">登录</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
              免费试用
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-slate-100">
            <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">首页</a>
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">产品特性</a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">价格方案</a>
            <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">关于我们</a>
            <div className="pt-4 flex flex-col gap-2">
              <button className="w-full text-center px-3 py-2 text-slate-600 font-medium border border-slate-200 rounded-lg">登录</button>
              <button className="w-full text-center px-3 py-2 bg-blue-600 text-white font-medium rounded-lg">免费试用</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;