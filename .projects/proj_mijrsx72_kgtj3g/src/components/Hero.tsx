import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v2.0 现已发布 - 探索新功能
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6">
            构建您的
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> 数字化未来 </span>
            始于今日
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            我们提供最先进的一站式解决方案，帮助您的企业在数字时代实现指数级增长。无需代码，极速部署，安全可靠。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25 active:scale-95">
              立即开始
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full text-base font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">
              <PlayCircle className="w-4 h-4" />
              观看演示
            </button>
          </div>

          {/* Dashboard Preview (Abstract) */}
          <div className="mt-16 w-full max-w-5xl mx-auto relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800">
               <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
               </div>
               <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-90">
                  {/* Mock UI Elements */}
                  <div className="col-span-2 space-y-4">
                    <div className="h-32 bg-slate-800 rounded-lg animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-slate-800 rounded-lg animate-pulse"></div>
                      <div className="h-24 bg-slate-800 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 bg-slate-800 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-slate-800 rounded-lg animate-pulse"></div>
                    <div className="h-12 bg-slate-800 rounded-lg animate-pulse"></div>
                    <div className="h-16 bg-slate-800 rounded-lg animate-pulse"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;