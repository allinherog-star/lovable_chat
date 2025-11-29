import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-indigo-600 backdrop-blur-sm shadow-sm">
            {post.tags[0]}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          <Link to={`/post/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-6 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
            />
            <span className="ml-2 text-sm font-medium text-gray-900">{post.author.name}</span>
          </div>
          <Link 
            to={`/post/${post.id}`}
            className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            阅读更多 <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};