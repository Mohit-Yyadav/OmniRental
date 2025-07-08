// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Replace with actual authentication logic
      setCurrentUser({ 
        role: 'user',
        token: token 
      });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Implement actual login API call
    const mockUser = {
      id: 1,
      email: credentials.email,
      role: 'user',
      token: 'mock-token-123'
    };
    localStorage.setItem('token', mockUser.token);
    setCurrentUser(mockUser);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}