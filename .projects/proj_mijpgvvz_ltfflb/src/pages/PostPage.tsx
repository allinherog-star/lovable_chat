import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { Calendar, Clock, ChevronLeft, User, Tag } from 'lucide-react';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">文章未找到</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        返回首页
      </Link>

      <header className="mb-10 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6">
          <Tag className="h-3 w-3 mr-2" />
          {post.category}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center space-x-6 text-gray-500">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {post.author.name}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {post.date}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {post.readTime}
          </div>
        </div>
      </header>

      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-12 shadow-lg">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-lg prose-indigo mx-auto text-gray-700">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-6 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex items-center p-6 bg-gray-50 rounded-xl">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="h-16 w-16 rounded-full ring-4 ring-white shadow-sm"
          />
          <div className="ml-6">
            <h3 className="text-lg font-bold text-gray-900">关于作者</h3>
            <p className="text-gray-600 mt-1">
              {post.author.name} 是一名热爱技术的开发者，专注于构建高性能的 Web 应用。
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostPage;