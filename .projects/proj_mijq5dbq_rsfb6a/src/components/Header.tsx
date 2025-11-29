import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-slate-900">FutureTech</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 hover:text-primary transition-colors">功能</a>
            <a href="#solutions" className="text-slate-600 hover:text-primary transition-colors">解决方案</a>
            <a href="#pricing" className="text-slate-600 hover:text-primary transition-colors">价格</a>
            <a href="#about" className="text-slate-600 hover:text-primary transition-colors">关于我们</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-600 hover:text-primary font-medium">登录</button>
            <button className="bg-primary text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium">
              免费试用
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md">功能</a>
            <a href="#solutions" className="block px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md">解决方案</a>
            <a href="#pricing" className="block px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md">价格</a>
            <a href="#about" className="block px-3 py-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md">关于我们</a>
            <div className="pt-4 flex flex-col space-y-2">
              <button className="w-full text-center py-2 text-slate-600 border border-slate-200 rounded-md">登录</button>
              <button className="w-full text-center py-2 bg-primary text-white rounded-md">免费试用</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}