import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Github, Twitter } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <PenTool className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DevBlog</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">首页</Link>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">关于</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">归档</a>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
              订阅
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;