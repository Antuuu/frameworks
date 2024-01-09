import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TodoFormProps {
  onCreate?: (newTodo: any) => void;
  onUpdate?: (updatedTodo: any) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onCreate = () => {}, onUpdate = () => {} }) => {
  const [formData, setFormData] = useState({ id: '', userId: '', title: '', completed: false });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: inputValue }));
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          title: formData.title,
          completed: formData.completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      // Update state after successful creation
      const newTodo: any = await response.json();
      onCreate(newTodo);

      // Clear form data
      setFormData({ id: '', userId: '', title: '', completed: false });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PUT request
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          title: formData.title,
          completed: formData.completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      // Update state after successful update
      const updatedTodo: any = await response.json();
      onUpdate(updatedTodo);

      // Clear form data
      setFormData({ id: '', userId: '', title: '', completed: false });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handlePatchSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Send a PATCH request
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          title: formData.title,
          completed: formData.completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo with PATCH');
      }

      // Update state after successful update
      const updatedTodo: any = await response.json();
      onUpdate(updatedTodo);

      // Clear form data
      setFormData({ id: '', userId: '', title: '', completed: false });
    } catch (error) {
      console.error('Error updating todo with PATCH:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateSubmit} className="todo-create-form">
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

        <label htmlFor="completed">Completed:</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
        />

        <button type="submit" className="create-button">
          Create Todo
        </button>
      </form>

      <form onSubmit={handleUpdateSubmit} className="todo-update-form">
        <label htmlFor="id">Todo ID:</label>
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

        <label htmlFor="completed">Completed:</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
        />

        <button type="submit" className="update-button">
          Update Todo (PUT)
        </button>
      </form>

      <form onSubmit={handlePatchSubmit} className="todo-patch-form">
        <label htmlFor="id">Todo ID:</label>
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

        <label htmlFor="completed">Completed:</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
        />

        <button type="submit" className="patch-button">
          Update Todo (PATCH)
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
