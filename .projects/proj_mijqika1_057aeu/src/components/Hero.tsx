import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <div id="home" className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-purple-500">
            构建未来的数字体验
          </h1>
          <p className="text-xl text-slate-400 mb-10">
            我们提供最先进的技术解决方案，帮助您的业务在数字时代腾飞。快速、安全、可扩展。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-full text-lg font-medium transition-all hover:scale-105">
              立即开始 <ArrowRight className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all border border-slate-700">
              <PlayCircle className="h-5 w-5" /> 观看演示
            </button>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}