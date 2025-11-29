import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import { posts as mockPosts } from './data/posts';
import { Post } from './types';

function App() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-800 dark:text-gray-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {
          selectedPost ? (
            <PostDetail post={selectedPost} onBack={handleBackToList} />
          ) : (
            <PostList posts={mockPosts} onPostSelect={handleSelectPost} />
          )
        }
      </main>
      <Footer />
    </div>
  );
}

export default App;
