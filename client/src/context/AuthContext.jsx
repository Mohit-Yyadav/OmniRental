// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
  });

  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setState(prev => ({
            ...prev,
            user: res.data.user,
            isAuthenticated: true,
            loading: false
          }));
        } else {
          setState(prev => ({ ...prev, loading: false }));
        }
      } catch (err) {
        setState(prev => ({
          ...prev,
          error: err.response?.data?.message || 'Authentication failed',
          loading: false
        }));
        logout();
      }
    };

    checkAuth();
  }, [logout]);

  const login = async (email, password) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const res = await axios.post('/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      setState(prev => ({
        ...prev,
        user: res.data.user,
        isAuthenticated: true,
        loading: false
      }));
      
      return res.data.user;
    } catch (err) {
      const error = err.response?.data?.message || 'Login failed';
      setState(prev => ({ ...prev, error, loading: false }));
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const res = await axios.post('/api/auth/register', userData);
      return res.data;
    } catch (err) {
      const error = err.response?.data?.message || 'Registration failed';
      setState(prev => ({ ...prev, error, loading: false }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      register,
      setError: (error) => setState(prev => ({ ...prev, error }))
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Move this to a separate file (hooks/useAuth.js) to fix the first error
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};