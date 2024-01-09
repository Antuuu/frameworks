import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css'; // Import the custom styles

const Navbar: React.FC = () => {
  return (
    <nav>
      <div>
        <Link to="/" className="text-white text-2xl font-bold">
          Frameworks WSEI
        </Link>
        <div>
          <Link to="/posts" className="text-white">
            Posts
          </Link>
          <Link to="/users" className="text-white">
            Users
          </Link>
          <Link to="/comments" className="text-white">
            Comments
          </Link>     
          <Link to="/todo" className="text-white">
            Todo
          </Link>
          <Link to="/albums" className="text-white">
            Albums
          </Link>     
          <Link to="/photos" className="text-white">
            Photos
          </Link>                                                  
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
