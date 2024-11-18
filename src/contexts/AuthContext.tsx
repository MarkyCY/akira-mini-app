"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchUser, login as serverLogin } from '@/contexts/ServerActions';

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchUser(token)
        .then(setUser)
        .catch((error) => {
          console.error(error);
          Cookies.remove('token');
        });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const token = await serverLogin(username, password);
      if (!token) {
        return { success: false, message: 'Error en la autenticación' };
      }
      Cookies.set('token', token);
      const userData = await fetchUser(token);
      setUser(userData);
      return { success: true, message: 'Autenticación exitosa' };
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
