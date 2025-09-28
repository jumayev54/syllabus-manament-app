"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { History, Eye, Download, GitBranch, User, Calendar, FileText, ArrowRight } from "lucide-react"

interface Version {
  id: string
  version: string
  author: string
  timestamp: string
  status: "draft" | "submitted" | "approved" | "rejected"
  changes: string[]
  comments?: string
  size: string
}

interface VersionHistoryProps {
  syllabusId: string
  currentVersion: string
}

export function VersionHistory({ syllabusId, currentVersion }: VersionHistoryProps) {
  const [selectedVersions, setSelectedVersions] = useState<[string, string] | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  // Mock version data - in production this would come from your database
  const versions: Version[] = [
    {
      id: "v2.1",
      version: "2.1",
      author: "Dr. John Smith",
      timestamp: "2024-01-22 14:30",
      status: "approved",
      changes: ["Updated grading rubric", "Added new assignment", "Modified office hours"],
      comments: "Final version for Spring 2024",
      size: "2.4 MB",
    },
    {
      id: "v2.0",
      version: "2.0",
      author: "Dr. John Smith",
      timestamp: "2024-01-20 10:15",
      status: "rejected",
      changes: ["Major curriculum revision", "Updated learning outcomes", "New textbook requirements"],
      comments: "Needs revision per department feedback",
      size: "2.3 MB",
    },
    {
      id: "v1.2",
      version: "1.2",
      author: "Dr. John Smith",
      timestamp: "2024-01-18 16:45",
      status: "approved",
      changes: ["Fixed typos", "Updated contact information", "Clarified attendance policy"],
      comments: "Minor corrections approved",
      size: "2.2 MB",
    },
    {
      id: "v1.1",
      version: "1.1",
      author: "Dr. John Smith",
      timestamp: "2024-01-15 09:20",
      status: "submitted",
      changes: ["Added prerequisite information", "Updated course description"],
      comments: "Submitted for review",
      size: "2.1 MB",
    },
    {
      id: "v1.0",
      version: "1.0",
      author: "Dr. John Smith",
      timestamp: "2024-01-10 11:00",
      status: "draft",
      changes: ["Initial version created"],
      comments: "First draft",
      size: "2.0 MB",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "submitted":
        return "secondary"
      case "rejected":
        return "destructive"
      case "draft":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return "✓"
      case "submitted":
        return "↗"
      case "rejected":
        return "✗"
      case "draft":
        return "○"
      default:
        return "○"
    }
  }

  const handleCompareVersions = (version1: string, version2: string) => {
    setSelectedVersions([version1, version2])
    setShowComparison(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>Version History</span>
              </CardTitle>
              <CardDescription>Track changes and manage document versions</CardDescription>
            </div>
            <Badge variant="outline">Current: v{currentVersion}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div key={version.id}>
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        version.version === currentVersion
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {getStatusIcon(version.status)}
                    </div>
                    {index < versions.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium">Version {version.version}</h4>
                        <Badge variant={getStatusColor(version.status)}>{version.status}</Badge>
                        {version.version === currentVersion && <Badge variant="outline">Current</Badge>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        {index > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCompareVersions(version.version, versions[index - 1].version)}
                          >
                            <GitBranch className="h-4 w-4 mr-1" />
                            Compare
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {version.author}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {version.timestamp}
                      </span>
                      <span className="flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        {version.size}
                      </span>
                    </div>

                    {version.comments && <p className="text-sm text-muted-foreground mt-2">{version.comments}</p>}

                    <div className="mt-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Changes:</p>
                      <ul className="text-xs space-y-1">
                        {version.changes.map((change, changeIndex) => (
                          <li key={changeIndex} className="flex items-center text-muted-foreground">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {index < versions.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Version Comparison Modal */}
      {showComparison && selectedVersions && (
        <Dialog open={showComparison} onOpenChange={setShowComparison}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5" />
                <span>
                  Compare Versions: {selectedVersions[0]} <ArrowRight className="h-4 w-4 mx-2" /> {selectedVersions[1]}
                </span>
              </DialogTitle>
              <DialogDescription>View the differences between these two versions</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Version {selectedVersions[0]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium">Course Description</h4>
                      <p className="text-muted-foreground">
                        This course introduces fundamental data structures and algorithms used in computer science...
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Grading</h4>
                      <p className="text-muted-foreground">
                        Assignments: 40%, Midterm: 25%, Final: 30%, Participation: 5%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Version {selectedVersions[1]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium">Course Description</h4>
                      <p className="text-muted-foreground">
                        This course introduces fundamental data structures and algorithms used in computer science with
                        practical applications...
                        <span className="bg-green-100 dark:bg-green-900 px-1 rounded">with practical applications</span>
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Grading</h4>
                      <p className="text-muted-foreground">
                        Assignments: <span className="bg-red-100 dark:bg-red-900 px-1 rounded line-through">40%</span>
                        <span className="bg-green-100 dark:bg-green-900 px-1 rounded">35%</span>, Midterm: 25%, Final:
                        30%,{" "}
                        <span className="bg-green-100 dark:bg-green-900 px-1 rounded">
                          Project: 5%, Participation: 5%
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowComparison(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
