"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useAdminData } from '@/hooks/use-admin-data';
import { Plus, GraduationCap } from 'lucide-react';

export function DepartmentManagement() {
  const { campuses, faculties, departments, users, addDepartment, loading } = useAdminData();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    facultyId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const faculty = faculties.find(f => f.id === formData.facultyId);
    if (!faculty) return;

    try {
      await addDepartment({
        ...formData,
        campusId: faculty.campusId,
        isActive: true,
      });
      setFormData({ name: '', description: '', facultyId: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to add department:', error);
    }
  };

  const getDepartmentHeadName = (departmentId: string) => {
    const department = departments.find(d => d.id === departmentId);
    if (!department?.departmentHeadId) return 'Not assigned';
    const head = users.find(u => u.id === department.departmentHeadId);
    return head?.name || 'Unknown';
  };

  const getFacultyName = (facultyId: string) => {
    return faculties.find(f => f.id === facultyId)?.name || 'Unknown';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Department Management</h3>
          <p className="text-muted-foreground">Manage academic departments and their leadership</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Department Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Computer Science"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the department"
                />
              </div>
              <div>
                <Label htmlFor="faculty">Faculty</Label>
                <Select
                  value={formData.facultyId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, facultyId: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculties.map((faculty) => (
                      <SelectItem key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Department</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {departments.map((department) => (
          <Card key={department.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    {department.name}
                  </CardTitle>
                  <CardDescription>{department.description}</CardDescription>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Faculty: {getFacultyName(department.facultyId)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Department Head: {getDepartmentHeadName(department.id)}
                    </p>
                  </div>
                </div>
                <Badge variant={department.isActive ? 'default' : 'secondary'}>
                  {department.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}