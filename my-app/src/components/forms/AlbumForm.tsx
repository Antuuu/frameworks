import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AlbumFormProps {
  onCreate?: (newAlbum: any) => void;
  onUpdate?: (updatedAlbum: any) => void;
}

const AlbumForm: React.FC<AlbumFormProps> = ({ onCreate = () => {}, onUpdate = () => {} }) => {
  const [formData, setFormData] = useState({ id: '', userId: '', title: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request
      const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          title: formData.title,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create album');
      }

      // Update state after successful creation
      const newAlbum: any = await response.json();
      onCreate(newAlbum);

      // Clear form data
      setFormData({ id: '', userId: '', title: '' });
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PUT request
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          title: formData.title,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update album');
      }

      // Update state after successful update
      const updatedAlbum: any = await response.json();
      onUpdate(updatedAlbum);

      // Clear form data
      setFormData({ id: '', userId: '', title: '' });
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const handlePatchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PATCH request
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          title: formData.title,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update album with PATCH');
      }

      // Update state after successful update
      const updatedAlbum: any = await response.json();
      onUpdate(updatedAlbum);

      // Clear form data
      setFormData({ id: '', userId: '', title: '' });
    } catch (error) {
      console.error('Error updating album with PATCH:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateSubmit} className="album-create-form">
        <label htmlFor="userId">User ID:</label>
        <input
          type="number"
          id="userId"
          name="userId"
          value={formData.userId}
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

        <button type="submit" className="create-button">
          Create Album
        </button>
      </form>

      <form onSubmit={handleUpdateSubmit} className="album-update-form">
        <label htmlFor="id">Album ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="userId">User ID:</label>
        <input
          type="number"
          id="userId"
          name="userId"
          value={formData.userId}
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

        <button type="submit" className="update-button">
          Update Album (PUT)
        </button>
      </form>

      <form onSubmit={handlePatchSubmit} className="album-patch-form">
        <label htmlFor="id">Album ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="userId">User ID:</label>
        <input
          type="number"
          id="userId"
          name="userId"
          value={formData.userId}
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

        <button type="submit" className="patch-button">
          Update Album (PATCH)
        </button>
      </form>
    </div>
  );
};

export default AlbumForm;
