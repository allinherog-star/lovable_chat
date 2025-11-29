import React from 'react';
import { Zap, Shield, BarChart3, Globe, Layers, Users } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: '极速性能',
    description: '基于最新的边缘计算技术，确保您的应用在全球任何地方都能秒级响应。'
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    title: '银行级安全',
    description: '端到端加密，多重身份验证，24/7 全天候安全监控，守护您的数据资产。'
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    title: '实时数据分析',
    description: '强大的可视化仪表盘，助您洞察业务数据，做出明智的商业决策。'
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-600" />,
    title: '全球化部署',
    description: '一键部署到全球 200+ 节点，轻松拓展海外市场，无缝连接全球用户。'
  },
  {
    icon: <Layers className="h-6 w-6 text-blue-600" />,
    title: '无限扩展',
    description: '弹性架构设计，随业务增长自动扩容，无需担心基础设施瓶颈。'
  },
  {
    icon: <Users className="h-6 w-6 text-blue-600" />,
    title: '团队协作',
    description: '内置强大的协作工具，权限管理细致入微，提升团队工作效率。'
  }
];

export default function Features() {
  return (
    <div id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">核心优势</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-slate-900 sm:text-4xl">
            为现代化团队打造的全能平台
          </p>
          <p className="mt-4 text-xl text-slate-600">
            我们提供一站式解决方案，解决您在数字化转型过程中的所有痛点。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
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
    </div>
  );
}