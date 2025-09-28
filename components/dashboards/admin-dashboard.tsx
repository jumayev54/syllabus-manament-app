"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { UserManagement } from "@/components/admin/user-management"
import { SystemSettings } from "@/components/admin/system-settings"
import { AnalyticsOverview } from "@/components/admin/analytics-overview"
import { DocumentRepository } from "@/components/documents/document-repository"
import { CampusSelector } from "@/components/multi-campus/campus-selector"
import { ExportManager } from "@/components/export/export-manager"
import { Users, Settings, BarChart3, FileText, Shield, Database, FolderOpen, Building2, Download } from "lucide-react"

export function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { title: "Total Users", value: "1,247", icon: Users, change: "+12%" },
    { title: "Active Syllabi", value: "89", icon: FileText, change: "+5%" },
    { title: "Pending Approvals", value: "23", icon: Shield, change: "-8%" },
    { title: "System Health", value: "99.9%", icon: Database, change: "+0.1%" },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />
      case "settings":
        return <SystemSettings />
      case "analytics":
        return <AnalyticsOverview />
      case "documents":
        return <DocumentRepository />
      case "campus":
        return <CampusSelector />
      case "export":
        return <ExportManager />
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
                    <p className="text-xs text-muted-foreground">
                      <Badge variant={stat.change.startsWith("+") ? "default" : "secondary"} className="text-xs">
                        {stat.change}
                      </Badge>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">New syllabus submitted by Dr. Smith</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">User account created for Prof. Johnson</p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Document archived: CS 101 v1.0</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system health and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database</span>
                      <Badge variant="default">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Authentication</span>
                      <Badge variant="default">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">File Storage</span>
                      <Badge variant="default">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Version Control</span>
                      <Badge variant="default">Operational</Badge>
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
      title="Admin Dashboard"
      subtitle="System administration and management"
      tabs={[
        { id: "overview", label: "Overview", icon: BarChart3 },
        { id: "users", label: "User Management", icon: Users },
        { id: "documents", label: "Document Repository", icon: FolderOpen },
        { id: "campus", label: "Multi-Campus", icon: Building2 },
        { id: "export", label: "Export Manager", icon: Download },
        { id: "settings", label: "System Settings", icon: Settings },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
