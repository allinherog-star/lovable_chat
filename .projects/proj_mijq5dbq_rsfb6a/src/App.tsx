import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <Features />
        {/* 这里可以继续添加更多部分，如 Testimonials, Pricing, CTA 等 */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">准备好开始您的数字化之旅了吗？</h2>
            <p className="text-blue-100 text-xl mb-8">立即注册，开启 14 天免费试用，无需绑定信用卡。</p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
              立即免费开始
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;