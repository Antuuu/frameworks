import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../style/AlbumList.css'; // Import your custom styles
import User from './common/User';
import Album from './common/Album';
import Pagination from './common/Pagination';

const AlbumList: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const albumsPerPage = 10;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!albumResponse.ok) {
          throw new Error('Failed to fetch albums');
        }
        const albumData: Album[] = await albumResponse.json();
        setAlbums(albumData);

        // Fetch user data based on unique userIds
        const userIds = Array.from(new Set(albumData.map((album) => album.userId)));
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

    fetchAlbums();
  }, []);

  // Calculate pagination variables
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  // Change page
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2 className="title">All Albums</h2>
      <ul className="album-list">
        {currentAlbums.map((album) => {
          const user = users.find((user) => user.id === album.userId);

          return (
            <li key={album.id} className="album-item">
              <div className="album-content">
                <h3 className="album-title">{album.title}</h3>
                {user && (
                  <p className="album-user">
                    User: <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </p>
                )}
                <Link to={`/albums/${album.id}`}>
                  <button className="album-button">View Album</button>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(albums.length / albumsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AlbumList;
