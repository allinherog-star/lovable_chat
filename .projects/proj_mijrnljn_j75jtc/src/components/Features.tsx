import React from 'react';
import { Zap, Shield, BarChart, Globe, Layers, Users } from 'lucide-react';

const features = [
  {
    name: '极速性能',
    description: '基于最新的技术栈构建，确保您的应用在任何设备上都能秒开，提供丝滑的用户体验。',
    icon: Zap,
  },
  {
    name: '企业级安全',
    description: '内置银行级别的加密和安全防护措施，全天候保护您的数据资产安全。',
    icon: Shield,
  },
  {
    name: '实时数据分析',
    description: '强大的数据分析仪表盘，帮助您实时监控业务指标，做出明智的决策。',
    icon: BarChart,
  },
  {
    name: '全球化部署',
    description: '一键部署到全球边缘节点，让世界各地的用户都能享受低延迟的访问速度。',
    icon: Globe,
  },
  {
    name: '无缝集成',
    description: '拥有丰富的 API 接口和插件生态，轻松与您现有的工作流和工具集成。',
    icon: Layers,
  },
  {
    name: '团队协作',
    description: '专为团队设计，支持多人实时协作、权限管理和版本控制，提升团队效率。',
    icon: Users,
  },
];

const Features = () => {
  return (
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">核心功能</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            打造完美产品所需的一切
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            我们提供全方位的工具和服务，解决开发过程中的痛点，让您专注于业务创新。
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary rounded-2xl hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm hover:shadow-md">
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-primary ring-4 ring-white group-hover:bg-primary group-hover:text-white transition-colors">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {feature.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM4 4h5V2H4v2zm1 1h5.5v-2H5v2zm9.5 0h5v-2h-5v2zm5 0V4h2v1h-2zm0 11v1h2v-1h-2zm0 1a1 1 0 001 1v-2a1 1 0 00-1 1zm-1.707 3.707l-1.414-1.414-1.414 1.414 1.414 1.414 1.414-1.414z" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;