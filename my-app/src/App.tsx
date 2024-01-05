import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import PostList from './components/PostList';
import IndividualPost from './components/IndividualPost';
import UsersList from './components/UsersList'; // Import the UsersList component
import UserDetails from './components/UserDetails';


const Home: React.FC = () => {
  return <h1 className="text-4xl font-bold text-center mt-8">Welcome to My Blog</h1>;
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
          <Route path="/users" element={<UsersList />} /> {/* Add route for UsersList */}
          <Route path="/users/:id" element={<UserDetails />} />
          {/* Add other routes if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
