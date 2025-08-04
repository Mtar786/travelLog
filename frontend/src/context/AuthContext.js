import React, { createContext, useState } from 'react';
import api from '../api';

/**
 * AuthContext provides authentication state and helper methods to the
 * components within the application. It stores the JWT token in
 * localStorage and exposes functions to register, login and logout.
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [authError, setAuthError] = useState(null);

  /**
   * Save a new token to state and localStorage.
   *
   * @param {string} newToken - JWT token returned from the server
   */
  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  /**
   * Register a new user with the backend API.
   *
   * @param {Object} payload - New user details
   * @returns {Promise<void>}
   */
  const register = async ({ name, email, password }) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      saveToken(res.data.token);
      setAuthError(null);
    } catch (err) {
      setAuthError(
        err.response?.data?.errors?.[0]?.msg || 'Registration failed'
      );
    }
  };

  /**
   * Authenticate a user and obtain a JWT token.
   *
   * @param {Object} payload - Login credentials
   * @returns {Promise<void>}
   */
  const login = async ({ email, password }) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      saveToken(res.data.token);
      setAuthError(null);
    } catch (err) {
      setAuthError(
        err.response?.data?.errors?.[0]?.msg || 'Login failed'
      );
    }
  };

  /**
   * Remove the token and log the user out.
   */
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, authError, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;