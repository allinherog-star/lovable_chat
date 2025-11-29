import React from 'react';
import { Search, ShoppingCart, Camera } from 'lucide-react';

interface JDHeaderProps {
  cartCount: number;
  setIsCartOpen: (isOpen: boolean) => void;
}

export const JDHeader: React.FC<JDHeaderProps> = ({ cartCount, setIsCartOpen }) => {
  return (
    <div className="bg-white border-b border-[#ddd] sticky top-0 z-40 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center h-[100px]">
          {/* Logo */}
          <div className="w-[190px] h-[120px] -mt-10 relative bg-white shadow-sm z-50 flex items-center justify-center">
             {/* Using text as placeholder for JD logo to avoid external image dependency issues */}
             <div className="text-jd-red font-black text-5xl italic tracking-tighter">
               JD<span className="text-black text-3xl not-italic">.COM</span>
             </div>
          </div>

          {/* Search Area */}
          <div className="flex-1 ml-10">
            <div className="flex">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  className="w-full h-[36px] border-2 border-jd-red pl-4 pr-12 outline-none text-sm"
                  placeholder="iPhone 15 Pro Max"
                />
                <Camera className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-jd-red" />
              </div>
              <button className="w-[80px] h-[36px] bg-jd-red text-white text-sm font-bold flex items-center justify-center hover:bg-jd-dark transition-colors">
                <Search className="w-4 h-4 mr-1" /> 搜索
              </button>
              
              {/* Cart Button */}
              <button 
                className="ml-5 w-[130px] h-[36px] border border-[#eee] bg-white flex items-center justify-center text-jd-red text-sm hover:border-jd-red transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                我的购物车
                <span className="absolute top-1 right-2 bg-jd-red text-white text-xs rounded-full px-1.5 min-w-[16px] h-[14px] flex items-center justify-center leading-none transform -translate-y-1/2">
                  {cartCount}
                </span>
              </button>
            </div>
            
            {/* Hot Words */}
            <div className="mt-2 text-xs text-gray-400 space-x-3">
              <a href="#" className="text-jd-red hover:underline">新款手机</a>
              <a href="#" className="hover:text-jd-red hover:underline">数码家电</a>
              <a href="#" className="hover:text-jd-red hover:underline">每满300减40</a>
              <a href="#" className="hover:text-jd-red hover:underline">超市囤货</a>
              <a href="#" className="hover:text-jd-red hover:underline">电脑办公</a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center space-x-6 text-[15px] font-bold text-[#333] h-10">
          <a href="#" className="text-jd-red hover:text-jd-dark">秒杀</a>
          <a href="#" className="hover:text-jd-red">优惠券</a>
          <a href="#" className="hover:text-jd-red">PLUS会员</a>
          <a href="#" className="hover:text-jd-red">品牌闪购</a>
          <a href="#" className="hover:text-jd-red">拍卖</a>
          <a href="#" className="hover:text-jd-red">京东家电</a>
          <a href="#" className="hover:text-jd-red">京东超市</a>
          <a href="#" className="hover:text-jd-red">京东生鲜</a>
        </div>
      </div>
    </div>
  );
};
