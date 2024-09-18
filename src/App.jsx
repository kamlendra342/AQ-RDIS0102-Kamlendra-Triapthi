// src/App.js
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([
    { id: 1, url: 'https://picsum.photos/id/237/600/600', title: 'Photo 1' },
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState(photos[0]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=10');
        const realData = await response.json();

        // Format the fetched photos to match your initial photos structure
        const formattedPhotos = realData.map(photo => ({
          id: photo.id,
          url: photo.download_url, 
          title: `Photo ${photo.id}`, 
        }));

        setPhotos(prevPhotos => [...prevPhotos, ...formattedPhotos]); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="app">
      <h1>Photo Viewer</h1>
      <div className="main-photo">
        <img src={selectedPhoto.url} alt={selectedPhoto.title} />
      </div>
      <div className="thumbnail-gallery">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.url} 
            alt={photo.title}
            onClick={() => handlePhotoClick(photo)}
            style={{ cursor: 'pointer', margin: '10px', width: '250px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
