"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VersionHistory } from "@/components/documents/version-history"
import { ArrowLeft, Save, Upload, Eye, Plus, Trash2, History } from "lucide-react"

interface SyllabusEditorProps {
  syllabusId: string
  onBack: () => void
  onSave: () => void
}

interface LearningOutcome {
  id: string
  description: string
}

interface Assignment {
  id: string
  title: string
  type: string
  weight: number
  dueDate: string
}

interface WeeklySchedule {
  week: number
  topic: string
  readings: string
  assignments: string
}

export function SyllabusEditor({ syllabusId, onBack, onSave }: SyllabusEditorProps) {
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [syllabusData, setSyllabusData] = useState({
    courseCode: "CS 101",
    courseTitle: "Introduction to Programming",
    credits: "3",
    semester: "Spring 2024",
    instructor: "Dr. John Smith",
    email: "john.smith@university.edu",
    office: "CS Building, Room 201",
    officeHours: "MWF 2:00-3:00 PM",
    description: "",
    prerequisites: "",
    textbook: "",
    gradingScale: "A: 90-100%, B: 80-89%, C: 70-79%, D: 60-69%, F: Below 60%",
    attendancePolicy: "",
    latePolicy: "",
    academicIntegrity: "",
  })

  const [learningOutcomes, setLearningOutcomes] = useState<LearningOutcome[]>([
    { id: "1", description: "Understand fundamental programming concepts" },
    { id: "2", description: "Write and debug basic programs" },
  ])

  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: "1", title: "Programming Assignment 1", type: "assignment", weight: 15, dueDate: "2024-02-15" },
    { id: "2", title: "Midterm Exam", type: "exam", weight: 25, dueDate: "2024-03-15" },
    { id: "3", title: "Final Project", type: "project", weight: 30, dueDate: "2024-05-01" },
  ])

  const [schedule, setSchedule] = useState<WeeklySchedule[]>([
    { week: 1, topic: "Introduction to Programming", readings: "Chapter 1", assignments: "" },
    { week: 2, topic: "Variables and Data Types", readings: "Chapter 2", assignments: "Assignment 1" },
  ])

  const addLearningOutcome = () => {
    const newOutcome: LearningOutcome = {
      id: Date.now().toString(),
      description: "",
    }
    setLearningOutcomes([...learningOutcomes, newOutcome])
  }

  const removeLearningOutcome = (id: string) => {
    setLearningOutcomes(learningOutcomes.filter((outcome) => outcome.id !== id))
  }

  const updateLearningOutcome = (id: string, description: string) => {
    setLearningOutcomes(learningOutcomes.map((outcome) => (outcome.id === id ? { ...outcome, description } : outcome)))
  }

  const addAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title: "",
      type: "assignment",
      weight: 0,
      dueDate: "",
    }
    setAssignments([...assignments, newAssignment])
  }

  const removeAssignment = (id: string) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id))
  }

  const updateAssignment = (id: string, field: keyof Assignment, value: string | number) => {
    setAssignments(
      assignments.map((assignment) => (assignment.id === id ? { ...assignment, [field]: value } : assignment)),
    )
  }

  const addWeek = () => {
    const newWeek: WeeklySchedule = {
      week: schedule.length + 1,
      topic: "",
      readings: "",
      assignments: "",
    }
    setSchedule([...schedule, newWeek])
  }

  const removeWeek = (week: number) => {
    setSchedule(schedule.filter((item) => item.week !== week))
  }

  const updateSchedule = (week: number, field: keyof WeeklySchedule, value: string | number) => {
    setSchedule(schedule.map((item) => (item.week === week ? { ...item, [field]: value } : item)))
  }

  const handleSave = () => {
    // Save syllabus data with version increment
    console.log("Saving syllabus:", { syllabusData, learningOutcomes, assignments, schedule })
    onSave()
  }

  const handleSubmit = () => {
    // Submit for review
    console.log("Submitting syllabus for review")
    handleSave()
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="flex h-16 items-center px-6">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                {syllabusId === "new" ? "Create New Syllabus" : "Edit Syllabus"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {syllabusData.courseCode} - {syllabusData.courseTitle}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowVersionHistory(true)}>
                <History className="h-4 w-4 mr-2" />
                Version History
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSubmit}>
                <Upload className="h-4 w-4 mr-2" />
                Submit for Review
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto space-y-8">
          {/* Course Information */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>Basic course details and instructor information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courseCode">Course Code</Label>
                  <Input
                    id="courseCode"
                    value={syllabusData.courseCode}
                    onChange={(e) => setSyllabusData({ ...syllabusData, courseCode: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    value={syllabusData.credits}
                    onChange={(e) => setSyllabusData({ ...syllabusData, credits: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseTitle">Course Title</Label>
                <Input
                  id="courseTitle"
                  value={syllabusData.courseTitle}
                  onChange={(e) => setSyllabusData({ ...syllabusData, courseTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                  value={syllabusData.semester}
                  onValueChange={(value) => setSyllabusData({ ...syllabusData, semester: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                    <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    value={syllabusData.instructor}
                    onChange={(e) => setSyllabusData({ ...syllabusData, instructor: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={syllabusData.email}
                    onChange={(e) => setSyllabusData({ ...syllabusData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="office">Office</Label>
                  <Input
                    id="office"
                    value={syllabusData.office}
                    onChange={(e) => setSyllabusData({ ...syllabusData, office: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officeHours">Office Hours</Label>
                  <Input
                    id="officeHours"
                    value={syllabusData.officeHours}
                    onChange={(e) => setSyllabusData({ ...syllabusData, officeHours: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Description */}
          <Card>
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
              <CardDescription>Detailed course information and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={syllabusData.description}
                  onChange={(e) => setSyllabusData({ ...syllabusData, description: e.target.value })}
                  placeholder="Provide a comprehensive description of the course..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Textarea
                  id="prerequisites"
                  rows={2}
                  value={syllabusData.prerequisites}
                  onChange={(e) => setSyllabusData({ ...syllabusData, prerequisites: e.target.value })}
                  placeholder="List any course prerequisites..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textbook">Required Textbook(s)</Label>
                <Textarea
                  id="textbook"
                  rows={3}
                  value={syllabusData.textbook}
                  onChange={(e) => setSyllabusData({ ...syllabusData, textbook: e.target.value })}
                  placeholder="List required and recommended textbooks..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Learning Outcomes</CardTitle>
                  <CardDescription>What students will learn in this course</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addLearningOutcome}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Outcome
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningOutcomes.map((outcome, index) => (
                <div key={outcome.id} className="flex items-center space-x-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <Input
                    value={outcome.description}
                    onChange={(e) => updateLearningOutcome(outcome.id, e.target.value)}
                    placeholder="Enter learning outcome..."
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeLearningOutcome(outcome.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Assignments and Grading */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Assignments and Grading</CardTitle>
                  <CardDescription>Course assignments and their weights</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addAssignment}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Assignment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="grid grid-cols-5 gap-2 items-center">
                  <Input
                    value={assignment.title}
                    onChange={(e) => updateAssignment(assignment.id, "title", e.target.value)}
                    placeholder="Assignment title..."
                  />
                  <Select
                    value={assignment.type}
                    onValueChange={(value) => updateAssignment(assignment.id, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={assignment.weight}
                    onChange={(e) => updateAssignment(assignment.id, "weight", Number.parseInt(e.target.value))}
                    placeholder="Weight %"
                  />
                  <Input
                    type="date"
                    value={assignment.dueDate}
                    onChange={(e) => updateAssignment(assignment.id, "dueDate", e.target.value)}
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeAssignment(assignment.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="gradingScale">Grading Scale</Label>
                <Textarea
                  id="gradingScale"
                  rows={2}
                  value={syllabusData.gradingScale}
                  onChange={(e) => setSyllabusData({ ...syllabusData, gradingScale: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Course Schedule */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Course Schedule</CardTitle>
                  <CardDescription>Weekly topics and assignments</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addWeek}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Week
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {schedule.map((week) => (
                <div key={week.week} className="grid grid-cols-5 gap-2 items-center">
                  <Badge variant="outline">Week {week.week}</Badge>
                  <Input
                    value={week.topic}
                    onChange={(e) => updateSchedule(week.week, "topic", e.target.value)}
                    placeholder="Topic..."
                  />
                  <Input
                    value={week.readings}
                    onChange={(e) => updateSchedule(week.week, "readings", e.target.value)}
                    placeholder="Readings..."
                  />
                  <Input
                    value={week.assignments}
                    onChange={(e) => updateSchedule(week.week, "assignments", e.target.value)}
                    placeholder="Assignments..."
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeWeek(week.week)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Policies */}
          <Card>
            <CardHeader>
              <CardTitle>Course Policies</CardTitle>
              <CardDescription>Attendance, late work, and academic integrity policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="attendancePolicy">Attendance Policy</Label>
                <Textarea
                  id="attendancePolicy"
                  rows={3}
                  value={syllabusData.attendancePolicy}
                  onChange={(e) => setSyllabusData({ ...syllabusData, attendancePolicy: e.target.value })}
                  placeholder="Describe your attendance policy..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="latePolicy">Late Work Policy</Label>
                <Textarea
                  id="latePolicy"
                  rows={3}
                  value={syllabusData.latePolicy}
                  onChange={(e) => setSyllabusData({ ...syllabusData, latePolicy: e.target.value })}
                  placeholder="Describe your late work policy..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academicIntegrity">Academic Integrity Policy</Label>
                <Textarea
                  id="academicIntegrity"
                  rows={4}
                  value={syllabusData.academicIntegrity}
                  onChange={(e) => setSyllabusData({ ...syllabusData, academicIntegrity: e.target.value })}
                  placeholder="Describe academic integrity expectations..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Version History Modal */}
      {showVersionHistory && (
        <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Version History</DialogTitle>
              <DialogDescription>View and manage document versions</DialogDescription>
            </DialogHeader>
            <VersionHistory syllabusId={syllabusId} currentVersion="2.1" />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
