import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobListings from './pages/JobListings';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/seeker-dashboard" element={
            <ProtectedRoute role="SEEKER"><JobSeekerDashboard /></ProtectedRoute>
          } />
          <Route path="/employer-dashboard" element={
            <ProtectedRoute role="EMPLOYER"><EmployerDashboard /></ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
