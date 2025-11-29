import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#home" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">首页</a>
              <a href="#features" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">功能</a>
              <a href="#pricing" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">价格</a>
              <a href="#about" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">关于我们</a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">登录</button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
              立即开始
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b">
            <a href="#home" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">首页</a>
            <a href="#features" className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">功能</a>
            <a href="#pricing" className="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">价格</a>
            <div className="pt-4 flex flex-col space-y-2">
              <button className="w-full text-center text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium border border-gray-200">登录</button>
              <button className="w-full text-center bg-primary text-white px-4 py-2 rounded-lg text-base font-medium">立即开始</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;