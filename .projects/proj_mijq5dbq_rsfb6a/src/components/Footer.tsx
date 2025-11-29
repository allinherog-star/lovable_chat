import React from 'react';
import { Rocket, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Rocket className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">FutureTech</span>
            </div>
            <p className="text-slate-400 mb-6">
              致力于为全球企业提供最前沿的技术解决方案，推动数字化创新。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">产品</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">功能特性</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">解决方案</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">价格方案</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">更新日志</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">资源</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">开发文档</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">API 参考</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">社区论坛</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">帮助中心</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">公司</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">关于我们</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">加入我们</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">联系方式</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 FutureTech Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">Cookie 设置</a>
          </div>
        </div>
      </div>
    </footer>
  );
}