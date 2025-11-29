export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">DevBlog</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              分享关于前端开发、React 生态系统以及现代 Web 技术的思考与教程。致力于构建更好的网络体验。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">链接</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">首页</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">关于我们</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">联系方式</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">RSS 订阅</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">分类</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Frontend</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Backend</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">DevOps</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Career</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 DevBlog. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};