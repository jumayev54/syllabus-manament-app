"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface WorkflowStep {
  id: string
  role: string
  reviewer?: string
  status: "completed" | "current" | "pending" | "skipped"
  timestamp?: string
  comments?: string
  action?: "approved" | "rejected" | "revision_requested"
}

interface WorkflowContextType {
  getWorkflowSteps: (syllabusId: string) => WorkflowStep[]
  updateWorkflowStep: (syllabusId: string, stepId: string, action: string, comments: string, reviewer: string) => void
  getCurrentStep: (syllabusId: string) => string
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined)

export function WorkflowProvider({ children }: { children: ReactNode }) {
  // Mock workflow data - in production this would come from your database
  const [workflows, setWorkflows] = useState<Record<string, WorkflowStep[]>>({
    "1": [
      {
        id: "teacher",
        role: "teacher",
        reviewer: "Dr. John Smith",
        status: "completed",
        timestamp: "2024-01-20 10:30 AM",
        comments: "Initial submission",
        action: "approved",
      },
      {
        id: "department_head",
        role: "department_head",
        status: "current",
      },
      {
        id: "dean",
        role: "dean",
        status: "pending",
      },
      {
        id: "rector",
        role: "rector",
        status: "pending",
      },
    ],
  })

  const getWorkflowSteps = (syllabusId: string): WorkflowStep[] => {
    return workflows[syllabusId] || []
  }

  const updateWorkflowStep = (
    syllabusId: string,
    stepId: string,
    action: string,
    comments: string,
    reviewer: string,
  ) => {
    setWorkflows((prev) => {
      const steps = [...(prev[syllabusId] || [])]
      const stepIndex = steps.findIndex((step) => step.id === stepId)

      if (stepIndex !== -1) {
        steps[stepIndex] = {
          ...steps[stepIndex],
          status: "completed",
          action: action as "approved" | "rejected" | "revision_requested",
          comments,
          reviewer,
          timestamp: new Date().toLocaleString(),
        }

        // Update next step if approved
        if (action === "approved" && stepIndex < steps.length - 1) {
          steps[stepIndex + 1] = {
            ...steps[stepIndex + 1],
            status: "current",
          }
        }
      }

      return {
        ...prev,
        [syllabusId]: steps,
      }
    })
  }

  const getCurrentStep = (syllabusId: string): string => {
    const steps = workflows[syllabusId] || []
    const currentStep = steps.find((step) => step.status === "current")
    return currentStep?.id || ""
  }

  return (
    <WorkflowContext.Provider value={{ getWorkflowSteps, updateWorkflowStep, getCurrentStep }}>
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (context === undefined) {
    throw new Error("useWorkflow must be used within a WorkflowProvider")
  }
  return context
}
