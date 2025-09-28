"use client";
import { LoginForm } from "@/components/auth/login-form";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";
import { TeacherDashboard } from "@/components/dashboards/teacher-dashboard";
import { DepartmentHeadDashboard } from "@/components/dashboards/department-head-dashboard";
import { DeanDashboard } from "@/components/dashboards/dean-dashboard";
import { RectorDashboard } from "@/components/dashboards/rector-dashboard";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  // Render appropriate dashboard based on user role
  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    case "department_head":
      return <DepartmentHeadDashboard />;
    case "dean":
      return <DeanDashboard />;
    case "rector":
      return <RectorDashboard />;
    default:
      return <LoginForm />;
  }
}
