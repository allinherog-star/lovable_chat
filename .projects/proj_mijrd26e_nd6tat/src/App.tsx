import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { JDHeader } from './components/JDHeader';
import { JDHero } from './components/JDHero';
import { JDSeckill } from './components/JDSeckill';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { products } from './data/products';
import { Product, CartItem } from './types';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans">
      <TopBar />
      <JDHeader 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        setIsCartOpen={setIsCartOpen} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <main>
        <JDHero />
        <JDSeckill />
        
        {/* Recommendation Section */}
        <div className="max-w-[1200px] mx-auto px-4 pb-16">
          <div className="flex items-center justify-center mb-6">
             <h3 className="text-2xl font-bold text-[#333]">为你推荐</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map(product => (
              <div key={product.id} className="group">
                <ProductCard 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* JD Footer Style */}
      <footer className="bg-[#eaeaea] pt-10 pb-5 text-[#666] text-xs">
        <div className="max-w-[1200px] mx-auto px-4">
           <div className="grid grid-cols-4 gap-4 mb-8 text-center">
              <div className="flex items-center justify-center"><div className="w-10 h-10 rounded-full bg-gray-400 mr-2"></div><span className="text-lg font-bold">多 · 品类齐全</span></div>
              <div className="flex items-center justify-center"><div className="w-10 h-10 rounded-full bg-gray-400 mr-2"></div><span className="text-lg font-bold">快 · 极速配送</span></div>
              <div className="flex items-center justify-center"><div className="w-10 h-10 rounded-full bg-gray-400 mr-2"></div><span className="text-lg font-bold">好 · 正品行货</span></div>
              <div className="flex items-center justify-center"><div className="w-10 h-10 rounded-full bg-gray-400 mr-2"></div><span className="text-lg font-bold">省 · 天天低价</span></div>
           </div>
           <div className="border-t border-[#ccc] pt-8 text-center space-y-2">
              <p className="space-x-4">
                <a href="#" className="hover:text-jd-red">关于我们</a>
                <a href="#" className="hover:text-jd-red">联系我们</a>
                <a href="#" className="hover:text-jd-red">联系客服</a>
                <a href="#" className="hover:text-jd-red">合作招商</a>
                <a href="#" className="hover:text-jd-red">商家帮助</a>
                <a href="#" className="hover:text-jd-red">营销中心</a>
                <a href="#" className="hover:text-jd-red">手机京东</a>
                <a href="#" className="hover:text-jd-red">友情链接</a>
                <a href="#" className="hover:text-jd-red">销售联盟</a>
                <a href="#" className="hover:text-jd-red">京东社区</a>
                <a href="#" className="hover:text-jd-red">风险监测</a>
                <a href="#" className="hover:text-jd-red">隐私政策</a>
              </p>
              <p>京公网安备 11000002000088号 | 京ICP证070359号 | 互联网药品信息服务资格证编号(京)-经营性-2014-0008 | 新出发京零 字第大120007号</p>
              <p>Copyright © 2004 - 2024  京东JD.com 版权所有 | 消费者维权热线：4006067733</p>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;