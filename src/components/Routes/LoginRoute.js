import React from 'react';
import {Navigate} from 'react-router-dom';

const LoginRoute = ({children, user}) => {
  return user && user?.emailVerified ? children : <Navigate to='/'/>
};

export default LoginRoute;
