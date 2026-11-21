import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { request, imageUrl } from '../api.js';
import { formatDate, fullName } from '../utils.js';
import CommentForm from '../components/CommentForm.jsx';

function PhotoDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([request(`/api/photos/${id}`), request(`/api/photos/${id}/comments`)])
      .then(([photoData, commentData]) => {
        setPhoto(photoData);
        setComments(commentData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function addComment(text) {
    const newComment = await request(`/api/photos/${id}/comments`, {
      method: 'POST',
      body: { comment: text },
      user,
    });
    // add it to the list right away, no reload needed
    setComments((current) => [...current, newComment]);
  }

  async function handleDelete() {
    if (!window.confirm('Delete this photo? This cannot be undone.')) return;

    setDeleting(true);
    setDeleteError('');
    try {
      await request(`/api/photos/${id}`, { method: 'DELETE', user });
      navigate('/gallery');
    } catch (err) {
      setDeleteError(err.message);
      setDeleting(false);
    }
  }

  if (loading) return <p className="state-message">Loading photo...</p>;
  if (error) {
    return (
      <div className="state-message">
        <p className="error-message" role="alert">
          {error}
        </p>
        <Link to="/gallery">Back to the gallery</Link>
      </div>
    );
  }

  const isOwner = user && photo.userId && photo.userId._id === user._id;

  return (
    <article className="detail">
      <div className="photo-frame detail-frame">
        <img src={imageUrl(photo.fileName)} alt={photo.title} />
      </div>

      <header className="detail-header">
        <div>
          <h1>{photo.title}</h1>
          <p className="meta">
            Added by {fullName(photo.userId)} on {formatDate(photo.dateTime)}
          </p>
        </div>
        {isOwner && (
          <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete photo'}
          </button>
        )}
      </header>

      {deleteError && (
        <p className="error-message" role="alert">
          {deleteError}
        </p>
      )}
      {photo.description && <p className="detail-description">{photo.description}</p>}

      <section className="comments">
        <h2>Comments ({comments.length})</h2>

        {comments.length === 0 && <p className="meta">No comments yet.</p>}
        <ul>
          {comments.map((c) => (
            <li key={c._id}>
              <p className="comment-text">{c.comment}</p>
              <p className="meta">
                {fullName(c.userId)}, {formatDate(c.dateTime)}
              </p>
            </li>
          ))}
        </ul>

        {user ? (
          <CommentForm onSubmit={addComment} />
        ) : (
          <p>
            <Link to="/login">Please login</Link> to leave a comment.
          </p>
        )}
      </section>
    </article>
  );
}

export default PhotoDetail;
