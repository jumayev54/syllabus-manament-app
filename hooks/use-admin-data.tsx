"use client";

import { useState, useEffect } from 'react';
import { Campus, Faculty, Department, User } from '@/lib/types';

export function useAdminData() {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Mock data - replace with actual API calls
      setCampuses([
        { id: '1', name: 'Main Campus', location: 'Downtown', address: '123 University Ave', isActive: true },
        { id: '2', name: 'North Campus', location: 'Northside', address: '456 North Ave', isActive: true },
      ]);

      setFaculties([
        { id: '1', name: 'Faculty of Engineering', description: 'Engineering and Technology', campusId: '1', isActive: true, createdAt: new Date().toISOString() },
        { id: '2', name: 'Faculty of Business', description: 'Business and Management', campusId: '1', isActive: true, createdAt: new Date().toISOString() },
      ]);

      setDepartments([
        { id: '1', name: 'Computer Science', description: 'CS Department', facultyId: '1', campusId: '1', isActive: true, createdAt: new Date().toISOString() },
        { id: '2', name: 'Electrical Engineering', description: 'EE Department', facultyId: '1', campusId: '1', isActive: true, createdAt: new Date().toISOString() },
      ]);

      // Load existing users from localStorage or set empty array
      const savedUsers = localStorage.getItem('admin-users');
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUsersToStorage = (updatedUsers: User[]) => {
    localStorage.setItem('admin-users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const addFaculty = async (faculty: Omit<Faculty, 'id' | 'createdAt'>) => {
    const newFaculty: Faculty = {
      ...faculty,
      id: `faculty-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setFaculties(prev => [...prev, newFaculty]);
    return newFaculty;
  };

  const addDepartment = async (department: Omit<Department, 'id' | 'createdAt'>) => {
    const newDepartment: Department = {
      ...department,
      id: `dept-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setDepartments(prev => [...prev, newDepartment]);
    return newDepartment;
  };

  const addUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      campusId: userData.campusId,
      facultyId: userData.facultyId,
      departmentId: userData.departmentId,
      isActive: userData.isActive,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveUsersToStorage(updatedUsers);

    // Also save user with password to the main auth system
    const authUsers = JSON.parse(localStorage.getItem('auth-users') || '{}');
    authUsers[userData.email] = {
      user: newUser,
      password: userData.password
    };
    localStorage.setItem('auth-users', JSON.stringify(authUsers));

    return newUser;
  };

  const updateUser = async (userId: string, updates: Partial<User>) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, ...updates, updatedAt: new Date().toISOString() }
        : user
    );
    saveUsersToStorage(updatedUsers);

    // Update in auth system as well
    const authUsers = JSON.parse(localStorage.getItem('auth-users') || '{}');
    const updatedUser = updatedUsers.find(u => u.id === userId);
    if (updatedUser) {
      const authEntry = Object.values(authUsers).find((entry: any) => entry.user.id === userId);
      if (authEntry) {
        (authEntry as any).user = updatedUser;
        localStorage.setItem('auth-users', JSON.stringify(authUsers));
      }
    }
  };

  const assignRole = async (userId: string, role: User['role'], assignments: { campusId?: string; facultyId?: string; departmentId?: string }) => {
    await updateUser(userId, { role, ...assignments });
    
    // Update faculty/department head assignments
    if (role === 'dean' && assignments.facultyId) {
      setFaculties(prev => prev.map(faculty =>
        faculty.id === assignments.facultyId
          ? { ...faculty, deanId: userId }
          : { ...faculty, deanId: faculty.deanId === userId ? undefined : faculty.deanId }
      ));
    }
    
    if (role === 'department_head' && assignments.departmentId) {
      setDepartments(prev => prev.map(dept =>
        dept.id === assignments.departmentId
          ? { ...dept, departmentHeadId: userId }
          : { ...dept, departmentHeadId: dept.departmentHeadId === userId ? undefined : dept.departmentHeadId }
      ));
    }
  };

  const resetUserPassword = async (userId: string, newPassword: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    // Update password in auth system
    const authUsers = JSON.parse(localStorage.getItem('auth-users') || '{}');
    const authEntry = Object.values(authUsers).find((entry: any) => entry.user.id === userId);
    if (authEntry) {
      (authEntry as any).password = newPassword;
      localStorage.setItem('auth-users', JSON.stringify(authUsers));
    }
  };

  return {
    campuses,
    faculties,
    departments,
    users,
    loading,
    addFaculty,
    addDepartment,
    addUser,
    updateUser,
    assignRole,
    resetUserPassword,
    refetch: fetchData,
  };
}