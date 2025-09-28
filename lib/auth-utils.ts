import { User, Faculty, Department, Campus } from './types';

export const getUserAssignments = (user: User) => {
  return {
    campusId: user.campusId,
    facultyId: user.facultyId,
    departmentId: user.departmentId,
    role: user.role
  };
};

export const getDefaultRoute = (user: User) => {
  switch (user.role) {
    case 'admin':
      return '/dashboard/admin';
    case 'rector':
      return '/dashboard/rector';
    case 'dean':
      return '/dashboard/dean';
    case 'department_head':
      return '/dashboard/department-head';
    case 'teacher':
      return '/dashboard/teacher';
    default:
      return '/login';
  }
};

export const canAccessResource = (user: User, resourceCampusId?: string, resourceFacultyId?: string, resourceDepartmentId?: string) => {
  if (user.role === 'admin' || user.role === 'rector') {
    return true; // Full access
  }
  
  if (user.role === 'dean') {
    return user.facultyId === resourceFacultyId;
  }
  
  if (user.role === 'department_head') {
    return user.departmentId === resourceDepartmentId;
  }
  
  if (user.role === 'teacher') {
    return user.departmentId === resourceDepartmentId;
  }
  
  return false;
};