
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  type: 'user' | 'owner' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'user' | 'owner' | 'admin') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  userType: 'user' | 'owner' | 'admin' | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const demoUsers = {
    'user@demo.com': { id: 1, email: 'user@demo.com', name: 'Demo User', type: 'user' as const },
    'owner@demo.com': { id: 2, email: 'owner@demo.com', name: 'Demo Owner', type: 'owner' as const },
    'admin@demo.com': { id: 3, email: 'admin@demo.com', name: 'Demo Admin', type: 'admin' as const },
  };

  useEffect(() => {
    // Check if user is logged in on page load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string, userType: 'user' | 'owner' | 'admin'): boolean => {
    if (password === 'demo123' && demoUsers[email as keyof typeof demoUsers]) {
      const userData = demoUsers[email as keyof typeof demoUsers];
      if (userData.type === userType) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userType', userType);
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    userType: user?.type || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
