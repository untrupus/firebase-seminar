import React from 'react';
import {Navigate} from 'react-router-dom';

const NoLoginRoute = ({user, children}) => {
  return !user ? children : <Navigate to='/home'/>
};

export default NoLoginRoute;
