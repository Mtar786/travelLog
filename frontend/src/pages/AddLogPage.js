import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

/**
 * AddLogPage provides a form to create a new travel log. Upon successful
 * submission, the user is redirected back to the home page where the log
 * appears in the list.
 */
const AddLogPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    description: '',
    imageUrl: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/logs', formData);
      setError(null);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.errors?.[0]?.msg || 'Failed to create log'
      );
    }
  };

  return (
    <div className="container">
      <h2>Add Travel Log</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onChange}
          required
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={onChange}
          required
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={onChange}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          value={formData.description}
          onChange={onChange}
          required
        ></textarea>
        <label htmlFor="imageUrl">Image URL (optional)</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={onChange}
        />
        <button type="submit">Add Log</button>
      </form>
    </div>
  );
};

export default AddLogPage;