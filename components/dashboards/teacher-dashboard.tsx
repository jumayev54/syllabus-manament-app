"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SyllabusEditor } from "@/components/syllabus/syllabus-editor"
import { SyllabusTemplates } from "@/components/syllabus/syllabus-templates"
import { FileText, Clock, CheckCircle, AlertCircle, Plus, Upload, Edit } from "lucide-react"

export function TeacherDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [editingSyllabus, setEditingSyllabus] = useState<string | null>(null)

  const syllabi = [
    {
      id: "1",
      course: "CS 101 - Introduction to Programming",
      status: "approved",
      lastModified: "2024-01-15",
      version: "1.2",
    },
    { id: "2", course: "CS 201 - Data Structures", status: "pending", lastModified: "2024-01-20", version: "1.0" },
    { id: "3", course: "CS 301 - Algorithms", status: "revision_needed", lastModified: "2024-01-18", version: "1.1" },
    { id: "4", course: "CS 401 - Software Engineering", status: "draft", lastModified: "2024-01-22", version: "0.1" },
  ]

  const stats = [
    { title: "Total Syllabi", value: "4", icon: FileText, change: "+1" },
    { title: "Approved", value: "1", icon: CheckCircle, change: "0" },
    { title: "Pending Review", value: "1", icon: Clock, change: "+1" },
    { title: "Need Revision", value: "1", icon: AlertCircle, change: "0" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "revision_needed":
        return "destructive"
      case "draft":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved"
      case "pending":
        return "Pending Review"
      case "revision_needed":
        return "Revision Needed"
      case "draft":
        return "Draft"
      default:
        return status
    }
  }

  if (editingSyllabus) {
    return (
      <SyllabusEditor
        syllabusId={editingSyllabus}
        onBack={() => setEditingSyllabus(null)}
        onSave={() => {
          setEditingSyllabus(null)
          // Refresh syllabi list
        }}
      />
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "syllabi":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">My Syllabi</h3>
              <Button onClick={() => setEditingSyllabus("new")}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Syllabus
              </Button>
            </div>

            <div className="grid gap-4">
              {syllabi.map((syllabus) => (
                <Card key={syllabus.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{syllabus.course}</CardTitle>
                        <CardDescription>
                          Version {syllabus.version} • Last modified {syllabus.lastModified}
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusColor(syllabus.status)}>{getStatusLabel(syllabus.status)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingSyllabus(syllabus.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit for Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "templates":
        return <SyllabusTemplates onSelectTemplate={(templateId) => setEditingSyllabus(`template-${templateId}`)} />

      default:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.change} this month</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest syllabus activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">CS 301 syllabus needs revision</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">CS 201 syllabus submitted for review</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">CS 101 syllabus approved</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Important dates and reminders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Spring 2024 Syllabus Deadline</p>
                        <p className="text-xs text-muted-foreground">All syllabi must be submitted</p>
                      </div>
                      <Badge variant="destructive">2 days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Faculty Meeting</p>
                        <p className="text-xs text-muted-foreground">Department curriculum review</p>
                      </div>
                      <Badge variant="secondary">1 week</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <DashboardLayout
      title="Teacher Dashboard"
      subtitle="Manage your course syllabi and submissions"
      tabs={[
        { id: "overview", label: "Overview", icon: FileText },
        { id: "syllabi", label: "My Syllabi", icon: FileText },
        { id: "templates", label: "Templates", icon: FileText },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
