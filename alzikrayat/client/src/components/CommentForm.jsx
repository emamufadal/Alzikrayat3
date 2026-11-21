import { useState } from 'react';

// onSubmit(text) must return a promise; it throws if the request fails
function CommentForm({ onSubmit }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) {
      setError('Write something before posting');
      return;
    }

    setSending(true);
    setError('');
    try {
      await onSubmit(text);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <label htmlFor="comment-text">Add a comment</label>
      <textarea
        id="comment-text"
        rows="3"
        maxLength="500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? 'Posting...' : 'Post comment'}
      </button>
    </form>
  );
}

export default CommentForm;
