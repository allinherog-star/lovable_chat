import React from 'react';
import { Zap, Shield, BarChart3, Globe, Layers, Users } from 'lucide-react';

const features = [
  {
    name: '极速部署',
    description: '使用我们先进的 CI/CD 管道，几分钟内即可将您的应用部署到全球边缘节点。',
    icon: Zap,
  },
  {
    name: '企业级安全',
    description: '内置 DDoS 防护、WAF 和自动 SSL 证书，确保您的数据和用户安全无忧。',
    icon: Shield,
  },
  {
    name: '实时分析',
    description: '通过详细的仪表盘监控流量、性能和用户行为，做出数据驱动的决策。',
    icon: BarChart3,
  },
  {
    name: '全球覆盖',
    description: '依托于遍布全球 200+ 个城市的服务器网络，为您的用户提供最低的延迟。',
    icon: Globe,
  },
  {
    name: '无限扩展',
    description: '无论是 10 个用户还是 1000 万用户，我们的架构都能自动弹性伸缩。',
    icon: Layers,
  },
  {
    name: '团队协作',
    description: '内置强大的权限管理和协作工具，让开发、设计和运营团队无缝配合。',
    icon: Users,
  },
];

const Features = () => {
  return (
    <div id="features" className="py-16 bg-slate-50 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            全方位赋能您的业务
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-slate-500">
            我们提供一站式解决方案，包含您构建现代化应用所需的一切工具和服务。
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="mt-10 lg:mt-0 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mb-4">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-slate-900">{feature.name}</h3>
                <p className="mt-2 text-base text-slate-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;