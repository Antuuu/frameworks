import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import User from './common/User';
import './../style/UsersList.css';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData: User[] = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-list-container">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <Link to={`/users/${user.id}`} className="user-link">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
