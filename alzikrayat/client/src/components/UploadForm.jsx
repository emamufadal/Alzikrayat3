import { useEffect, useState } from 'react';
import { request } from '../api.js';

function UploadForm({ user, onUploaded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  // show a preview of the chosen image and clean it up afterwards
  useEffect(() => {
    if (!file) {
      setPreview('');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setError('Please choose an image');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('title', title);
    formData.append('description', description);

    setUploading(true);
    setError('');
    try {
      const photo = await request('/api/photos', { method: 'POST', body: formData, user });
      onUploaded(photo);
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="photo-file">Image (up to 5MB)</label>
      <input
        id="photo-file"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0] || null)}
        required
      />
      {preview && (
        <div className="photo-frame upload-preview">
          <img src={preview} alt="Selected file preview" />
        </div>
      )}

      <label htmlFor="photo-title">Title</label>
      <input
        id="photo-title"
        value={title}
        maxLength="100"
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="photo-description">Story or caption (optional)</label>
      <textarea
        id="photo-description"
        rows="3"
        maxLength="500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload photo'}
      </button>
    </form>
  );
}

export default UploadForm;
