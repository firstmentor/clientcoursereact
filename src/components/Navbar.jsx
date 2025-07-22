import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          PNCOURSE
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/courses">Courses</Link>
            </li>

            {user && user.role === 'student' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/my-bookings">My Bookings</Link>
              </li>
            )}
          </ul>

          <div className="d-flex">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/register" className="btn btn-light text-primary fw-bold">Register</Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user?.name || 'Account'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">Profile</Link>
                  </li>

                  {user?.role === 'admin' && (
                    <li>
                      <Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link>
                    </li>
                  )}

                  <li>
                    <Link className="dropdown-item" to="/change-password">Change Password</Link>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
