import React from 'react';
import { Rocket, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Rocket className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl text-white">TechFlow</span>
            </div>
            <p className="text-slate-400 mb-6">
              致力于为企业提供最先进的数字化解决方案，助力业务腾飞。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">产品</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">功能特性</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">企业版</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">下载中心</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">更新日志</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">资源</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">帮助文档</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API 参考</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">社区论坛</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">开发者博客</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">公司</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">关于我们</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">加入我们</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">联系方式</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} TechFlow Inc. 保留所有权利。
        </div>
      </div>
    </footer>
  );
}