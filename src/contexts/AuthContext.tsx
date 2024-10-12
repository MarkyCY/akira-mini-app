"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

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
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch('http://192.168.1.101:5000/users/me/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener el usuario');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
      Cookies.remove('token');
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://192.168.1.101:5000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: `grant_type=password&username=${username}&password=${password}`,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.detail || 'Error en la autenticación' };
      }

      const data = await response.json();
      const token = data.access_token;
      Cookies.set('token', token);
      await fetchUser(token);
      return { success: true, message: 'Autenticación exitosa' };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return { success: false, message: 'Error de red o servidor' };
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
