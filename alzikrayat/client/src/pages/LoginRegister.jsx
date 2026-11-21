import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

function LoginRegister({ user, onLogin }) {
  const [mode, setMode] = useState('login'); // "login" or "register"

  // already logged in, nothing to do here
  if (user) return <Navigate to="/gallery" replace />;

  return (
    <section className="form-page">
      <h1>{mode === 'login' ? 'Log in' : 'Create an account'}</h1>

      <div className="toggle" role="group" aria-label="Login or register">
        <button
          type="button"
          className={mode === 'login' ? 'active' : ''}
          aria-pressed={mode === 'login'}
          onClick={() => setMode('login')}
        >
          Log in
        </button>
        <button
          type="button"
          className={mode === 'register' ? 'active' : ''}
          aria-pressed={mode === 'register'}
          onClick={() => setMode('register')}
        >
          Register
        </button>
      </div>

      {mode === 'login' ? <LoginForm onLogin={onLogin} /> : <RegisterForm onLogin={onLogin} />}
    </section>
  );
}

export default LoginRegister;
