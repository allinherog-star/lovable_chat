import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white" id="about">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Logo light={true} />
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              致力于为企业提供最先进的数字化解决方案，助力业务腾飞。
            </p>
            <div className="flex space-x-6 mt-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">产品</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">功能特性</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">解决方案</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">价格方案</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">更新日志</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">支持</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">帮助文档</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">API 参考</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">系统状态</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">公司</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">关于我们</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">博客</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">加入我们</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">法律声明</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; 2024 ModernWeb, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;