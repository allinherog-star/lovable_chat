import { Post } from '../types';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

const PostDetail = ({ post, onBack }: PostDetailProps) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
      <img className="h-96 w-full object-cover" src={post.imageUrl} alt={post.title} />
      <div className="p-6 sm:p-8 md:p-10">
        <button 
          onClick={onBack}
          className="mb-6 text-purple-600 dark:text-purple-400 hover:underline font-semibold"
        >
          &larr; 返回列表
        </button>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
        <div className="text-gray-500 dark:text-gray-400 text-base mb-8">
          <span>由 <strong>{post.author}</strong> 发布于</span>
          <span> {post.date}</span>
        </div>
        <div 
          className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
};

export default PostDetail;
