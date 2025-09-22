
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if token exists on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/users/me')  // Backend should return user with role
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user); // user object with role
      toast.success('Login successful');
      return res.data.user; // return full user
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
