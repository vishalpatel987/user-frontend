// import React from 'react'
// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';


// const PrivateRoute = ({ children, adminOnly = false }) => {
// const { user, loading } = useContext(AuthContext);


// if (loading) return <div>Loading...</div>;
// if (!user) return <Navigate to='/login' />;
// if (adminOnly && user.role !== 'admin') return <Navigate to='/' />;


// return children;
// };


// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to='/login' />;
  if (adminOnly && user.role !== 'admin') return <Navigate to='/' />;

  return children;
};

export default PrivateRoute;
