import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div id="contact" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            联系我们
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            有项目想法？想咨询技术问题？随时联系我们。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-indigo-700 rounded-2xl p-10 text-white shadow-xl flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8">联系方式</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 mt-1 text-indigo-300" />
                  <div>
                    <p className="font-medium">电话</p>
                    <p className="text-indigo-200">+86 123 4567 8900</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 mt-1 text-indigo-300" />
                  <div>
                    <p className="font-medium">邮箱</p>
                    <p className="text-indigo-200">contact@devblog.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 mt-1 text-indigo-300" />
                  <div>
                    <p className="font-medium">地址</p>
                    <p className="text-indigo-200">北京市朝阳区科技园 A 座 888 室</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-600 opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-indigo-600 opacity-50"></div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">姓名</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-3"
                  placeholder="您的姓名"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-3"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">主题</label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-3"
                placeholder="项目咨询"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">留言内容</label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-3"
                placeholder="请描述您的需求..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              发送消息 <Send className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
