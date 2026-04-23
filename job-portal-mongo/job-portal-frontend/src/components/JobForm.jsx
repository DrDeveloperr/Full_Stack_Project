import React, { useState } from 'react';

const JobForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ title:'', company:'', location:'', description:'', salary:'' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title:'', company:'', location:'', description:'', salary:'' });
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h3>Post a New Job</h3>
      <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
      <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} rows={4} required />
      <input type="text" name="salary" placeholder="Salary (e.g. ₹5-8 LPA)" value={form.salary} onChange={handleChange} />
      <button type="submit" className="btn-primary">Post Job</button>
    </form>
  );
};

export default JobForm;
