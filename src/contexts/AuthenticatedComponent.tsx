"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Importar usePathname
import { useAuth } from './AuthContext'; // Ajusta la ruta al archivo de tu contexto
import Cookies from 'js-cookie';

const AuthenticatedComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // Obtener el estado del usuario
  const router = useRouter(); // Usar el hook useRouter para redirigir
  const pathname = usePathname(); // Obtener la ruta actual

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  }, [user, pathname, router]);

  // Mostrar los hijos sólo si el usuario está autenticado o estamos en la página de login
  return user || pathname === '/login' ? <>{children}</> : null;
};

export default AuthenticatedComponent;
