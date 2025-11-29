import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* 这里可以继续添加其他部分，如 Pricing, Testimonials 等 */}
        
        {/* 一个简单的 CTA 区域 */}
        <div className="bg-blue-600 py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              准备好开始您的数字化之旅了吗？
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              立即加入超过 10,000+ 开发者的社区，开始构建您的下一个伟大项目。
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
              免费注册账户
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;