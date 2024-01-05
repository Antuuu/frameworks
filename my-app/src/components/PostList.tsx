import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from './common/Post';
import Pagination from './common/Pagination';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;

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
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Calculate pagination variables
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="post-list">
      {currentPosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(posts.length / postsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PostList;
