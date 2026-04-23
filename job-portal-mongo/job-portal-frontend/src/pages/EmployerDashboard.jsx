import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import JobForm from '../components/JobForm';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => { fetchMyJobs(); }, []);

  const fetchMyJobs = async () => {
    try {
      const res = await API.get('/jobs/my-jobs');
      setJobs(res.data);
    } catch (err) { console.error('Failed to load jobs'); }
    finally { setLoading(false); }
  };

  const handlePostJob = async (formData) => {
    try {
      const res = await API.post('/jobs', formData);
      setJobs([...jobs, res.data]);
      alert('Job posted successfully!');
    } catch (err) { alert('Failed to post job'); }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await API.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((j) => j.id !== jobId));
      if (selectedJobId === jobId) { setSelectedJobId(null); setApplicants([]); }
    } catch (err) { alert('Delete failed'); }
  };

  const fetchApplicants = async (jobId) => {
    setSelectedJobId(jobId);
    try {
      const res = await API.get(`/applications/job/${jobId}`);
      setApplicants(res.data);
    } catch (err) { alert('Failed to load applicants'); }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await API.put(`/applications/${applicationId}/status?status=${status}`);
      setApplicants(applicants.map((a) => a.id === applicationId ? { ...a, status } : a));
    } catch (err) { alert('Failed to update status'); }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>🏢 Employer Dashboard</h2>
        <p>Welcome, <strong>{user?.name}</strong>! Manage your job postings below.</p>
      </div>

      <div className="dashboard-section">
        <JobForm onSubmit={handlePostJob} />
      </div>

      <div className="dashboard-section">
        <h3>My Posted Jobs ({jobs.length})</h3>
        {loading ? <div className="loading">Loading...</div>
          : jobs.length === 0 ? <div className="no-data">No jobs posted yet.</div>
          : (
            <div className="jobs-table-wrapper">
              <table className="jobs-table">
                <thead>
                  <tr><th>Title</th><th>Company</th><th>Location</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.location}</td>
                      <td>
                        <button className="btn-view" onClick={() => fetchApplicants(job.id)}>View Applicants</button>
                        <button className="btn-delete" onClick={() => handleDeleteJob(job.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {selectedJobId && (
        <div className="dashboard-section">
          <h3>Applicants for Selected Job</h3>
          {applicants.length === 0 ? <div className="no-data">No applicants yet.</div>
            : (
              <div className="applications-list">
                {applicants.map((app) => (
                  <div key={app.id} className="application-card">
                    <div className="application-info">
                      <h4>{app.seekerName}</h4>
                      <p>{app.seekerEmail}</p>
                      {app.resumeUrl && (
                        <a href={app.resumeUrl} target="_blank" rel="noreferrer">📄 View Resume</a>
                      )}
                    </div>
                    <div className="application-actions">
                      <span className={`status-text status-${app.status.toLowerCase()}`}>{app.status}</span>
                      <button className="btn-accept" onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')} disabled={app.status === 'ACCEPTED'}>Accept</button>
                      <button className="btn-reject" onClick={() => handleStatusUpdate(app.id, 'REJECTED')} disabled={app.status === 'REJECTED'}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
