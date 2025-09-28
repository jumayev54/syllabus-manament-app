"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  University,
  Building2,
  Users,
  FileText,
  TrendingUp,
  Globe,
  BarChart3,
  ArrowLeft,
  GraduationCap,
  UserCheck,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
} from "lucide-react";

export function RectorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  type Campus = (typeof campuses)[number];
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);

  const universityStats = [
    { title: "Total Colleges", value: "12", icon: Building2, change: "+2" },
    { title: "Faculty Members", value: "2,847", icon: Users, change: "+156" },
    { title: "Active Syllabi", value: "4,892", icon: FileText, change: "+342" },
    {
      title: "System Health",
      value: "98.7%",
      icon: TrendingUp,
      change: "+0.3%",
    },
  ];

  const campuses = [
    {
      id: 1,
      name: "Main Campus",
      location: "Downtown",
      address: "123 University Ave, Downtown, State 12345",
      colleges: 8,
      students: 15420,
      status: "operational",
      dean: {
        name: "Dr. Sarah Johnson",
        email: "s.johnson@university.edu",
        phone: "+1 (555) 123-4567",
        experience: "15 years",
      },
      departments: [
        {
          name: "Computer Science",
          head: "Dr. Michael Chen",
          faculty: 45,
          students: 1200,
          syllabi: 28,
          budget: "$2.5M",
        },
        {
          name: "Mathematics",
          head: "Dr. Emily Rodriguez",
          faculty: 32,
          students: 890,
          syllabi: 22,
          budget: "$1.8M",
        },
        {
          name: "Physics",
          head: "Dr. James Wilson",
          faculty: 28,
          students: 650,
          syllabi: 18,
          budget: "$2.1M",
        },
        {
          name: "Chemistry",
          head: "Dr. Lisa Thompson",
          faculty: 24,
          students: 540,
          syllabi: 16,
          budget: "$1.9M",
        },
      ],
      facilities: [
        {
          name: "Central Library",
          capacity: "2,000 seats",
          status: "operational",
        },
        {
          name: "Science Labs",
          capacity: "50 labs",
          status: "operational",
        },
        {
          name: "Sports Complex",
          capacity: "5,000 capacity",
          status: "maintenance",
        },
        {
          name: "Student Center",
          capacity: "3,000 capacity",
          status: "operational",
        },
      ],
      recentActivities: [
        {
          type: "achievement",
          message: "Computer Science Dept. published 15 research papers",
          time: "2 days ago",
        },
        {
          type: "event",
          message: "Annual Science Fair concluded successfully",
          time: "1 week ago",
        },
        {
          type: "update",
          message: "Library renovation Phase 2 completed",
          time: "2 weeks ago",
        },
      ],
    },
    {
      id: 2,
      name: "North Campus",
      location: "Northside",
      address: "456 North Ave, Northside, State 12346",
      colleges: 4,
      students: 8750,
      status: "operational",
      dean: {
        name: "Dr. Robert Davis",
        email: "r.davis@university.edu",
        phone: "+1 (555) 234-5678",
        experience: "12 years",
      },
      departments: [
        {
          name: "Business Administration",
          head: "Dr. Amanda Foster",
          faculty: 35,
          students: 2100,
          syllabi: 32,
          budget: "$3.2M",
        },
        {
          name: "Economics",
          head: "Dr. Thomas Brown",
          faculty: 22,
          students: 1800,
          syllabi: 24,
          budget: "$2.1M",
        },
        {
          name: "Marketing",
          head: "Dr. Jennifer Lee",
          faculty: 18,
          students: 1200,
          syllabi: 20,
          budget: "$1.7M",
        },
      ],
      facilities: [
        {
          name: "Business Center",
          capacity: "1,500 seats",
          status: "operational",
        },
        {
          name: "Conference Halls",
          capacity: "10 halls",
          status: "operational",
        },
        {
          name: "Innovation Lab",
          capacity: "200 workstations",
          status: "operational",
        },
      ],
      recentActivities: [
        {
          type: "achievement",
          message: "MBA program ranked #15 nationally",
          time: "3 days ago",
        },
        {
          type: "event",
          message: "Entrepreneurship Summit 2024 hosted",
          time: "1 week ago",
        },
      ],
    },
    {
      id: 3,
      name: "Medical Campus",
      location: "Medical District",
      address: "789 Medical Blvd, Medical District, State 12347",
      colleges: 2,
      students: 3200,
      status: "operational",
      dean: {
        name: "Dr. Patricia Martinez",
        email: "p.martinez@university.edu",
        phone: "+1 (555) 345-6789",
        experience: "20 years",
      },
      departments: [
        {
          name: "Medicine",
          head: "Dr. Kevin Zhang",
          faculty: 85,
          students: 1800,
          syllabi: 45,
          budget: "$8.5M",
        },
        {
          name: "Nursing",
          head: "Dr. Maria Garcia",
          faculty: 42,
          students: 1400,
          syllabi: 35,
          budget: "$4.2M",
        },
      ],
      facilities: [
        {
          name: "Teaching Hospital",
          capacity: "500 beds",
          status: "operational",
        },
        {
          name: "Medical Labs",
          capacity: "25 labs",
          status: "operational",
        },
        {
          name: "Simulation Center",
          capacity: "20 rooms",
          status: "operational",
        },
      ],
      recentActivities: [
        {
          type: "achievement",
          message: "New cardiac surgery wing opened",
          time: "1 day ago",
        },
        {
          type: "update",
          message: "Medical equipment upgrade completed",
          time: "5 days ago",
        },
      ],
    },
  ];

  const handleViewCampus = (campus: any) => {
    setSelectedCampus(campus);
  };

  const handleBackToCampuses = () => {
    setSelectedCampus(null);
  };

  const renderCampusDetails = () => {
    if (!selectedCampus) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleBackToCampuses}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campuses
          </Button>
          <div>
            <h3 className="text-2xl font-bold">{selectedCampus.name}</h3>
            <p className="text-muted-foreground">{selectedCampus.address}</p>
          </div>
        </div>

        {/* Campus Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedCampus.students.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedCampus.departments.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Faculty
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedCampus.departments.reduce(
                  (total, dept) => total + dept.faculty,
                  0
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Syllabi
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {selectedCampus.departments.reduce(
                  (total, dept) => total + dept.syllabi,
                  0
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Campus Dean Information */}
          <Card>
            <CardHeader>
              <CardTitle>Campus Dean</CardTitle>
              <CardDescription>Administrative leadership</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedCampus.dean.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedCampus.dean.experience} experience
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCampus.dean.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCampus.dean.phone}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest campus updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedCampus.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "achievement"
                          ? "bg-green-500"
                          : activity.type === "event"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Departments */}
        <Card>
          <CardHeader>
            <CardTitle>Departments & Department Heads</CardTitle>
            <CardDescription>
              Academic departments and their leadership
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedCampus.departments.map((dept, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Head: {dept.head}
                      </p>
                    </div>
                    <Badge variant="outline">{dept.budget}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Faculty</p>
                      <p className="font-medium">{dept.faculty}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Students</p>
                      <p className="font-medium">
                        {dept.students.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Syllabi</p>
                      <p className="font-medium">{dept.syllabi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Facilities */}
        <Card>
          <CardHeader>
            <CardTitle>Campus Facilities</CardTitle>
            <CardDescription>Infrastructure and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {selectedCampus.facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{facility.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {facility.capacity}
                    </p>
                  </div>
                  <Badge
                    variant={
                      facility.status === "operational"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {facility.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderContent = () => {
    if (selectedCampus) {
      return renderCampusDetails();
    }

    switch (activeTab) {
      case "campuses":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Campus Management</h3>
            <div className="grid gap-4">
              {campuses.map((campus, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">
                          {campus.name}
                        </CardTitle>
                        <CardDescription>
                          {campus.location} • {campus.colleges} colleges •{" "}
                          {campus.students.toLocaleString()} students
                        </CardDescription>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {campus.address}
                          </span>
                        </div>
                      </div>
                      <Badge variant="default">{campus.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCampus(campus)}
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        View Campus
                      </Button>
                      <Button variant="outline" size="sm">
                        Manage Resources
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {universityStats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.change} this month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>University Highlights</CardTitle>
                  <CardDescription>
                    Recent achievements and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          Law College achieved 97% completion rate
                        </p>
                        <p className="text-xs text-muted-foreground">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          New Medical Campus facility opened
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 days ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          System-wide digital transformation completed
                        </p>
                        <p className="text-xs text-muted-foreground">
                          1 week ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Strategic Initiatives</CardTitle>
                  <CardDescription>
                    Key university-wide projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">
                          Digital Curriculum Initiative
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Modernizing all syllabi
                        </p>
                      </div>
                      <Badge variant="default">On Track</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">
                          Faculty Development Program
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Professional growth initiative
                        </p>
                      </div>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">
                          Campus Expansion Project
                        </p>
                        <p className="text-xs text-muted-foreground">
                          New research facilities
                        </p>
                      </div>
                      <Badge variant="outline">Planning</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      title="Rector Dashboard"
      subtitle="University-wide Administration and Strategic Overview"
      tabs={[
        { id: "overview", label: "Overview", icon: University },
        { id: "campuses", label: "Campuses", icon: Globe },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
