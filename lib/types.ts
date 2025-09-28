export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'rector' | 'dean' | 'department_head' | 'teacher';
  campusId?: string;
  facultyId?: string;
  departmentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Campus {
  id: string;
  name: string;
  location: string;
  address: string;
  isActive: boolean;
}

export interface Faculty {
  id: string;
  name: string;
  description: string;
  campusId: string;
  deanId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  facultyId: string;
  campusId: string;
  departmentHeadId?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Assignment {
  userId: string;
  role: string;
  campusId?: string;
  facultyId?: string;
  departmentId?: string;
  assignedAt: string;
  assignedBy: string;
}