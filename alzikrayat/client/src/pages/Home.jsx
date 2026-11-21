import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../api.js';
import PhotoCard from '../components/PhotoCard.jsx';

function Home({ user }) {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    request('/api/photos')
      .then((data) => setRecent(data.slice(0, 4)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Keep the moments worth keeping</h1>
          <p>
            Alzikrayat is a place to share photos with friends and family, tell the story
            behind each one, and read what others have to say about them.
          </p>
          <div className="hero-actions">
            <Link to="/gallery" className="btn btn-primary">
              Browse the gallery
            </Link>
            {user ? (
              <Link to="/upload" className="btn btn-outline">
                Add a photo
              </Link>
            ) : (
              <Link to="/login" className="btn btn-outline">
                Create an account
              </Link>
            )}
          </div>
        </div>
        <div className="hero-banner" aria-hidden="true">
          <span lang="ar">الذكريات</span>
          <small>Alzikrayat means “the memories”</small>
        </div>
      </section>

      <section>
        <h2>Recently added</h2>
        {loading && <p className="state-message">Loading photos...</p>}
        {error && (
          <p className="error-message" role="alert">
            Could not load photos: {error}
          </p>
        )}
        {!loading && !error && recent.length === 0 && (
          <p className="state-message">No photos yet. Be the first to add one.</p>
        )}
        <div className="photo-grid">
          {recent.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} layout="grid" />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
