import React from 'react';
import { Code2, Palette, Smartphone, Globe, Zap, Shield } from 'lucide-react';

const features = [
  {
    name: '全栈开发',
    description: '从前端到后端，我们提供完整的 Web 解决方案，使用最新的技术栈构建高性能应用。',
    icon: Code2,
  },
  {
    name: 'UI/UX 设计',
    description: '以用户为中心的设计理念，打造美观、易用且引人入胜的用户界面体验。',
    icon: Palette,
  },
  {
    name: '移动端适配',
    description: '确保您的网站在所有设备上都能完美运行，无论是手机、平板还是桌面电脑。',
    icon: Smartphone,
  },
  {
    name: 'SEO 优化',
    description: '遵循最佳 SEO 实践，提高您的网站在搜索引擎中的排名，带来更多自然流量。',
    icon: Globe,
  },
  {
    name: '极速性能',
    description: '极致的代码优化和缓存策略，确保页面秒开，提供流畅的用户体验。',
    icon: Zap,
  },
  {
    name: '安全保障',
    description: '企业级的安全防护措施，保护您的数据和用户隐私免受威胁。',
    icon: Shield,
  },
];

export const Features: React.FC = () => {
  return (
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">核心优势</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            打造卓越的数字体验
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            我们不仅仅是写代码，更是为您提供从构思KZ到落地的全方位数字化解决方案。
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative group">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white group-hover:bg-indigo-600 transition-colors">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
