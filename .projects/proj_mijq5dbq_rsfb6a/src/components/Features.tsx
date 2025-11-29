import React from 'react';
import { Zap, Shield, Globe, BarChart3, Users, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: "极速性能",
    description: "基于最新的技术栈构建，确保页面加载速度快如闪电，提供流畅的用户体验。"
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    title: "企业级安全",
    description: "采用银行级加密标准，全方位保护您的数据安全，让您无后顾之忧。"
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-600" />,
    title: "全球部署",
    description: "CDN 节点覆盖全球，无论您的用户身在何处，都能享受极速访问。"
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    title: "数据分析",
    description: "内置强大的数据分析仪表盘，帮助您深入了解业务表现，做出明智决策。"
  },
  {
    icon: <Users className="h-6 w-6 text-blue-600" />,
    title: "团队协作",
    description: "专为团队设计，支持多人实时协作，大幅提升工作效率。"
  },
  {
    icon: <Smartphone className="h-6 w-6 text-blue-600" />,
    title: "移动端适配",
    description: "完美适配各种移动设备，随时随地管理您的业务。"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">核心功能</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-slate-900 sm:text-4xl">
            为现代企业打造的全能平台
          </p>
          <p className="mt-4 text-xl text-slate-500">
            我们提供了一系列强大的工具和功能，帮助您简化工作流程，提升生产力。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}