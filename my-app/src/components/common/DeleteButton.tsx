import React from 'react';

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => (
  <button onClick={onDelete} className="delete-button">
    Delete
  </button>
);

export default DeleteButton;
