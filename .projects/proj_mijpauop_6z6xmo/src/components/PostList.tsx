import { Post } from '../types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onPostSelect: (post: Post) => void;
}

const PostList = ({ posts, onPostSelect }: PostListProps) => {
  return (
    <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} onPostSelect={onPostSelect} />
      ))}
    </div>
  );
};

export default PostList;
