import React from 'react';
import { ChevronRight, User, Plane, Hotel, Smartphone, Gift, Crown, Clock } from 'lucide-react';

const categories = [
  "家用电器", "手机 / 运营商 / 数码", "电脑 / 办公", "家居 / 家具 / 家装 / 厨具",
  "男装 / 女装 / 童装 / 内衣", "美妆 / 个护清洁 / 宠物", "女鞋 / 箱包 / 钟表 / 珠宝",
  "男鞋 / 运动 / 户外", "房产 / 汽车 / 汽车用品", "母婴 / 玩具乐器",
  "食品 / 酒类 / 生鲜 / 特产", "艺术 / 礼品鲜花 / 农资绿植", "医药保健 / 计生情趣",
  "图书 / 文娱 / 教育 / 电子书", "机票 / 酒店 / 旅游 / 生活", "理财 /O Crowdfunding / 白条 / 保险"
];

export const JDHero: React.FC = () => {
  return (
    <div className="bg-[#f4f4f4] pb-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-12 gap-2 h-[480px] pt-2">
          {/* Left: Categories */}
          <div className="col-span-2 bg-white h-full py-2 shadow-sm">
            {categories.map((cat, idx) => (
              <div key={idx} className="px-3 py-[3px] hover:bg-[#d9d9d9] cursor-pointer group flex justify-between items-center text-sm text-[#333]">
                <span className="truncate">{cat}</span>
                <span className="hidden group-hover:block text-xs"><ChevronRight className="w-3 h-3" /></span>
              </div>
            ))}
          </div>

          {/* Middle: Slider */}
          <div className="col-span-7 h-full relative group overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200" 
              alt="Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/40 border border-white/60 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-white border border-white cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-white/40 border border-white/60 cursor-pointer"></div>
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/20 w-8 h-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/20 w-8 h-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: User & Services */}
          <div className="col-span-3 h-full flex flex-col gap-2">
            {/* User Card */}
            <div className="bg-white h-[100px] p-4 flex items-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-[#eee]">
                 <User className="w-full h-full p-2 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-[#666]">Hi~ 欢迎逛京东！</p>
                <div className="mt-2 flex space-x-2">
                  <button className="text-xs px-3 py-1 rounded-full text-jd-red hover:bg-jd-red hover:text-white transition-colors">登录</button>
                  <button className="text-xs px-3 py-1 rounded-full text-[#333] hover:bg-jd-red hover:text-white transition-colors">注册</button>
                </div>
              </div>
            </div>

            {/* News */}
            <div className="bg-white flex-1 p-3 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-sm text-[#333]">京东快报</h3>
                <a href="#" className="text-xs text-[#999] hover:text-jd-red">更多 &gt;</a>
              </div>
              <ul className="space-y-1 text-xs text-[#666]">
                <li className="truncate cursor-pointer hover:text-jd-red"><span className="bg-jd-red/10 text-jd-red px-1 mr-1">HOT</span> 华为Mate60再次开售，秒罄！</li>
                <li className="truncate cursor-pointer hover:text-jd-red"><span className="bg-jd-red/10 text-jd-red px-1 mr-1">推荐</span> 京东家电超级品类日开启</li>
                <li className="truncate cursor-pointer hover:text-jd-red"><span className="bg-jd-red/10 text-jd-red px-1 mr-1">热议</span> 数码圈的新宠儿来了</li>
                <li className="truncate cursor-pointer hover:text-jd-red"><span className="bg-jd-red/10 text-jd-red px-1 mr-1">HOT</span> 这里的生鲜比超市便宜？</li>
              </ul>
            </div>

            {/* Service Grid */}
            <div className="bg-white h-[200px] grid grid-cols-4 grid-rows-3 gap-1 p-2 shadow-sm">
              {[ 
                { icon: Smartphone, label: "话费" },
                { icon: Plane, label: "机票" },
                { icon: Hotel, label: "酒店" },
                { icon: Gift, label: "礼品" },
                { icon: Crown, label: "会员" },
                { icon: Clock, label: "抢购" },
                { icon: Smartphone, label: "数码" },
                { icon: Gift, label: "游戏" },
                { icon: Plane, label: "旅行" },
                { icon: Hotel, label: "理财" },
                { icon: Crown, label: "白条" },
                { icon: Clock, label: "电影" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center cursor-pointer hover:text-jd-red group">
                  <item.icon className="w-6 h-6 text-jd-red mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-[#333] group-hover:text-jd-red">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
