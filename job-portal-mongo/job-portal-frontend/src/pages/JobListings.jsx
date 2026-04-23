import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import JobCard from '../components/JobCard';
import { useAuth } from '../context/AuthContext';
import '../styles/jobs.css';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
    if (user?.role === 'SEEKER') fetchMyApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs');
    } finally { setLoading(false); }
  };

  const fetchMyApplications = async () => {
    try {
      const res = await API.get('/applications/my-applications');
      setAppliedJobs(res.data.map((app) => app.jobId));
    } catch (err) { console.error('Failed to fetch applications'); }
  };

  const handleApply = async (jobId) => {
    try {
      await API.post(`/applications/apply/${jobId}`);
      setAppliedJobs([...appliedJobs, jobId]);
      alert('Applied successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Application failed');
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h2>Available Jobs ({filteredJobs.length})</h2>
        <input type="text" className="search-input"
          placeholder="Search by title, company or location..."
          value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {loading ? <div className="loading">Loading jobs...</div>
        : filteredJobs.length === 0 ? <div className="no-jobs">No jobs found.</div>
        : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job}
                onApply={user?.role === 'SEEKER' ? handleApply : null}
                applied={appliedJobs.includes(job.id)} />
            ))}
          </div>
        )}
    </div>
  );
};

export default JobListings;
