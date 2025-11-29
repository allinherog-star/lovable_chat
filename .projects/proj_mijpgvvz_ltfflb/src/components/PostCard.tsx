import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-indigo-600 rounded-full shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {post.date}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="h-8 w-8 rounded-full ring-2 ring-white"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">{post.author.name}</span>
          </div>
          
          <Link 
            to={`/post/${post.id}`} 
            className="flex items-center text-indigo-600 text-sm font-semibold hover:text-indigo-700 transition-colors group"
          >
            阅读更多 
            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;