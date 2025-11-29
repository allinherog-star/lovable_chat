import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { posts } from '../data/posts';

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">文章未找到</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-500 mt-4 inline-block">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50 pb-20">
      {/* Header Image */}
      <div className="h-[400px] w-full relative">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="max-w-4xl w-full px-4 text-center text-white">
              <div className="flex items-center justify-center space-x-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium border border-white/30">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-sm md:text-base text-gray-200">
                <div className="flex items-center">
                  <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border-2 border-white mr-2" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回文章列表
          </Link>

          <div className="prose prose-lg prose-indigo max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">标签:</span>
                <div className="flex space-x-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-sm text-indigo-600 hover:text-indigo-700 cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};