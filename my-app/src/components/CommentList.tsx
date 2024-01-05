import React, { useState, useEffect } from 'react';
import Comment from './common/Comment';
import Pagination from './common/Pagination';

const CommentList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const commentsPerPage = 10;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data: Comment[] = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  // Calculate pagination variables
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  // Change page
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="comment-list">
      <h2 className="text-2xl font-bold mb-4">All Comments</h2>
      <ul>
        {currentComments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-name">{comment.name}</div>
            <div className="comment-email">{comment.email}</div>
            <div className="comment-body">{comment.body}</div>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(comments.length / commentsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CommentList;
