import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

/**
 * Navbar displays navigation links depending on authentication state. When
 * a user is logged in, links to view logs, add a new log and logout are
 * displayed. Otherwise, links to login and register are shown.
 */
const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ color: '#fff', fontWeight: 'bold' }}>Travel Log</Link>
      </div>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/add">Add Log</Link>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;