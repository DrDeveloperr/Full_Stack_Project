import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Find Your Dream Job 🚀</h1>
        <p>Connect with top employers and opportunities across India</p>
        <div className="hero-buttons">
          <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
          {!user && <Link to="/register" className="btn-secondary">Get Started</Link>}
          {user?.role === 'EMPLOYER' && <Link to="/employer-dashboard" className="btn-secondary">Post a Job</Link>}
        </div>
      </div>
      <div className="features">
        <div className="feature-card"><span>🔍</span><h3>Search Jobs</h3><p>Browse hundreds of listings across all domains</p></div>
        <div className="feature-card"><span>📄</span><h3>Easy Apply</h3><p>Apply with one click and track your applications</p></div>
        <div className="feature-card"><span>🏢</span><h3>Top Employers</h3><p>Connect with India's leading companies</p></div>
      </div>
    </div>
  );
};

export default Home;
