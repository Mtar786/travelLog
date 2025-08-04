import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

/**
 * PrivateRoute is a wrapper for routes that require authentication. If the
 * user is not authenticated (no token), they are redirected to the login
 * page. Otherwise, the child component is rendered.
 *
 * Usage:
 * <Route path="/protected" element={<PrivateRoute><ProtectedComponent /></PrivateRoute>} />
 */
const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;