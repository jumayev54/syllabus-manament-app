"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, MessageSquare, FileText, User, Calendar, Clock } from "lucide-react"

interface SyllabusReviewModalProps {
  syllabusId: string
  reviewerRole: "department_head" | "dean" | "rector"
  onClose: () => void
  onAction: (action: "approve" | "reject" | "request_revision", comments: string) => void
}

export function SyllabusReviewModal({ syllabusId, reviewerRole, onClose, onAction }: SyllabusReviewModalProps) {
  const [comments, setComments] = useState("")
  const [selectedAction, setSelectedAction] = useState<"approve" | "reject" | "request_revision" | null>(null)

  // Mock syllabus data - in production this would come from your database
  const syllabusData = {
    id: syllabusId,
    courseCode: "CS 201",
    courseTitle: "Data Structures",
    instructor: "Dr. John Smith",
    department: "Computer Science",
    version: "1.0",
    submittedDate: "2024-01-20",
    lastModified: "2024-01-20",
    status: "pending_department_head",
    description: "This course introduces fundamental data structures and algorithms...",
    learningOutcomes: [
      "Understand and implement basic data structures",
      "Analyze time and space complexity",
      "Apply appropriate data structures to solve problems",
    ],
    assignments: [
      { title: "Programming Assignment 1", weight: 15, dueDate: "2024-02-15" },
      { title: "Midterm Exam", weight: 25, dueDate: "2024-03-15" },
      { title: "Final Project", weight: 30, dueDate: "2024-05-01" },
    ],
    workflowHistory: [
      {
        action: "submitted",
        reviewer: "Dr. John Smith",
        role: "teacher",
        timestamp: "2024-01-20 10:30 AM",
        comments: "Initial submission for review",
      },
    ],
  }

  const handleAction = (action: "approve" | "reject" | "request_revision") => {
    if (!comments.trim() && action !== "approve") {
      alert("Please provide comments for this action")
      return
    }
    onAction(action, comments)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_department_head":
        return "secondary"
      case "pending_dean":
        return "secondary"
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending_department_head":
        return "Pending Department Head"
      case "pending_dean":
        return "Pending Dean"
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Review Syllabus</span>
          </DialogTitle>
          <DialogDescription>Review and approve or request changes to this syllabus submission</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Syllabus Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {syllabusData.courseCode} - {syllabusData.courseTitle}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4 mt-2">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {syllabusData.instructor}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Submitted {syllabusData.submittedDate}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Version {syllabusData.version}
                    </span>
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(syllabusData.status)}>{getStatusLabel(syllabusData.status)}</Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Syllabus Content Preview */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{syllabusData.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {syllabusData.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5">
                        {index + 1}
                      </Badge>
                      <span className="text-muted-foreground">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Assignments & Grading</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {syllabusData.assignments.map((assignment, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{assignment.title}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{assignment.weight}%</Badge>
                      <span className="text-muted-foreground">Due: {assignment.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workflow History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workflow History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {syllabusData.workflowHistory.map((entry, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {entry.action}
                        </Badge>
                        <span className="text-sm font-medium">{entry.reviewer}</span>
                        <span className="text-xs text-muted-foreground">({entry.role})</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{entry.timestamp}</p>
                      {entry.comments && <p className="text-sm mt-2">{entry.comments}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Review Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Review Decision</CardTitle>
              <CardDescription>Provide your review decision and comments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Provide feedback, suggestions, or reasons for your decision..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="default"
                  onClick={() => handleAction("approve")}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Approve</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAction("request_revision")}
                  className="flex items-center space-x-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Request Revision</span>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleAction("reject")}
                  className="flex items-center space-x-2"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reject</span>
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
