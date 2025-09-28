"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, FileText, Mail, Clock, CheckCircle } from "lucide-react"
import type { DateRange } from "react-day-picker"

export function ReportsGenerator() {
  const [reportType, setReportType] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [reportFormat, setReportFormat] = useState("pdf")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [emailRecipients, setEmailRecipients] = useState("")
  const [reportTitle, setReportTitle] = useState("")
  const [reportDescription, setReportDescription] = useState("")

  const reportTypes = [
    {
      id: "syllabus-completion",
      name: "Syllabus Completion Report",
      description: "Track completion rates across departments",
    },
    {
      id: "approval-workflow",
      name: "Approval Workflow Report",
      description: "Analyze approval times and bottlenecks",
    },
    { 
      id: "user-activity", 
      name: "User Activity Report", 
      description: "Monitor user engagement and system usage" 
    },
    {
      id: "department-performance",
      name: "Department Performance Report",
      description: "Compare department metrics and KPIs",
    },
    { 
      id: "compliance", 
      name: "Compliance Report", 
      description: "Ensure policy adherence and standards" 
    },
    { 
      id: "custom", 
      name: "Custom Report", 
      description: "Build a custom report with selected metrics" 
    },
  ]

  const departments = [
    "Computer Science",
    "Mathematics", 
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Psychology",
  ]

  const scheduledReports = [
    {
      id: "1",
      name: "Weekly Completion Report",
      type: "syllabus-completion",
      schedule: "Weekly",
      lastRun: "2024-01-22",
      status: "active",
    },
    {
      id: "2",
      name: "Monthly Department Performance",
      type: "department-performance",
      schedule: "Monthly",
      lastRun: "2024-01-01",
      status: "active",
    },
    {
      id: "3",
      name: "Quarterly Compliance Review",
      type: "compliance",
      schedule: "Quarterly",
      lastRun: "2024-01-01",
      status: "paused",
    },
  ]

  const handleDepartmentToggle = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department) ? prev.filter((d) => d !== department) : [...prev, department],
    )
  }

  const handleGenerateReport = () => {
    console.log("Generating report:", {
      reportType,
      dateRange,
      selectedDepartments,
      reportFormat,
      includeCharts,
      reportTitle,
      reportDescription,
    })
    // In production, this would trigger report generation
  }

  const handleScheduleReport = () => {
    console.log("Scheduling report:", {
      reportType,
      selectedDepartments,
      reportFormat,
      emailRecipients,
    })
    // In production, this would create a scheduled report
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Reports Generator</h3>
        <p className="text-sm text-muted-foreground">Generate comprehensive reports and analytics</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Report Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Configure your report parameters and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportFormat">Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Departments</Label>
                <div className="grid grid-cols-2 gap-2">
                  {departments.map((department) => (
                    <div key={department} className="flex items-center space-x-2">
                      <Checkbox
                        id={department}
                        checked={selectedDepartments.includes(department)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleDepartmentToggle(department)
                          } else {
                            handleDepartmentToggle(department)
                          }
                        }}
                      />
                      <Label htmlFor={department} className="text-sm font-normal cursor-pointer">
                        {department}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportTitle">Report Title</Label>
                <Input
                  id="reportTitle"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="Enter report title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportDescription">Description</Label>
                <Textarea
                  id="reportDescription"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Enter report description"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeCharts" 
                  checked={includeCharts} 
                  onCheckedChange={(checked) => setIncludeCharts(!!checked)}
                />
                <Label htmlFor="includeCharts" className="cursor-pointer">
                  Include charts and visualizations
                </Label>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleGenerateReport} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button variant="outline" onClick={handleScheduleReport}>
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Email Distribution</CardTitle>
              <CardDescription>Configure email recipients for scheduled reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailRecipients">Email Recipients</Label>
                <Textarea
                  id="emailRecipients"
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                  placeholder="Enter email addresses separated by commas"
                  rows={3}
                />
              </div>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Test Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled Reports */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Manage automated report generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{report.name}</h4>
                      <Badge variant={report.status === "active" ? "default" : "secondary"}>
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {reportTypes.find((t) => t.id === report.type)?.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{report.schedule}</span>
                      <span>Last: {report.lastRun}</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        {report.status === "active" ? "Pause" : "Resume"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Reports</CardTitle>
              <CardDescription>Generate common reports instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Current Week Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Pending Approvals
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Overdue Submissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
