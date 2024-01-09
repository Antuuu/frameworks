import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Todo from './common/Todo';
import User from './common/User';
import Pagination from './common/Pagination';
import './../style/TodoList.css'; // Import your custom styles

interface TodoCardProps {
  todo: Todo;
  user: User | undefined;
  onDelete: (todoId: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, user, onDelete }) => (
  <li className="todo-item">
    <div className="todo-content">
      <h3 className="todo-title">{todo.title}</h3>
      <p className="todo-status">{todo.completed ? 'Completed' : 'Incomplete'}</p>
      {user && (
        <p className="todo-user">
          User: <Link to={`/users/${user.id}`}>{user.name}</Link>
        </p>
      )}
      <button onClick={() => onDelete(todo.id)} className="delete-button">
        Delete
      </button>
    </div>
  </li>
);

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const todosPerPage = 10;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!todoResponse.ok) {
          throw new Error('Failed to fetch todos');
        }
        const todoData: Todo[] = await todoResponse.json();
        setTodos(todoData);

        // Fetch user data based on unique userIds
        const userIds = Array.from(new Set(todoData.map((todo) => todo.userId)));
        const userResponses = await Promise.all(
          userIds.map(async (userId) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch user with id ${userId}`);
            }
            return response.json();
          })
        );
        const userData: User[] = userResponses;
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTodos();
  }, []);

  // Calculate pagination variables
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Change page
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (todoId: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">All Todos</h2>
      <ul className="todo-list">
        {currentTodos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} user={users.find((user) => user.id === todo.userId)} onDelete={handleDelete} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(todos.length / todosPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TodoList;
