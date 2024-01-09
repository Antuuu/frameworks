import React, { useState, ChangeEvent, FormEvent } from 'react';

interface PhotoFormProps {
  onCreate?: (newPhoto: any) => void;
  onUpdate?: (updatedPhoto: any) => void;
}

const PhotoForm: React.FC<PhotoFormProps> = ({ onCreate = () => {}, onUpdate = () => {} }) => {
  const [formData, setFormData] = useState({ id: '', albumId: '', title: '', url: '', thumbnailUrl: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request
      const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          albumId: formData.albumId,
          title: formData.title,
          url: formData.url,
          thumbnailUrl: formData.thumbnailUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create photo');
      }

      // Update state after successful creation
      const newPhoto: any = await response.json();
      onCreate(newPhoto);

      // Clear form data
      setFormData({ id: '', albumId: '', title: '', url: '', thumbnailUrl: '' });
    } catch (error) {
      console.error('Error creating photo:', error);
    }
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PUT request
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          albumId: formData.albumId,
          title: formData.title,
          url: formData.url,
          thumbnailUrl: formData.thumbnailUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update photo');
      }

      // Update state after successful update
      const updatedPhoto: any = await response.json();
      onUpdate(updatedPhoto);

      // Clear form data
      setFormData({ id: '', albumId: '', title: '', url: '', thumbnailUrl: '' });
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const handlePatchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PATCH request
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          albumId: formData.albumId,
          title: formData.title,
          url: formData.url,
          thumbnailUrl: formData.thumbnailUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update photo with PATCH');
      }

      // Update state after successful update
      const updatedPhoto: any = await response.json();
      onUpdate(updatedPhoto);

      // Clear form data
      setFormData({ id: '', albumId: '', title: '', url: '', thumbnailUrl: '' });
    } catch (error) {
      console.error('Error updating photo with PATCH:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateSubmit} className="photo-create-form">
        <label htmlFor="albumId">Album ID:</label>
        <input
          type="number"
          id="albumId"
          name="albumId"
          value={formData.albumId}
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

        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />

        <label htmlFor="thumbnailUrl">Thumbnail URL:</label>
        <input
          type="text"
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          required
        />

        <button type="submit" className="create-button">
          Create Photo
        </button>
      </form>

      <form onSubmit={handleUpdateSubmit} className="photo-update-form">
        <label htmlFor="id">Photo ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="albumId">Album ID:</label>
        <input
          type="number"
          id="albumId"
          name="albumId"
          value={formData.albumId}
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

        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />

        <label htmlFor="thumbnailUrl">Thumbnail URL:</label>
        <input
          type="text"
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          required
        />

        <button type="submit" className="update-button">
          Update Photo (PUT)
        </button>
      </form>

      <form onSubmit={handlePatchSubmit} className="photo-patch-form">
        <label htmlFor="id">Photo ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="albumId">Album ID:</label>
        <input
          type="number"
          id="albumId"
          name="albumId"
          value={formData.albumId}
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

        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />

        <label htmlFor="thumbnailUrl">Thumbnail URL:</label>
        <input
          type="text"
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          required
        />

        <button type="submit" className="patch-button">
          Update Photo (PATCH)
        </button>
      </form>
    </div>
  );
};

export default PhotoForm;
