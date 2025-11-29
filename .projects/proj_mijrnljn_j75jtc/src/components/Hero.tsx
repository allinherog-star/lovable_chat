import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <div id="home" className="relative pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-primary text-sm font-semibold mb-6 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            全新版本 2.0 现已上线
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            为您的业务构建 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              未来的数字体验
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10">
            NovaTech 帮助企业快速构建、部署和扩展现代 Web 应用。利用我们强大的工具集，将您的创意转化为现实，提升开发效率。
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-indigo-700 md:py-4 md:text-lg shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-1">
              免费试用
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg transition-all hover:-translate-y-1">
              <PlayCircle className="mr-2 h-5 w-5 text-gray-500" />
              观看演示
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full pointer-events-none"></div>
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
             <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
             </div>
             <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400">
               <div className="text-center">
                 <p className="text-lg font-medium">应用仪表盘预览图</p>
                 <p className="text-sm">在此处放置您的产品截图</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;