"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const users = [
    {
      id: "1",
      name: "Dr. John Smith",
      email: "john.teacher@university.edu",
      role: "teacher",
      department: "Computer Science",
      status: "active",
    },
    {
      id: "2",
      name: "Prof. Sarah Johnson",
      email: "head.cs@university.edu",
      role: "department_head",
      department: "Computer Science",
      status: "active",
    },
    {
      id: "3",
      name: "Dr. Michael Brown",
      email: "dean.engineering@university.edu",
      role: "dean",
      department: "Engineering",
      status: "active",
    },
    {
      id: "4",
      name: "Prof. Emily Davis",
      email: "rector@university.edu",
      role: "rector",
      department: "Administration",
      status: "active",
    },
    {
      id: "5",
      name: "Dr. Jane Wilson",
      email: "jane.teacher@university.edu",
      role: "teacher",
      department: "Mathematics",
      status: "inactive",
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "rector":
        return "default";
      case "dean":
        return "secondary";
      case "department_head":
        return "outline";
      case "teacher":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : "destructive";
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Foydalanuvchilar boshqaruvi</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi foydalanuvchi qo'shish</DialogTitle>
              <DialogDescription>
                Yangi foydalanuvchi qo'shish uchun quyidagi formani to'ldiring.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">F.I.SH</Label>
                <Input id="name" placeholder="To'liq ism familiya" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Pochta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="foydalanuvchi@universitet.uz"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Foydalanuvchi paroli"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Roli</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Foydalanuvchi rolini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">O'qituvchi</SelectItem>
                    <SelectItem value="department_head">
                      Kafedra mudiri
                    </SelectItem>
                    <SelectItem value="dean">Dekan</SelectItem>
                    <SelectItem value="rector">Rektor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Kafedra</Label>
                <Input id="department" placeholder="Kafedrani tanlang" />
              </div>
              <Button className="w-full">Qo'shish</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Foydalanuvchini qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha rollar</SelectItem>
            <SelectItem value="teacher">O'qituvchilar</SelectItem>
            <SelectItem value="department_head">Kafedra mudirlari</SelectItem>
            <SelectItem value="dean">Dekanlar</SelectItem>
            <SelectItem value="rector">Rektor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{user.name}</CardTitle>
                  <CardDescription>
                    {user.email} • {user.department}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={getRoleColor(user.role)}>
                    {user.role.replace("_", " ")}
                  </Badge>
                  <Badge variant={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Tahrirlash
                </Button>
                <Button variant="outline" size="sm">
                  Parolni bekor qilish
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  O'chirish
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
