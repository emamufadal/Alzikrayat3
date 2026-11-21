import { Link, NavLink, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          Alzikrayat
          <span className="brand-ar" lang="ar">
            الذكريات
          </span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          {user && <NavLink to="/upload">Add photo</NavLink>}
        </nav>

        <div className="nav-user">
          {user ? (
            <>
              <span>Hi {user.firstName}</span>
              <button type="button" className="btn btn-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-light">
              Please Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
