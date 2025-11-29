import { Header } from './components/Header';
import { BlogCard } from './components/BlogCard';
import { Footer } from './components/Footer';
import { posts } from './data/posts';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            探索 <span className="text-blue-600">代码</span> 与 <span className="text-blue-600">创造</span> 的边界
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            欢迎来到 DevBlog，这里汇集了最新的技术趋势、深入的代码教程和开发者生活感悟。
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200">
              开始阅读
            </button>
            <button className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors">
              订阅更新
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
          <a href="#" className="text-blue-600 font-medium hover:underline">查看全部 →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gray-900 rounded-2xl p-8 md:p-12 text-center md:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold text-white mb-2">订阅我们的周刊</h3>
              <p className="text-gray-400">每周一发送，包含最新的技术文章和资源推荐，无垃圾邮件。</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="输入您的邮箱地址"
                className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                订阅
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;