"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { GraduationCap, LogOut, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

interface Tab {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface DashboardLayoutProps {
  title: string
  subtitle: string
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  children: React.ReactNode
}

export function DashboardLayout({ title, subtitle, tabs, activeTab, onTabChange, children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">University Syllabus Management</h1>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <div className="text-sm">
              <p className="font-medium">{user?.name}</p>
              <p className="text-muted-foreground capitalize">{user?.role?.replace("_", " ")}</p>
            </div>

            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
          <div className="p-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-balance">{title}</h2>
              <p className="text-sm text-muted-foreground text-pretty">{subtitle}</p>
            </div>

            <nav className="mt-6 space-y-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => onTabChange(tab.id)}
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
