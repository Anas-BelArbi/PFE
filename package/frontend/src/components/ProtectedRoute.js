// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // import jwtDecode for decoding JWT tokens

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     // If token doesn't exist, redirect to login
//     return <Navigate to="/login" />;
//   }

//   // Decode the token to get user role
//   const decodedToken = jwtDecode(token);
//   const userRole = decodedToken.role;

//   if (!allowedRoles.includes(userRole)) {
//     localStorage.removeItem('token');
//     // If user's role doesn't match allowed roles, redirect to login
//     return <Navigate to="/login" />;
//   }

//   // Render the children if user is authorized
//   return children;
// };

// export default ProtectedRoute;

// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { checkTokenValidity } from './login/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!checkTokenValidity()) {
    return <Navigate to="/login" />;
  }

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  if (!allowedRoles.includes(userRole)) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
