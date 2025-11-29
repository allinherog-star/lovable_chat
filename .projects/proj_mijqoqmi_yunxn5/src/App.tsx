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
        {/* 这里可以添加更多部分，如 Pricing, Testimonials, CTA 等 */}
      </main>
      <Footer />
    </div>
  );
}

export default App;