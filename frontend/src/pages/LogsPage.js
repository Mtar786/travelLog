import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

/**
 * LogsPage fetches and displays all travel logs for the authenticated user.
 * Each log entry can be edited or deleted. The page re-fetches logs
 * automatically after deletions.
 */
const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch travel logs from the API
  const fetchLogs = async () => {
    try {
      const res = await api.get('/logs');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Delete a log by ID
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this log?')) return;
    try {
      await api.delete(`/logs/${id}`);
      setLogs(logs.filter((log) => log._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading your travel logs...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Your Travel Logs</h2>
      {logs.length === 0 ? (
        <p>You have no logs yet. Click "Add Log" to create one!</p>
      ) : (
        logs.map((log) => (
          <div className="log-item" key={log._id}>
            <h3>{log.title}</h3>
            <small>
              {new Date(log.date).toLocaleDateString()} - {log.location}
            </small>
            <p>{log.description}</p>
            {log.imageUrl && (
              <img src={log.imageUrl} alt={log.title} />
            )}
            <div className="actions">
              <Link to={`/edit/${log._id}`} style={{ marginRight: '0.5rem' }}>
                Edit
              </Link>
              <button onClick={() => handleDelete(log._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LogsPage;