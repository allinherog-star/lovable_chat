import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <div id="home" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            全新版本 v2.0 现已发布
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8">
            构建您的 <span className="gradient-text">数字化未来</span>
            <br />
            从今天开始
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            TechFlow 帮助企业快速搭建现代化数字基础设施。简单易用，功能强大，安全可靠。加入全球 500+ 创新企业的行列。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl shadow-blue-600/20 hover:scale-105">
              免费开始使用 <ArrowRight className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105">
              <PlayCircle className="h-5 w-5" /> 观看演示
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}