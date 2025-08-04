import axios from 'axios';

// Create an axios instance with a base URL taken from environment variables.
// If REACT_APP_API_URL is undefined, default to localhost:5000.
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api`,
});

// Attach the JWT token stored in localStorage to every request if it exists.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;