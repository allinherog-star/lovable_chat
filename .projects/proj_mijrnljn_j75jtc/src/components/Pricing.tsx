import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: '基础版',
    href: '#',
    priceMonthly: 0,
    description: '适合个人开发者和小型项目试用。',
    features: [
      '1 个项目',
      '每月 10,000 次 API 调用',
      '基础数据分析',
      '社区支持',
    ],
  },
  {
    name: '专业版',
    href: '#',
    priceMonthly: 99,
    description: '适合快速成长的初创公司和团队。',
    features: [
      '无限项目',
      '每月 1,000,000 次 API 调用',
      '高级数据分析',
      '优先邮件支持',
      '自定义域名',
      '团队协作功能',
    ],
    mostPopular: true,
  },
  {
    name: '企业版',
    href: '#',
    priceMonthly: 299,
    description: '适合大型企业和高流量应用。',
    features: [
      '无限项目 & API 调用',
      '专属客户经理',
      'SLA 服务等级协议',
      'SSO 单点登录',
      '私有化部署选项',
      '24/7 电话支持',
    ],
  },
];

const Pricing = () => {
  return (
    <div id="pricing" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            简单透明的价格
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            选择最适合您业务阶段的方案，随时可以升级或取消。
          </p>
        </div>
        <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
                tier.mostPopular
                  ? 'border-primary ring-2 ring-primary shadow-xl scale-105 z-10'
                  : 'border-gray-200 hover:shadow-lg transition-shadow'
              }`}
            >
              {tier.mostPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-primary px-4 py-1 text-sm font-semibold tracking-wide uppercase text-white shadow-sm">
                    最受欢迎
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">¥{tier.priceMonthly}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">/月</span>
                </p>
                <p className="mt-6 text-gray-500">{tier.description}</p>

                <ul role="list" className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-green-500" aria-hidden="true" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  tier.mostPopular
                    ? 'bg-primary text-white hover:bg-indigo-700 shadow-md'
                    : 'bg-indigo-50 text-primary hover:bg-indigo-100'
                }`}
              >
                {tier.priceMonthly === 0 ? '免费注册' : '选择方案'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;