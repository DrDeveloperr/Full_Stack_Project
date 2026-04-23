import React from 'react';
import '../styles/jobs.css';

const JobCard = ({ job, onApply, applied }) => (
  <div className="job-card">
    <div className="job-card-header">
      <h3>{job.title}</h3>
      <span className="job-company">{job.company}</span>
    </div>
    <div className="job-card-meta">
      <span>📍 {job.location}</span>
      {job.salary && <span>💰 {job.salary}</span>}
    </div>
    <p className="job-description">{job.description}</p>
    {onApply && (
      <button
        className={applied ? 'btn-applied' : 'btn-apply'}
        onClick={() => onApply(job.id)}
        disabled={applied}
      >
        {applied ? '✅ Applied' : 'Apply Now'}
      </button>
    )}
  </div>
);

export default JobCard;
