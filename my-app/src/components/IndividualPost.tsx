import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from "./common/Post";
import User from "./common/User";
import Comment from './common/Comment';
import './../style/IndividualPost.css'; // Import the custom styles

const IndividualPost: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!postResponse.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData: Post = await postResponse.json();
        setPost(postData);

        // Fetch user data based on userId
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData: User = await userResponse.json();
        setUser(userData);

        // Fetch comments data based on postId
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData: Comment[] = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post || !user || comments.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="individual-post-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>

      <div className="user-info">
        <h3>User Information</h3>
        <p>{`User: ${user.name} (${user.email})`}</p>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-name">{comment.name}</div>
              <div className="comment-body">{comment.body}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndividualPost;
