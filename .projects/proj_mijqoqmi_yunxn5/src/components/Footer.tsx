import React from 'react';
import { Rocket, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <Rocket className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl">NextTech</span>
            </div>
            <p className="text-slate-400 text-base">
              致力于为全球企业提供最先进的数字化转型解决方案。让技术更有温度，让创新触手可及。
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">产品</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">功能特性</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">解决方案</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">价格方案</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">更新日志</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">支持</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">帮助文档</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">API 参考</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">系统状态</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">联系我们</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">公司</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">关于我们</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">加入我们</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">合作伙伴</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">新闻动态</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">法律</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">隐私政策</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">服务条款</a></li>
                  <li><a href="#" className="text-base text-slate-400 hover:text-white">Cookie 政策</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-base text-slate-400 xl:text-center">
            &copy; 2024 NextTech Inc. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;