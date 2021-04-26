import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider.component';

const ProtectedRoute = (props) => {
  const [authState] = useAuth();
  return authState.isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
