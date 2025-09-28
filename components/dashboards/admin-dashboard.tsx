"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { FacultyManagement } from "@/components/admin/faculty-management";
import { DepartmentManagement } from "@/components/admin/department-management";
import { UserRoleAssignment } from "@/components/admin/user-role-assignment";
import { Settings, Users, Building2, GraduationCap } from "lucide-react";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("faculties");

  const renderContent = () => {
    switch (activeTab) {
      case "faculties":
        return <FacultyManagement />;
      case "departments":
        return <DepartmentManagement />;
      case "users":
        return <UserRoleAssignment />;
      default:
        return <FacultyManagement />;
    }
  };

  return (
    <DashboardLayout
      title="Administrator boshqaruv paneli"
      subtitle="Tizim boshqaruvi"
      tabs={[
        { id: "faculties", label: "Fakultetlar", icon: Building2 },
        { id: "departments", label: "Kafedralar", icon: GraduationCap },
        { id: "users", label: "Foydalanuvchilar", icon: Users },
        { id: "settings", label: "Sozlamalar", icon: Settings },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
