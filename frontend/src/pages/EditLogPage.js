import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

/**
 * EditLogPage allows users to modify an existing travel log. It fetches the
 * log data on mount, populates the form and sends an update request on
 * submission.
 */
const EditLogPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    description: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await api.get(`/logs`);
        const log = res.data.find((item) => item._id === id);
        if (log) {
          setFormData({
            title: log.title,
            location: log.location,
            date: log.date?.slice(0, 10) || '',
            description: log.description,
            imageUrl: log.imageUrl || '',
          });
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load log');
        setLoading(false);
      }
    };
    fetchLog();
  }, [id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/logs/${id}`, formData);
      setError(null);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.errors?.[0]?.msg || 'Failed to update log'
      );
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading log...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Edit Travel Log</h2>
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
        <button type="submit">Update Log</button>
      </form>
    </div>
  );
};

export default EditLogPage;