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
import { Plus, Building2, Users } from 'lucide-react';

export function FacultyManagement() {
  const { campuses, faculties, users, addFaculty, loading } = useAdminData();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    campusId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addFaculty({
        ...formData,
        isActive: true,
      });
      setFormData({ name: '', description: '', campusId: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to add faculty:', error);
    }
  };

  const getDeanName = (facultyId: string) => {
    const faculty = faculties.find(f => f.id === facultyId);
    if (!faculty?.deanId) return 'Not assigned';
    const dean = users.find(u => u.id === faculty.deanId);
    return dean?.name || 'Unknown';
  };

  const getCampusName = (campusId: string) => {
    return campuses.find(c => c.id === campusId)?.name || 'Unknown';
  };

  if (loading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Fakultet Boshqaruvi</h3>
          <p className="text-muted-foreground">Universitet fakultetlari va ularning topshiriqlarini boshqarish</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
             Fakultet Qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi Fakultet Qo'shish</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Fakultet Nomi</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="masalan, axborot texnologiyalar fakulteti"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Tavsif</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Fakultetning qisqacha tavsifi"
                />
              </div>
              <div>
                <Label htmlFor="campus">Campus</Label>
                <Select
                  value={formData.campusId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, campusId: value }))}
                  required
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
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Faculty</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {faculties.map((faculty) => (
          <Card key={faculty.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-5 w-5" />
                    {faculty.name}
                  </CardTitle>
                  <CardDescription>{faculty.description}</CardDescription>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Campus: {getCampusName(faculty.campusId)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Dean: {getDeanName(faculty.id)}
                    </p>
                  </div>
                </div>
                <Badge variant={faculty.isActive ? 'default' : 'secondary'}>
                  {faculty.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}