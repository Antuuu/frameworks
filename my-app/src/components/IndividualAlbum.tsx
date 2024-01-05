import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './../style/AlbumList.css'; // Import your custom styles
import Photo from './common/Photo';
import User from './common/User';
import Album from './common/Album';

const IndividualAlbum: React.FC = () => {
  const { id } = useParams(); // Use the useParams hook to get the 'id' parameter

  const [album, setAlbum] = useState<Album | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch album data
        const albumResponse = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
        if (!albumResponse.ok) {
          throw new Error('Failed to fetch album');
        }
        const albumData: Album = await albumResponse.json();
        setAlbum(albumData);

        // Fetch user data based on userId
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${albumData.userId}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData: User = await userResponse.json();
        setUser(userData);

        // Fetch photos data based on albumId
        const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
        if (!photosResponse.ok) {
          throw new Error('Failed to fetch photos');
        }
        const photosData: Photo[] = await photosResponse.json();
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!album || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Album: {album.title}</h2>
      <p className="album-user">
        User: <Link to={`/users/${user.id}`}>{user.name}</Link>
      </p>
      <ul className="photo-list">
        {photos.map((photo) => (
          <li key={photo.id} className="photo-item">
            <div className="photo-content">
              <h3 className="photo-title">{photo.title}</h3>
              <img src={photo.thumbnailUrl} alt={photo.title} className="photo-thumbnail" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndividualAlbum;
