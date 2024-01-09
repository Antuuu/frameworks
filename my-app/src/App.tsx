import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import PostList from './components/PostList';
import IndividualPost from './components/IndividualPost';
import UsersList from './components/UsersList';
import UserDetails from './components/UserDetails';
import CommentList from './components/CommentList';
import TodoList from './components/TodoList';
import AlbumList from './components/AlbumList';
import PhotoList from './components/PhotoList';
import IndividualAlbum from './components/IndividualAlbum';
import PostForm from './components/forms/PostForm';
import UserForm from './components/forms/UserForm';
import CommentForm from './components/forms/CommentForm';
import TodoForm from './components/forms/TodoForm';
import AlbumForm from './components/forms/AlbumForm';
import PhotoForm from './components/forms/PhotoForm';



const Home: React.FC = () => {
  return <h1 className="text-4xl font-bold text-center mt-8">Welcome to My Site</h1>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<IndividualPost />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/comments" element={<CommentList />} />
          <Route path="/comments/:id" element={<CommentList />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/todo/:id" element={<TodoList />} />
          <Route path="/albums" element={<AlbumList />} />
          <Route path="/albums/:id" element={<IndividualAlbum />} />
          <Route path="/photos" element={<PhotoList />} />
          <Route path="/photos/:id" element={<PhotoList />} />
          <Route path="/admin/post" element={<PostForm />} />
          <Route path="/admin/user" element={<UserForm />} />
          <Route path="/admin/comment" element={<CommentForm />} />
          <Route path="/admin/todo" element={<TodoForm />} />
          <Route path="/admin/album" element={<AlbumForm />} />
          <Route path="/admin/photo" element={<PhotoForm />} />



          {/* Add other routes if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
