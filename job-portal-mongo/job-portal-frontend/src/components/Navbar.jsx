import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };
  const getDashboardLink = () => user?.role === 'SEEKER' ? '/seeker-dashboard' : '/employer-dashboard';

  return (
    <nav className="navbar">
      <div className="navbar-brand"><Link to="/">💼 JobPortal</Link></div>
      <div className="navbar-links">
        <Link to="/jobs">Browse Jobs</Link>
        {user ? (
          <>
            <Link to={getDashboardLink()}>Dashboard</Link>
            <span className="navbar-user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
