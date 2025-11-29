import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* 可以在这里添加更多部分，如 Pricing, Testimonials, Contact 等 */}
        <div id="stats" className="py-20 bg-slate-800">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-6">
                 <div className="text-4xl font-bold text-brand-500 mb-2">99.9%</div>
                 <div className="text-slate-400">系统可用性</div>
               </div>
               <div className="p-6">
                 <div className="text-4xl font-bold text-brand-500 mb-2">10k+</div>
                 <div className="text-slate-400">全球客户</div>
               </div>
               <div className="p-6">
                 <div className="text-4xl font-bold text-brand-500 mb-2">24/7</div>
                 <div className="text-slate-400">技术支持</div>
               </div>
             </div>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;