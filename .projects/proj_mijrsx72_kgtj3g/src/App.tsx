import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        {/* 可以继续添加 Testimonials, Pricing, CTA 等组件 */}
        
        {/* Simple CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              准备好开始您的旅程了吗？
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              加入全球数千家信任我们的企业，立即体验未来的工作方式。
            </p>
            <button className="bg-white text-blue-600 px-8 py-3.5 rounded-full text-base font-bold hover:bg-blue-50 transition-colors shadow-lg">
              免费注册账户
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;