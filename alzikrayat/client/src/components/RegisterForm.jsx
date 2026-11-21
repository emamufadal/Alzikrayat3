import { useState } from 'react';
import { request } from '../api.js';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  description: '',
};

function RegisterForm({ onLogin }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await request('/api/auth/register', { method: 'POST', body: form });
      onLogin(user); // log the new user in straight away
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div>
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
        </div>
      </div>

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />

      <label htmlFor="password">Password (at least 6 characters)</label>
      <input
        id="password"
        name="password"
        type="password"
        minLength="6"
        value={form.password}
        onChange={handleChange}
        required
      />

      <div className="form-row">
        <div>
          <label htmlFor="location">Location (optional)</label>
          <input id="location" name="location" value={form.location} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="occupation">Occupation (optional)</label>
          <input id="occupation" name="occupation" value={form.occupation} onChange={handleChange} />
        </div>
      </div>

      <label htmlFor="description">About you (optional)</label>
      <textarea id="description" name="description" rows="3" value={form.description} onChange={handleChange} />

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}

export default RegisterForm;
