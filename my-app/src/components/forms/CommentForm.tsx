import React, { useState, ChangeEvent, FormEvent } from 'react';

interface CommentFormProps {
  onCreate?: (newComment: any) => void;
  onUpdate?: (updatedComment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onCreate = () => {}, onUpdate = () => {} }) => {
  const [formData, setFormData] = useState({ id: '', postId: '', name: '', email: '', body: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: formData.postId,
          name: formData.name,
          email: formData.email,
          body: formData.body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      // Update state after successful creation
      const newComment: any = await response.json();
      onCreate(newComment);

      // Clear form data
      setFormData({ id: '', postId: '', name: '', email: '', body: '' });
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PUT request
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: formData.postId,
          name: formData.name,
          email: formData.email,
          body: formData.body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }

      // Update state after successful update
      const updatedComment: any = await response.json();
      onUpdate(updatedComment);

      // Clear form data
      setFormData({ id: '', postId: '', name: '', email: '', body: '' });
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handlePatchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PATCH request
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: formData.postId,
          name: formData.name,
          email: formData.email,
          body: formData.body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update comment with PATCH');
      }

      // Update state after successful update
      const updatedComment: any = await response.json();
      onUpdate(updatedComment);

      // Clear form data
      setFormData({ id: '', postId: '', name: '', email: '', body: '' });
    } catch (error) {
      console.error('Error updating comment with PATCH:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateSubmit} className="comment-create-form">
        <label htmlFor="postId">Post ID:</label>
        <input
          type="number"
          id="postId"
          name="postId"
          value={formData.postId}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="body">Body:</label>
        <input
          type="text"
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
        />

        <button type="submit" className="create-button">
          Create Comment
        </button>
      </form>

      <form onSubmit={handleUpdateSubmit} className="comment-update-form">
        <label htmlFor="id">Comment ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="postId">Post ID:</label>
        <input
          type="number"
          id="postId"
          name="postId"
          value={formData.postId}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="body">Body:</label>
        <input
          type="text"
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
        />

        <button type="submit" className="update-button">
          Update Comment (PUT)
        </button>
      </form>

      <form onSubmit={handlePatchSubmit} className="comment-patch-form">
        <label htmlFor="id">Comment ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="postId">Post ID:</label>
        <input
          type="number"
          id="postId"
          name="postId"
          value={formData.postId}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="body">Body:</label>
        <input
          type="text"
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
        />

        <button type="submit" className="patch-button">
          Update Comment (PATCH)
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
