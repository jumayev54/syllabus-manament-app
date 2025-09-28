"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, FileText, TrendingUp } from "lucide-react"

interface Campus {
  id: string
  name: string
  location: string
  departments: number
  faculty: number
  syllabi: number
  status: "active" | "inactive"
}

const mockCampuses: Campus[] = [
  {
    id: "1",
    name: "Main Campus",
    location: "Downtown",
    departments: 12,
    faculty: 245,
    syllabi: 1250,
    status: "active",
  },
  {
    id: "2",
    name: "North Campus",
    location: "North District",
    departments: 8,
    faculty: 156,
    syllabi: 890,
    status: "active",
  },
  {
    id: "3",
    name: "Medical Campus",
    location: "Medical District",
    departments: 6,
    faculty: 98,
    syllabi: 456,
    status: "active",
  },
  {
    id: "4",
    name: "Research Campus",
    location: "Tech Park",
    departments: 4,
    faculty: 67,
    syllabi: 234,
    status: "inactive",
  },
]

export function CampusSelector() {
  const [selectedCampus, setSelectedCampus] = useState<string>("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Multi-Campus Management</h2>
          <p className="text-muted-foreground">Manage syllabi across all university campuses</p>
        </div>
        <Select value={selectedCampus} onValueChange={setSelectedCampus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select campus" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campuses</SelectItem>
            {mockCampuses.map((campus) => (
              <SelectItem key={campus.id} value={campus.id}>
                {campus.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockCampuses.map((campus) => (
          <Card key={campus.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{campus.name}</CardTitle>
                <Badge variant={campus.status === "active" ? "default" : "secondary"}>{campus.status}</Badge>
              </div>
              <CardDescription>{campus.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{campus.departments} Departments</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{campus.faculty} Faculty</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{campus.syllabi} Syllabi</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campus Synchronization</CardTitle>
          <CardDescription>Sync syllabus templates and policies across campuses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Template Synchronization</h4>
              <p className="text-sm text-muted-foreground">Sync syllabus templates across all active campuses</p>
            </div>
            <Button>Sync Templates</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Policy Updates</h4>
              <p className="text-sm text-muted-foreground">Push policy changes to all campuses</p>
            </div>
            <Button>Update Policies</Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">User Permissions</h4>
              <p className="text-sm text-muted-foreground">Synchronize user roles and permissions</p>
            </div>
            <Button>Sync Permissions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
