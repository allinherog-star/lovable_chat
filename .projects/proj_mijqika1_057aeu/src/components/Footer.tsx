import React from 'react';
import { Rocket, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-brand-500 font-bold text-xl mb-4">
              <Rocket className="h-6 w-6" />
              <span>FutureTech</span>
            </div>
            <p className="text-slate-400 text-sm">
              致力于为全球企业提供最优质的数字化转型解决方案。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">产品</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-brand-500 text-sm">功能特性</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-500 text-sm">定价方案</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-500 text-sm">更新日志</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">公司</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-brand-500 text-sm">关于我们</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-500 text-sm">加入我们</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-500 text-sm">联系方式</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; 2024 FutureTech Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}