import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onPostSelect: (post: Post) => void;
}

const PostCard = ({ post, onPostSelect }: PostCardProps) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
      onClick={() => onPostSelect(post)}
    >
      <img className="h-56 w-full object-cover" src={post.imageUrl} alt={post.title} />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors duration-300">{post.title}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          <span>{post.author}</span> &middot; <span>{post.date}</span>
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
        <span className="font-semibold text-purple-600 dark:text-purple-400 group-hover:underline">
          阅读全文 &rarr;
        </span>
      </div>
    </div>
  );
};

export default PostCard;
