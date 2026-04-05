import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('bakestro_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('bakestro_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('bakestro_user', JSON.stringify(userData));
    localStorage.setItem('bakestro_token', token);
  };

  const googleLogin = (userData, token) => {
    const enrichedUser = {
      ...userData,
      loginMethod: 'google'
    };
    setUser(enrichedUser);
    localStorage.setItem('bakestro_user', JSON.stringify(enrichedUser));
    localStorage.setItem('bakestro_token', token);
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('bakestro_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bakestro_user');
    localStorage.removeItem('bakestro_token');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      googleLogin,
      updateUser,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
