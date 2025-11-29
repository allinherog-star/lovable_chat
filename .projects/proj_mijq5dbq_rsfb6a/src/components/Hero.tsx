import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              2.0 版本全新上线
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              构建未来的 <span className="text-primary">数字体验</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              我们提供一站式技术解决方案，帮助您的企业快速实现数字化转型。高性能、可扩展、安全可靠。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-medium text-lg">
                开始使用
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full hover:bg-slate-50 transition-all font-medium text-lg">
                <PlayCircle className="mr-2 h-5 w-5 text-slate-500" />
                观看演示
              </button>
            </div>
            <div className="pt-4 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="User" />
              </div>
              <p>已有超过 10,000+ 团队信赖使用</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}