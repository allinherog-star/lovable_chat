import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#e3e4e5] text-[#999] text-xs leading-8 border-b border-[#ddd]">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        {/* Location */}
        <div className="flex items-center cursor-pointer hover:text-jd-red">
          <MapPin className="w-3.5 h-3.5 mr-1 text-jd-red" />
          <span>北京</span>
        </div>

        {/* Right Links */}
        <ul className="flex items-center space-x-0">
          <li className="px-2 cursor-pointer hover:text-jd-red">你好，请登录</li>
          <li className="px-2 cursor-pointer text-jd-red font-bold">免费注册</li>
          <li className="px-2 border-l border-[#ccc] cursor-pointer hover:text-jd-red">我的订单</li>
          <li className="px-2 border-l border-[#ccc] cursor-pointer hover:text-jd-red flex items-center group">
            我的京东 <ChevronDown className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180" />
          </li>
          <li className="px-2 border-l border-[#ccc] cursor-pointer hover:text-jd-red">京东会员</li>
          <li className="px-2 border-l border-[#ccc] cursor-pointer hover:text-jd-red text-jd-red">企业采购</li>
          <li className="px-2 border-l border-[#ccc] cursor-pointer hover:text-jd-red flex items-center group">
            客户服务 <ChevronDown className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180" />
          </li>
          <li className="px-2 border-l border-[#ccc] cursor-pointer hover:text-jd-red flex items-center group">
            网站导航 <ChevronDown className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180" />
          </li>
          <li className="px-2 border-l border-[#ccc] cursor-pointer hover:text-jd-red">手机京东</li>
        </ul>
      </div>
    </div>
  );
};