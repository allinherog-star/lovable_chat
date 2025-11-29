import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

export const JDSeckill: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 mb-6">
      <div className="bg-white h-[260px] flex overflow-hidden shadow-sm">
        {/* Left: Countdown */}
        <div className="w-[190px] bg-jd-red text-white flex flex-col items-center justify-center p-4 bg-[url('https://misc.360buyimg.com/mtd/pc/index_2019/1.0.1/assets/img/4a15d8883775742e3efbb850ae14def7.png')] bg-no-repeat bg-top">
          <h3 className="text-3xl font-bold mb-6 mt-4">京东秒杀</h3>
          <div className="text-sm mb-2 opacity-80">14:00 点场 倒计时</div>
          <div className="flex space-x-2 font-bold text-xl">
             <div className="bg-[#2f3430] w-8 h-8 flex items-center justify-center rounded">01</div>
             <span className="text-[#2f3430] self-center">:</span>
             <div className="bg-[#2f3430] w-8 h-8 flex items-center justify-center rounded">25</div>
             <span className="text-[#2f3430] self-center">:</span>
             <div className="bg-[#2f3430] w-8 h-8 flex items-center justify-center rounded">49</div>
          </div>
        </div>

        {/* Right: Products Scroll */}
        <div className="flex-1 flex items-center overflow-hidden">
           {[1, 2, 3, 4, 5].map((item) => (
             <div key={item} className="flex-1 h-full border-r border-[#eee] flex flex-col items-center justify-center p-4 cursor-pointer hover:opacity-80 transition-opacity">
                <img 
                  src={`https://images.unsplash.com/photo-${item === 1 ? '1546868871-7041f2a55e12' : item === 2 ? '1580910051051-46c1b299faf7' : item === 3 ? '1523275335684-37898b6baf30' : item === 4 ? '1505740420928-5e560c06d30e' : '1572635196237-14b3f281503f'}?auto=format&fit=crop&q=80&w=200`}
                  alt="Seckill"
                  className="w-32 h-32 object-contain mb-4"
                />
                <p className="text-sm text-[#333] mb-2 line-clamp-1 w-full text-center">限时特价商品描述文字</p>
                <div className="w-full flex justify-center items-center gap-2">
                  <div className="bg-jd-red text-white text-sm font-bold px-3 py-0.5 rounded-full">¥99.00</div>
                  <span className="text-xs text-[#999] line-through">¥199</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
