"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { ReportsGenerator } from "@/components/analytics/reports-generator"

export function AnalyticsOverview() {
  return (
    <Tabs defaultValue="dashboard" className="space-y-4">
      <TabsList>
        <TabsTrigger value="dashboard">Analytics Dashboard</TabsTrigger>
        <TabsTrigger value="reports">Reports Generator</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <AnalyticsDashboard />
      </TabsContent>

      <TabsContent value="reports">
        <ReportsGenerator />
      </TabsContent>
    </Tabs>
  )
}
