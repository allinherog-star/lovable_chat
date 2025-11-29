const Header = () => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              我的博客
            </a>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">首页</a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium">关于</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
