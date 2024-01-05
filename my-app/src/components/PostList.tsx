import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostCard: React.FC<Post> = ({ id, title, body }) => {
  return (
    <div className="post-card">
      <div className="post-content">
        <h2 className="post-title">
          <Link to={`/posts/${id}`}>{title}</Link>
        </h2>
        <p className="post-body">{body}</p>
      </div>
    </div>
  );
};

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
