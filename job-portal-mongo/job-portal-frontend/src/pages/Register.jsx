import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import '../styles/auth.css';

const Register = () => {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'SEEKER' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await API.post('/auth/register', form);
      setSuccess('Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account 🎯</h2>
        <p>Join thousands of job seekers and employers</p>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>I am a...</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="SEEKER">Job Seeker</option>
              <option value="EMPLOYER">Employer</option>
            </select>
          </div>
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
        <p className="auth-footer">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
