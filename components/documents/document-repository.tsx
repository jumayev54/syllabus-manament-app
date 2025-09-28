"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VersionHistory } from "./version-history"
import { Search, Download, Eye, FileText, Calendar, User, Building2, Star, Archive, Trash2 } from "lucide-react"

interface Document {
  id: string
  title: string
  course: string
  instructor: string
  department: string
  version: string
  status: "draft" | "approved" | "archived"
  lastModified: string
  size: string
  downloads: number
  isFavorite: boolean
}

export function DocumentRepository() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  // Mock document data
  const documents: Document[] = [
    {
      id: "1",
      title: "CS 101 - Introduction to Programming",
      course: "CS 101",
      instructor: "Dr. John Smith",
      department: "Computer Science",
      version: "2.1",
      status: "approved",
      lastModified: "2024-01-22",
      size: "2.4 MB",
      downloads: 45,
      isFavorite: true,
    },
    {
      id: "2",
      title: "MATH 201 - Calculus II",
      course: "MATH 201",
      instructor: "Prof. Sarah Johnson",
      department: "Mathematics",
      version: "1.3",
      status: "approved",
      lastModified: "2024-01-20",
      size: "1.8 MB",
      downloads: 32,
      isFavorite: false,
    },
    {
      id: "3",
      title: "PHYS 301 - Quantum Mechanics",
      course: "PHYS 301",
      instructor: "Dr. Michael Brown",
      department: "Physics",
      version: "1.0",
      status: "draft",
      lastModified: "2024-01-18",
      size: "3.2 MB",
      downloads: 0,
      isFavorite: false,
    },
    {
      id: "4",
      title: "ENG 101 - Composition I",
      course: "ENG 101",
      instructor: "Prof. Emily Davis",
      department: "English",
      version: "2.0",
      status: "archived",
      lastModified: "2024-01-15",
      size: "1.5 MB",
      downloads: 128,
      isFavorite: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "draft":
        return "secondary"
      case "archived":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <FileText className="h-4 w-4" />
      case "draft":
        return <FileText className="h-4 w-4" />
      case "archived":
        return <Archive className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || doc.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  if (selectedDocument) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedDocument(null)}>
            ← Back to Repository
          </Button>
          <h2 className="text-lg font-semibold">Document Details</h2>
        </div>
        <VersionHistory syllabusId={selectedDocument} currentVersion="2.1" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Document Repository</h3>
          <p className="text-sm text-muted-foreground">Central repository for all syllabus documents</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Bulk Download
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive Selected
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <div className="grid gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">{getStatusIcon(document.status)}</div>
                  <div>
                    <CardTitle className="text-base flex items-center space-x-2">
                      <span>{document.title}</span>
                      {document.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {document.instructor}
                      </span>
                      <span className="flex items-center">
                        <Building2 className="h-3 w-3 mr-1" />
                        {document.department}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {document.lastModified}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(document.status)}>{document.status}</Badge>
                  <Badge variant="outline">v{document.version}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Size: {document.size}</span>
                  <span>Downloads: {document.downloads}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedDocument(document.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4 mr-1" />
                    {document.isFavorite ? "Unfavorite" : "Favorite"}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No documents found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
