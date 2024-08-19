import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Login } from './components';
import Home from './containers/Home';
import api from './utils/base';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserExistence = async () => {
      const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
      if (User) {
        try {
          // Make an API call to check if the user exists in the database
          const response = await api.get(`/user/${User.sub}`);
          if (response.data) {
            // User found in the database, redirect to home page
            navigate('/');
          } else {
            // User not found in the database, redirect to login
            localStorage.clear();
            navigate('/login');
          }
        } catch (error) {
          // Error occurred while checking user existence, redirect to login
          localStorage.clear();
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };
    checkUserExistence();
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
