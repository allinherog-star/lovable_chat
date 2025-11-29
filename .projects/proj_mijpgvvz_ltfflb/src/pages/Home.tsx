import React from 'react';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';
import { Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-indigo-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1499750310159-5b5f226932b7?q=80&w=2070&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative px-8 py-20 md:py-32 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-800/50 text-indigo-200 text-sm font-medium mb-6 border border-indigo-700">
            <Sparkles className="h-4 w-4 mr-2" />
            探索技术的边界
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            分享开发的<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-cyan-200">思考与见解</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-indigo-200 mb-10">
            这里记录了关于前端开发、UI 设计以及软件工程的最佳实践。希望能为你的开发之旅带来一些启发。
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 bg-white text-indigo-900 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
              开始阅读
            </button>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">最新文章</h2>
          <div className="hidden md:flex space-x-2">
            {['全部', '前端开发', 'UI 设计', '后端'].map((tag) => (
              <button 
                key={tag} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tag === '全部' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;