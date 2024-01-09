import React, { useState, ChangeEvent, FormEvent } from 'react';
import Post from '../common/Post';

interface PostFormProps {
  onCreate?: (newPost: Post) => void;
  onUpdate?: (updatedPost: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onCreate = () => {}, onUpdate = () => {} }) => {
  const [formData, setFormData] = useState({ id: '', title: '', body: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Update state after successful creation
      const newPost: Post = await response.json();
      onCreate(newPost);

      // Clear form data
      setFormData({ id: '', title: '', body: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PUT request
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      // Update state after successful update
      const updatedPost: Post = await response.json();
      onUpdate(updatedPost);

      // Clear form data
      setFormData({ id: '', title: '', body: '' });
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handlePatchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PATCH request
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post with PATCH');
      }

      // Update state after successful update
      const updatedPost: Post = await response.json();
      onUpdate(updatedPost);

      // Clear form data
      setFormData({ id: '', title: '', body: '' });
    } catch (error) {
      console.error('Error updating post with PATCH:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateSubmit} className="post-create-form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
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
          Create Post
        </button>
      </form>

      <form onSubmit={handleUpdateSubmit} className="post-update-form">
        <label htmlFor="id">Post ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
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
          Update Post (PUT)
        </button>
      </form>

      <form onSubmit={handlePatchSubmit} className="post-patch-form">
        <label htmlFor="id">Post ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
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
          Update Post (PATCH)
        </button>
      </form>
    </div>
  );
};

export default PostForm;
