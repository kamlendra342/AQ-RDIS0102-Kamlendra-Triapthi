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
          url: photo.download_url, // Using the correct key from API response
          title: `Photo ${photo.id}`, // You can customize this as needed
        }));

        setPhotos(prevPhotos => [...prevPhotos, ...formattedPhotos]); // Update the photos state
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
            src={photo.url} // Ensure consistent use of the 'url' key
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
