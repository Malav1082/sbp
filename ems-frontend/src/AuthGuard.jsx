import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');  // Check user data from localStorage

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;

