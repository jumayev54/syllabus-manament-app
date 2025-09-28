"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Users, FileText, Clock, CheckCircle, Download, Building2 } from "lucide-react"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Mock analytics data
  const overviewStats = [
    { title: "Total Syllabi", value: "1,247", change: "+12%", trend: "up", icon: FileText },
    { title: "Active Users", value: "342", change: "+8%", trend: "up", icon: Users },
    { title: "Pending Approvals", value: "23", change: "-15%", trend: "down", icon: Clock },
    { title: "Completion Rate", value: "94.2%", change: "+2.1%", trend: "up", icon: CheckCircle },
  ]

  const submissionTrends = [
    { month: "Jan", submissions: 45, approvals: 42, rejections: 3 },
    { month: "Feb", submissions: 52, approvals: 48, rejections: 4 },
    { month: "Mar", submissions: 38, approvals: 35, rejections: 3 },
    { month: "Apr", submissions: 61, approvals: 58, rejections: 3 },
    { month: "May", submissions: 49, approvals: 46, rejections: 3 },
    { month: "Jun", submissions: 33, approvals: 31, rejections: 2 },
  ]

  const departmentData = [
    { name: "Computer Science", syllabi: 89, completion: 94, faculty: 12 },
    { name: "Mathematics", syllabi: 76, completion: 98, faculty: 15 },
    { name: "Physics", syllabi: 54, completion: 91, faculty: 10 },
    { name: "Chemistry", syllabi: 43, completion: 89, faculty: 8 },
    { name: "Biology", syllabi: 67, completion: 96, faculty: 11 },
    { name: "English", syllabi: 82, completion: 92, faculty: 14 },
  ]

  const statusDistribution = [
    { name: "Approved", value: 68, color: "#10b981" },
    { name: "Pending", value: 18, color: "#f59e0b" },
    { name: "Revision Needed", value: 9, color: "#ef4444" },
    { name: "Draft", value: 5, color: "#6b7280" },
  ]

  const userActivityData = [
    { role: "Teachers", active: 89, total: 156, percentage: 57 },
    { role: "Department Heads", active: 12, total: 15, percentage: 80 },
    { role: "Deans", active: 8, total: 12, percentage: 67 },
    { role: "Rectors", active: 1, total: 1, percentage: 100 },
  ]

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    )
  }

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-500" : "text-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
          <p className="text-sm text-muted-foreground">Comprehensive system analytics and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon(stat.trend)}
                <span className={getTrendColor(stat.trend)}>{stat.change}</span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Submission Trends</CardTitle>
                <CardDescription>Monthly submission and approval patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={submissionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="approvals" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Current syllabus status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {statusDistribution.map((entry) => (
                    <div key={entry.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                      <span className="text-sm">
                        {entry.name}: {entry.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submission Analytics</CardTitle>
              <CardDescription>Detailed submission and approval metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={submissionTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="submissions" fill="#3b82f6" name="Submissions" />
                  <Bar dataKey="approvals" fill="#10b981" name="Approvals" />
                  <Bar dataKey="rejections" fill="#ef4444" name="Rejections" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Average Review Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3 days</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">-0.5 days</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Approval Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+2.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Revision Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500">+1.2%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Syllabus completion and compliance by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentData.map((dept) => (
                  <div key={dept.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{dept.name}</span>
                        <Badge variant="outline">{dept.faculty} faculty</Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{dept.syllabi} syllabi</span>
                        <Badge
                          variant={
                            dept.completion >= 95 ? "default" : dept.completion >= 90 ? "secondary" : "destructive"
                          }
                        >
                          {dept.completion}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={dept.completion} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Active users by role in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userActivityData.map((activity) => (
                    <div key={activity.role} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{activity.role}</span>
                        <span className="text-sm text-muted-foreground">
                          {activity.active}/{activity.total}
                        </span>
                      </div>
                      <Progress value={activity.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Activity</CardTitle>
                <CardDescription>Daily active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={submissionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
              <CardDescription>Key engagement indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">Weekly Active Users</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.2</div>
                  <p className="text-xs text-muted-foreground">Avg. Sessions per User</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">12m</div>
                  <p className="text-xs text-muted-foreground">Avg. Session Duration</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2.8</div>
                  <p className="text-xs text-muted-foreground">Documents per Session</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
