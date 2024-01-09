import React, { useState, ChangeEvent, FormEvent } from 'react';


interface UserFormProps {
  onCreate?: (newUser: any) => void;
  onUpdate?: (updatedUser: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onCreate = () => {}, onUpdate = () => {} }) => {
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      // Update state after successful creation
      const newUser: any = await response.json();
      onCreate(newUser);

      // Clear form data
      setFormData({ id: '', name: '', email: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PUT request
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      // Update state after successful update
      const updatedUser: any = await response.json();
      onUpdate(updatedUser);

      // Clear form data
      setFormData({ id: '', name: '', email: '' });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handlePatchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PATCH request
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user with PATCH');
      }

      // Update state after successful update
      const updatedUser: any = await response.json();
      onUpdate(updatedUser);

      // Clear form data
      setFormData({ id: '', name: '', email: '' });
    } catch (error) {
      console.error('Error updating user with PATCH:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateSubmit} className="user-create-form">
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

        <button type="submit" className="create-button">
          Create User
        </button>
      </form>

      <form onSubmit={handleUpdateSubmit} className="user-update-form">
        <label htmlFor="id">User ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
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

        <button type="submit" className="update-button">
          Update User (PUT)
        </button>
      </form>

      <form onSubmit={handlePatchSubmit} className="user-patch-form">
        <label htmlFor="id">User ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          value={formData.id}
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

        <button type="submit" className="patch-button">
          Update User (PATCH)
        </button>
      </form>
    </div>
  );
};

export default UserForm;
