"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Table, FileSpreadsheet, Calendar, Filter } from "lucide-react"

interface ExportOption {
  id: string
  label: string
  description: string
  formats: string[]
}

const exportOptions: ExportOption[] = [
  {
    id: "syllabi",
    label: "Syllabi Documents",
    description: "Export individual or bulk syllabi",
    formats: ["PDF", "DOCX", "HTML"],
  },
  {
    id: "reports",
    label: "Analytics Reports",
    description: "Export system analytics and metrics",
    formats: ["PDF", "XLSX", "CSV"],
  },
  {
    id: "schedules",
    label: "Course Schedules",
    description: "Export course schedules and timetables",
    formats: ["PDF", "XLSX", "ICS"],
  },
  {
    id: "users",
    label: "User Data",
    description: "Export user lists and permissions",
    formats: ["XLSX", "CSV", "JSON"],
  },
]

export function ExportManager() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [selectedFormat, setSelectedFormat] = useState<string>("")
  const [dateRange, setDateRange] = useState<string>("all")
  const [campus, setCampus] = useState<string>("all")

  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions([...selectedOptions, optionId])
    } else {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId))
    }
  }

  const handleExport = () => {
    // Mock export functionality
    console.log("[v0] Exporting:", { selectedOptions, selectedFormat, dateRange, campus })
    alert(`Exporting ${selectedOptions.length} items in ${selectedFormat} format`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Export Manager</h2>
        <p className="text-muted-foreground">Export syllabi, reports, and data in various formats</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Options
            </CardTitle>
            <CardDescription>Select what you want to export</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {exportOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={(checked) => handleOptionChange(option.id, checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor={option.id} className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  <div className="flex gap-1 mt-2">
                    {option.formats.map((format) => (
                      <span key={format} className="px-2 py-1 text-xs bg-secondary rounded text-secondary-foreground">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Export Filters
            </CardTitle>
            <CardDescription>Configure export parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="docx">Word (DOCX)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="current">Current Semester</SelectItem>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="last90">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Campus</Label>
              <Select value={campus} onValueChange={setCampus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campuses</SelectItem>
                  <SelectItem value="main">Main Campus</SelectItem>
                  <SelectItem value="north">North Campus</SelectItem>
                  <SelectItem value="medical">Medical Campus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Quick Export Templates</h4>
              <div className="grid gap-2">
                <Button variant="outline" size="sm" className="justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  All Syllabi (PDF)
                </Button>
                <Button variant="outline" size="sm" className="justify-start bg-transparent">
                  <Table className="h-4 w-4 mr-2" />
                  Analytics Report (Excel)
                </Button>
                <Button variant="outline" size="sm" className="justify-start bg-transparent">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Faculty List (CSV)
                </Button>
                <Button variant="outline" size="sm" className="justify-start bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Course Schedules (PDF)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Summary</CardTitle>
          <CardDescription>Review your export configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Selected Items:</span>
              <span className="text-sm">{selectedOptions.length} options</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Format:</span>
              <span className="text-sm">{selectedFormat || "Not selected"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Date Range:</span>
              <span className="text-sm">{dateRange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Campus:</span>
              <span className="text-sm">{campus}</span>
            </div>
            <Separator />
            <Button
              onClick={handleExport}
              className="w-full"
              disabled={selectedOptions.length === 0 || !selectedFormat}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Selected Items
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
