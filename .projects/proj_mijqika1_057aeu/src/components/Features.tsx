import React from 'react';
import { Zap, Shield, Globe, Cpu } from 'lucide-react';

const features = [
  {
    name: '极速性能',
    description: '采用最新的边缘计算技术，确保全球访问速度毫秒级响应。',
    icon: Zap,
  },
  {
    name: '银行级安全',
    description: '端到端加密，多重身份验证，全天候安全监控保护您的数据。',
    icon: Shield,
  },
  {
    name: '全球覆盖',
    description: '在200+个国家和地区拥有服务器节点，业务无国界。',
    icon: Globe,
  },
  {
    name: 'AI 驱动',
    description: '内置人工智能引擎，自动优化资源分配，提升运营效率。',
    icon: Cpu,
  },
];

export default function Features() {
  return (
    <div id="features" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-brand-500 font-semibold tracking-wide uppercase">核心功能</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            为什么选择我们？
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            精心打造的每一个功能，只为给您带来极致的体验。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-brand-500 transition-colors group">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{feature.name}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}