"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, User, MessageSquare } from "lucide-react"

interface WorkflowStep {
  id: string
  role: string
  reviewer?: string
  status: "completed" | "current" | "pending" | "skipped"
  timestamp?: string
  comments?: string
  action?: "approved" | "rejected" | "revision_requested"
}

interface WorkflowTrackerProps {
  steps: WorkflowStep[]
  currentStep: string
}

export function WorkflowTracker({ steps, currentStep }: WorkflowTrackerProps) {
  const getStepIcon = (step: WorkflowStep) => {
    switch (step.status) {
      case "completed":
        if (step.action === "approved") {
          return <CheckCircle className="h-5 w-5 text-green-500" />
        } else if (step.action === "rejected") {
          return <XCircle className="h-5 w-5 text-red-500" />
        } else {
          return <MessageSquare className="h-5 w-5 text-orange-500" />
        }
      case "current":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-gray-400" />
      case "skipped":
        return <div className="h-5 w-5 rounded-full bg-gray-300" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStepStatus = (step: WorkflowStep) => {
    switch (step.status) {
      case "completed":
        if (step.action === "approved") return "Approved"
        if (step.action === "rejected") return "Rejected"
        if (step.action === "revision_requested") return "Revision Requested"
        return "Completed"
      case "current":
        return "In Review"
      case "pending":
        return "Pending"
      case "skipped":
        return "Skipped"
      default:
        return "Unknown"
    }
  }

  const getStatusColor = (step: WorkflowStep) => {
    switch (step.status) {
      case "completed":
        if (step.action === "approved") return "default"
        if (step.action === "rejected") return "destructive"
        if (step.action === "revision_requested") return "secondary"
        return "default"
      case "current":
        return "secondary"
      case "pending":
        return "outline"
      case "skipped":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tasdiqlash ish jarayoni</CardTitle>
        <CardDescription>
          Hujjat qaysi bosqichda ekanligini va kim tomonidan ko‘rib chiqilayotganini kuzatib boring.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                {getStepIcon(step)}
                {index < steps.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium capitalize">{step.role.replace("_", " ")}</p>
                    {step.reviewer && (
                      <p className="text-xs text-muted-foreground flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {step.reviewer}
                      </p>
                    )}
                  </div>
                  <Badge variant={getStatusColor(step)}>{getStepStatus(step)}</Badge>
                </div>
                {step.timestamp && <p className="text-xs text-muted-foreground mt-1">{step.timestamp}</p>}
                {step.comments && (
                  <p className="text-sm mt-2 p-2 bg-muted rounded text-muted-foreground">{step.comments}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
