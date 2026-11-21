import { useEffect, useState } from 'react';
import { request } from '../api.js';
import PhotoCard from '../components/PhotoCard.jsx';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [layout, setLayout] = useState('grid'); // "grid" or "list"

  useEffect(() => {
    request('/api/photos')
      .then((data) => setPhotos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <div className="page-header">
        <h1>Gallery</h1>
        <div className="toggle" role="group" aria-label="Display style">
          <button
            type="button"
            className={layout === 'grid' ? 'active' : ''}
            aria-pressed={layout === 'grid'}
            onClick={() => setLayout('grid')}
          >
            Grid
          </button>
          <button
            type="button"
            className={layout === 'list' ? 'active' : ''}
            aria-pressed={layout === 'list'}
            onClick={() => setLayout('list')}
          >
            List
          </button>
        </div>
      </div>

      {loading && <p className="state-message">Loading photos...</p>}
      {error && (
        <p className="error-message" role="alert">
          Could not load photos: {error}
        </p>
      )}
      {!loading && !error && photos.length === 0 && (
        <p className="state-message">The gallery is empty. Log in and add the first photo.</p>
      )}

      <div className={layout === 'grid' ? 'photo-grid' : 'photo-list'}>
        {photos.map((photo) => (
          <PhotoCard key={photo._id} photo={photo} layout={layout} />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
