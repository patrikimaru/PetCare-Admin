import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: sessionStorage.getItem('token') || null,
    userId: sessionStorage.getItem('userId') || null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const isAuthenticated = !!authState.token;
    setAuthState((prevAuthState) => ({ ...prevAuthState, isAuthenticated }));
  }, [authState.token]);

  const setAuthInfo = (token, userId) => {
    setAuthState({ token, userId, isAuthenticated: true });
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', userId);
  };

  const logout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setAuthState({ token: null, userId: null, isAuthenticated: false });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
