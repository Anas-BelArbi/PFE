// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// export const checkTokenValidity = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return false;

//   try {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;

//     if (decodedToken.exp < currentTime) {
//       localStorage.removeItem('token');
//       return false;
//     }
//     return true;
//   } catch (error) {
//     console.error('Invalid token:', error);
//     localStorage.removeItem('token');
//     return false;
//   }
// };

// export const useAuth = () => {
//   const navigate = useNavigate();

//   const verifyToken = () => {
//     if (!checkTokenValidity()) {
//       navigate('/login');
//     }
//   };

//   return { verifyToken };
// };


// auth.js
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const checkTokenValidity = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token');
    return false;
  }
};

export const useAuth = () => {
  const navigate = useNavigate();

  const verifyToken = () => {
    if (!checkTokenValidity()) {
      navigate('/login');
    }
  };

  const handleAccountChange = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountChange);
      };
    }
  }, []);

  return { verifyToken };
};
