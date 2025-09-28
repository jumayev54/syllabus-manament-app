"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdminData } from '@/hooks/use-admin-data';
import { Plus, UserPlus, Edit, Eye, EyeOff, Key, Copy } from 'lucide-react';
import { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function UserRoleAssignment() {
  const { campuses, faculties, departments, users, addUser, assignRole, loading } = useAdminData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const { toast } = useToast();

  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    role: '' as User['role'],
    password: '',
    confirmPassword: '',
  });

  const [assignFormData, setAssignFormData] = useState({
    role: '' as User['role'],
    campusId: '',
    facultyId: '',
    departmentId: '',
  });

  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setAddFormData(prev => ({ ...prev, password, confirmPassword: password }));
    setGeneratedPassword(password);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(addFormData.password);
    toast({
      title: "Password copied",
      description: "Password has been copied to clipboard",
    });
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match
    if (addFormData.password !== addFormData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Validate password strength
    if (addFormData.password.length < 6) {
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    try {
      await addUser({
        ...addFormData,
        isActive: true,
      });
      
      toast({
        title: "User created successfully",
        description: `User ${addFormData.name} has been created with the role ${addFormData.role}`,
      });

      setAddFormData({ 
        name: '', 
        email: '', 
        role: '' as User['role'], 
        password: '', 
        confirmPassword: '' 
      });
      setGeneratedPassword('');
      setIsAddOpen(false);
    } catch (error) {
      console.error('Failed to add user:', error);
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAssignRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      await assignRole(selectedUser.id, assignFormData.role, {
        campusId: assignFormData.campusId || undefined,
        facultyId: assignFormData.facultyId || undefined,
        departmentId: assignFormData.departmentId || undefined,
      });

      toast({
        title: "Role assigned successfully",
        description: `${selectedUser.name} has been assigned the role ${assignFormData.role}`,
      });

      setAssignFormData({ role: '' as User['role'], campusId: '', facultyId: '', departmentId: '' });
      setIsAssignOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to assign role:', error);
      toast({
        title: "Error",
        description: "Failed to assign role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openAssignDialog = (user: User) => {
    setSelectedUser(user);
    setAssignFormData({
      role: user.role,
      campusId: user.campusId || '',
      facultyId: user.facultyId || '',
      departmentId: user.departmentId || '',
    });
    setIsAssignOpen(true);
  };

  const openPasswordResetDialog = (user: User) => {
    setSelectedUser(user);
    setIsPasswordOpen(true);
  };

  const handlePasswordReset = () => {
    const newPassword = Math.random().toString(36).slice(-8);
    setGeneratedPassword(newPassword);
    
    toast({
      title: "Password reset",
      description: `New password generated for ${selectedUser?.name}`,
    });
  };

  const getAssignmentInfo = (user: User) => {
    const parts = [];
    
    if (user.campusId) {
      const campus = campuses.find(c => c.id === user.campusId);
      if (campus) parts.push(`Campus: ${campus.name}`);
    }
    
    if (user.facultyId) {
      const faculty = faculties.find(f => f.id === user.facultyId);
      if (faculty) parts.push(`Faculty: ${faculty.name}`);
    }
    
    if (user.departmentId) {
      const department = departments.find(d => d.id === user.departmentId);
      if (department) parts.push(`Dept: ${department.name}`);
    }
    
    return parts.join(' | ') || 'No assignments';
  };

  const getFilteredFaculties = () => {
    return assignFormData.campusId 
      ? faculties.filter(f => f.campusId === assignFormData.campusId)
      : faculties;
  };

  const getFilteredDepartments = () => {
    return assignFormData.facultyId 
      ? departments.filter(d => d.facultyId === assignFormData.facultyId)
      : departments;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">User Role Assignment</h3>
          <p className="text-muted-foreground">Manage users and their role assignments</p>
        </div>
        <div className="space-x-2">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={addFormData.name}
                    onChange={(e) => setAddFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Dr. John Smith"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={addFormData.email}
                    onChange={(e) => setAddFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john.smith@university.edu"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Initial Role</Label>
                  <Select
                    value={addFormData.role}
                    onValueChange={(value) => setAddFormData(prev => ({ ...prev, role: value as User['role'] }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="department_head">Department Head</SelectItem>
                      <SelectItem value="dean">Dean</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <Label>Password</Label>
                    <div className="space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={generatePassword}
                      >
                        <Key className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                      {addFormData.password && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={copyPassword}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={addFormData.password}
                      onChange={(e) => setAddFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={addFormData.confirmPassword}
                      onChange={(e) => setAddFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm password"
                      required
                    />
                  </div>

                  {generatedPassword && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">Generated Password:</p>
                      <code className="text-sm bg-background px-2 py-1 rounded border">
                        {generatedPassword}
                      </code>
                      <p className="text-xs text-muted-foreground mt-2">
                        Make sure to save this password securely. The user will need it to log in.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add User</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users and Assignments</CardTitle>
          <CardDescription>Manage user roles and their institutional assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Assignments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {getAssignmentInfo(user)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? 'default' : 'secondary'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openAssignDialog(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openPasswordResetDialog(user)}
                      >
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Role Assignment Dialog */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Assign Role - {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAssignRole} className="space-y-4">
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={assignFormData.role}
                onValueChange={(value) => setAssignFormData(prev => ({ ...prev, role: value as User['role'] }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="department_head">Department Head</SelectItem>
                  <SelectItem value="dean">Dean</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="rector">Rector</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {assignFormData.role !== 'admin' && assignFormData.role !== 'rector' && (
              <>
                <div>
                  <Label htmlFor="campus">Campus</Label>
                  <Select
                    value={assignFormData.campusId}
                    onValueChange={(value) => setAssignFormData(prev => ({ ...prev, campusId: value, facultyId: '', departmentId: '' }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {campuses.map((campus) => (
                        <SelectItem key={campus.id} value={campus.id}>
                          {campus.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {assignFormData.role === 'dean' && (
                  <div>
                    <Label htmlFor="faculty">Faculty</Label>
                    <Select
                      value={assignFormData.facultyId}
                      onValueChange={(value) => setAssignFormData(prev => ({ ...prev, facultyId: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        {getFilteredFaculties().map((faculty) => (
                          <SelectItem key={faculty.id} value={faculty.id}>
                            {faculty.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(assignFormData.role === 'department_head' || assignFormData.role === 'teacher') && (
                  <>
                    <div>
                      <Label htmlFor="faculty">Faculty</Label>
                      <Select
                        value={assignFormData.facultyId}
                        onValueChange={(value) => setAssignFormData(prev => ({ ...prev, facultyId: value, departmentId: '' }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select faculty" />
                        </SelectTrigger>
                        <SelectContent>
                          {getFilteredFaculties().map((faculty) => (
                            <SelectItem key={faculty.id} value={faculty.id}>
                              {faculty.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={assignFormData.departmentId}
                        onValueChange={(value) => setAssignFormData(prev => ({ ...prev, departmentId: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {getFilteredDepartments().map((department) => (
                            <SelectItem key={department.id} value={department.id}>
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </>
            )}

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsAssignOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Assign Role</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Password Reset Dialog */}
      <Dialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password - {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Generate a new password for this user. Make sure to share it securely with them.
            </p>
            
            {generatedPassword && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">New Password:</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 text-sm bg-background px-3 py-2 rounded border">
                    {generatedPassword}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedPassword);
                      toast({
                        title: "Password copied",
                        description: "New password copied to clipboard",
                      });
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  The user will need to change this password on first login.
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsPasswordOpen(false);
                  setGeneratedPassword('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handlePasswordReset}>
                <Key className="mr-2 h-4 w-4" />
                Generate New Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}