import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAdmin(true);
    } else {
      localStorage.removeItem('token');
      setIsAdmin(false);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
