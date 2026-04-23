import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

const statusColors = { PENDING: '#f59e0b', ACCEPTED: '#10b981', REJECTED: '#ef4444' };

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get('/applications/my-applications');
      setApplications(res.data);
    } catch (err) { console.error('Failed to load applications'); }
    finally { setLoading(false); }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>👤 My Dashboard</h2>
        <p>Welcome, <strong>{user?.name}</strong>! Track your job applications below.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card"><h3>{applications.length}</h3><p>Total Applied</p></div>
        <div className="stat-card"><h3>{applications.filter(a => a.status === 'PENDING').length}</h3><p>Pending</p></div>
        <div className="stat-card"><h3>{applications.filter(a => a.status === 'ACCEPTED').length}</h3><p>Accepted</p></div>
        <div className="stat-card"><h3>{applications.filter(a => a.status === 'REJECTED').length}</h3><p>Rejected</p></div>
      </div>

      <h3 style={{ marginBottom: '15px' }}>My Applications</h3>

      {loading ? <div className="loading">Loading...</div>
        : applications.length === 0 ? <div className="no-data">You haven't applied to any jobs yet.</div>
        : (
          <div className="applications-list">
            {applications.map((app) => (
              <div key={app.id} className="application-card">
                <div className="application-info">
                  <h4>{app.jobTitle}</h4>
                  <p>{app.jobCompany} — {app.jobLocation}</p>
                  <small>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</small>
                </div>
                <div className="status-badge" style={{ backgroundColor: statusColors[app.status] }}>
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default JobSeekerDashboard;
