"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Download } from "lucide-react"

interface SyllabusTemplatesProps {
  onSelectTemplate: (templateId: string) => void
}

export function SyllabusTemplates({ onSelectTemplate }: SyllabusTemplatesProps) {
  const templates = [
    {
      id: "1",
      name: "Computer Science Standard",
      description: "Standard template for computer science courses with programming assignments",
      category: "Computer Science",
      lastUpdated: "2024-01-15",
      usage: 45,
    },
    {
      id: "2",
      name: "Mathematics Course",
      description: "Template for mathematics courses with problem sets and exams",
      category: "Mathematics",
      lastUpdated: "2024-01-10",
      usage: 32,
    },
    {
      id: "3",
      name: "Laboratory Course",
      description: "Template for lab-based courses with practical assignments",
      category: "Science",
      lastUpdated: "2024-01-12",
      usage: 28,
    },
    {
      id: "4",
      name: "Seminar Course",
      description: "Template for discussion-based seminar courses",
      category: "Liberal Arts",
      lastUpdated: "2024-01-08",
      usage: 19,
    },
    {
      id: "5",
      name: "Project-Based Course",
      description: "Template for courses with major project components",
      category: "Engineering",
      lastUpdated: "2024-01-20",
      usage: 37,
    },
    {
      id: "6",
      name: "Online Course",
      description: "Template optimized for online and hybrid courses",
      category: "Distance Learning",
      lastUpdated: "2024-01-18",
      usage: 24,
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Computer Science":
        return "default"
      case "Mathematics":
        return "secondary"
      case "Science":
        return "outline"
      case "Engineering":
        return "default"
      case "Liberal Arts":
        return "secondary"
      case "Distance Learning":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Syllabus Templates</h3>
        <p className="text-sm text-muted-foreground">
          Choose from pre-designed templates to quickly create your syllabus
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={getCategoryColor(template.category)}>{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-muted-foreground">
                  <p>Last updated: {template.lastUpdated}</p>
                  <p>Used by {template.usage} faculty</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button size="sm" onClick={() => onSelectTemplate(template.id)}>
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Template Request</CardTitle>
          <CardDescription>
            Need a template for a specific type of course? Request a custom template from the admin team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Request Custom Template</Button>
        </CardContent>
      </Card>
    </div>
  )
}
