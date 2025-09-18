// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.get(`${BACKEND_URL}/api/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => {
//           setUser(res.data.user);
//           setIsAuthenticated(true);
//         })
//         .catch(() => {
//           setUser(null);
//           setIsAuthenticated(false);
//         })
//         .finally(() => setIsLoading(false));
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

// const login = async (email, password) => {
//   try {
//     const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
//       email,
//       password,
//     });

//     localStorage.setItem('token', res.data.token);
//     setUser(res.data.user);
//     setIsAuthenticated(true);
//     return res.data.user; // ✅ return user info to Login page
//   } catch (err) {
//     throw new Error(err?.response?.data?.message || 'Login failed');
//   }
// };

// const logout = () => {
//   localStorage.removeItem('token');
//   setUser(null);
//   setIsAuthenticated(false);
//   };

//   return (
//  <AuthContext.Provider
//   value={{ user, isAuthenticated, isLoading, login, googleLogin, logout }}
// >
//   {children}
// </AuthContext.Provider>


//   );
// };

// const googleLogin = async (tokenId) => {
//   try {
//     const res = await axios.post(`${BACKEND_URL}/api/auth/google`, { tokenId });

//     localStorage.setItem("token", res.data.token);
//     setUser(res.data.user);
//     setIsAuthenticated(true);

//     return res.data.user; // return the user so Login.jsx can redirect
//   } catch (err) {
//     throw new Error(err?.response?.data?.message || "Google login failed");
//   }
// };

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setUser(null);
          setIsAuthenticated(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Regular email/password login
const login = async (identifier, password) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
      identifier, // can be email or username
      password,
    });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setIsAuthenticated(true);
    return res.data.user; // return user for Login.jsx redirect
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Login failed");
  }
};


  // Google login
  const googleLogin = async (tokenId) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/google`, { tokenId });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);

      return res.data.user; // return user for redirect
    } catch (err) {
      console.error("Google login error:", err);
      throw new Error(err?.response?.data?.message || "Google login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
