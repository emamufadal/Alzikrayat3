import { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import PhotoDetail from './pages/PhotoDetail.jsx';
import AddPhoto from './pages/AddPhoto.jsx';
import LoginRegister from './pages/LoginRegister.jsx';

const STORAGE_KEY = 'alzikrayatUser';

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (err) {
    return null;
  }
}

function App() {
  const [user, setUser] = useState(getSavedUser);

  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/photos/:id" element={<PhotoDetail user={user} />} />
          <Route
            path="/upload"
            element={user ? <AddPhoto user={user} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={<LoginRegister user={user} onLogin={handleLogin} />}
          />
          <Route
            path="*"
            element={
              <div className="state-message">
                <h1>Page not found</h1>
                <p>
                  <Link to="/">Go back home</Link>
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
