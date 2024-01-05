import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../style/PhotosList.css'; // Import your custom styles
import Pagination from './common/Pagination';
import Album from './common/Album';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const PhotoList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const photosPerPage = 10;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photoResponse = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (!photoResponse.ok) {
          throw new Error('Failed to fetch photos');
        }
        const photoData: Photo[] = await photoResponse.json();
        setPhotos(photoData);

        // Fetch album data based on unique albumIds
        const albumIds = Array.from(new Set(photoData.map((photo) => photo.albumId)));
        const albumResponses = await Promise.all(
          albumIds.map(async (albumId) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch album with id ${albumId}`);
            }
            return response.json();
          })
        );
        const albumData: Album[] = albumResponses;
        setAlbums(albumData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPhotos();
  }, []);

  // Calculate pagination variables
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Change page
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2 className="title">All Photos</h2>
      <ul className="photo-list">
        {currentPhotos.map((photo) => {
          const album = albums.find((album) => album.id === photo.albumId);

          return (
            <li key={photo.id} className="photo-item">
              <div className="photo-content">
                <h3 className="photo-title">{photo.title}</h3>
                <img src={photo.thumbnailUrl} alt={photo.title} className="photo-thumbnail" />
                {album && (
                  <p className="photo-album">
                    Album: <Link to={`/albums/${album.id}`}>{album.title}</Link>
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(photos.length / photosPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PhotoList;
