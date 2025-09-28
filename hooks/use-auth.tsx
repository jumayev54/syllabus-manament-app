"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { getDefaultRoute } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo foydalanuvchilar
const defaultMockUsers: Record<string, { user: User; password: string }> = {
  'admin@universitet.uz': {
    user: {
      id: '1',
      email: 'admin@universitet.uz',
      name: 'Tizim administratori',
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    password: 'admin123'
  },
  'o.usmonov@universitet.uz': {
    user: {
      id: '2',
      email: 'o.usmonov@universitet.uz',
      name: 'Oybek Usmonov',
      role: 'teacher',
      campusId: 'campus-1',
      facultyId: 'faculty-1',
      departmentId: 'dept-1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    password: 'teacher123'
  },
  'n.karimova@universitet.uz': {
    user: {
      id: '3',
      email: 'n.karimova@universitet.uz',
      name: 'Nilufar Karimova',
      role: 'department_head',
      campusId: 'campus-1',
      facultyId: 'faculty-1',
      departmentId: 'dept-1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    password: 'head123'
  },
  'a.toshmatov@universitet.uz': {
    user: {
      id: '4',
      email: 'a.toshmatov@universitet.uz',
      name: 'Akmal Toshmatov',
      role: 'dean',
      campusId: 'campus-1',
      facultyId: 'faculty-1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    password: 'dean123'
  },
  'm.rahimova@universitet.uz': {
    user: {
      id: '5',
      email: 'm.rahimova@universitet.uz',
      name: 'Muharram Rahimova',
      role: 'rector',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    password: 'rector123'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Agar foydalanuvchilar mavjud bo'lmasa, standartlarini yaratish
    const existingAuthUsers = localStorage.getItem('auth-users');
    if (!existingAuthUsers) {
      localStorage.setItem('auth-users', JSON.stringify(defaultMockUsers));
    }

    // Mavjud seansni tekshirish
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('auth-token');
        const userData = localStorage.getItem('user-data');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData) as User;
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Auth tekshiruvida xatolik:', error);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // API kechikishini simulyatsiya qilish
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Barcha foydalanuvchilarni olish (standart + admin tomonidan yaratilgan)
      const authUsers = JSON.parse(localStorage.getItem('auth-users') || '{}');
      
      // Kirish ma'lumotlarini tekshirish
      const userRecord = authUsers[email];
      
      if (!userRecord || userRecord.password !== password) {
        return false;
      }

      // Mock token yaratish
      const token = `mock-token-${Date.now()}`;
      
      // Foydalanuvchi ma'lumotlarini saqlash
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user-data', JSON.stringify(userRecord.user));
      
      setUser(userRecord.user);
      
      // Rolga mos boshqaruv paneliga yo'naltirish
      const defaultRoute = getDefaultRoute(userRecord.user);
      router.push(defaultRoute);
      
      return true;
    } catch (error) {
      console.error('Kirishda xatolik:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth AuthProvider ichida ishlatilishi kerak');
  }
  return context;
};
