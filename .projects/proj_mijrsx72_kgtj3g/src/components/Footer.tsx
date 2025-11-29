import React from 'react';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                FutureTech
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              致力于为全球企业提供最先进的数字化转型解决方案，构建更智能的未来。
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">产品</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">功能特性</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">集成</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">定价</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">更新日志</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">资源</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">文档</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API 参考</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">社区</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">博客</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">公司</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">关于我们</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">职业机会</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">法律条款</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">联系我们</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2024 FutureTech Inc. 保留所有权利。</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;