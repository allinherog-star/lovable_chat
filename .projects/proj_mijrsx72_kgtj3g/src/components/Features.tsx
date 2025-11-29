import React from 'react';
import { Shield, Zap, BarChart3, Globe, Layers, Users } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "极速部署",
    description: "使用我们的自动化工具链，在几分钟内完成部署，而不是几天。"
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: "企业级安全",
    description: "内置银行级加密和合规性检查，确保您的数据始终安全。"
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
    title: "实时分析",
    description: "通过详细的仪表板和报告，实时洞察业务表现和用户行为。"
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    title: "全球加速",
    description: "依托全球边缘网络，为世界各地的用户提供低延迟访问体验。"
  },
  {
    icon: <Layers className="w-6 h-6 text-blue-600" />,
    title: "无缝集成",
    description: "提供丰富的 API 和插件，轻松与您现有的工作流和工具集成。"
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "团队协作",
    description: "内置强大的权限管理和协作功能，让团队合作更高效。"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">为什么选择我们？</h2>
          <p className="text-lg text-slate-600">
            我们提供构建现代化业务所需的一切工具，让您专注于最重要的事情——创新。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {React.cloneElement(feature.icon as React.ReactElement, { className: "w-6 h-6 text-blue-600 group-hover:text-white transition-colors" })}
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
};

export default Features;