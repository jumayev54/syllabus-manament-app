"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { canAccessResource } from "@/lib/auth-utils";
import { BookOpen, FileText, Plus, Clock, Building2, AlertCircle, Eye, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Syllabus {
  id: string;
  title: string;
  courseCode: string;
  credits: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  teacherId: string;
  updatedAt: string;
}

interface Faculty {
  id: string;
  name: string;
  description?: string;
}

interface Department {
  id: string;
  name: string;
  description?: string;
  departmentHead?: {
    name: string;
  };
  facultyCount?: number;
}

export function TeacherDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("syllabi");
  const [syllabi, setSyllabi] = useState<Syllabus[]>([]);
  const [facultyInfo, setFacultyInfo] = useState<Faculty | null>(null);
  const [departmentInfo, setDepartmentInfo] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchTeacherData();
    }
  }, [user]);

  const fetchTeacherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load existing syllabi from localStorage and mock data
      const savedSyllabi = JSON.parse(localStorage.getItem('syllabi') || '[]');
      const draftSyllabi = JSON.parse(localStorage.getItem('syllabus-drafts') || '[]');
      
      // Filter by current teacher
      const teacherSyllabi = [...savedSyllabi, ...draftSyllabi].filter(
        (syllabus: any) => syllabus.teacherId === user?.id
      );

      // Mock data for demo
      const mockSyllabi: Syllabus[] = [
        {
          id: '1',
          title: 'Kompyuter ilmlari asoslari',
          courseCode: 'CS 101',
          credits: 3,
          status: 'approved',
          teacherId: user?.id || '',
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Ma\'lumotlar tuzilmasi va algoritmlar',
          courseCode: 'CS 201',
          credits: 4,
          status: 'draft',
          teacherId: user?.id || '',
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Ma\'lumotlar bazasi boshqaruv tizimlari',
          courseCode: 'CS 301',
          credits: 3,
          status: 'pending',
          teacherId: user?.id || '',
          updatedAt: new Date().toISOString(),
        },
      ];

      const mockFaculty: Faculty = {
        id: 'faculty-1',
        name: 'Kompyuter ilmlari fakulteti',
        description: 'Kompyuter ilmlari bo\'yicha ta\'lim va tadqiqot',
      };

      const mockDepartment: Department = {
        id: 'dept-1',
        name: 'Kompyuter ilmlari kafedrasi',
        description: 'Ilg\'or kompyuter ilmlari ta\'limi',
        departmentHead: {
          name: 'Dr. Jamshid Karimov'
        },
        facultyCount: 25,
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Combine saved and mock data
      const allSyllabi = [...teacherSyllabi, ...mockSyllabi];
      setSyllabi(allSyllabi);
      setFacultyInfo(mockFaculty);
      setDepartmentInfo(mockDepartment);

    } catch (error) {
      console.error("O'qituvchi ma'lumotlarini olishda xatolik:", error);
      setError("Dashboard ma'lumotlarini yuklashda xatolik. Iltimos, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      case 'draft':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Tasdiqlangan';
      case 'pending':
        return 'Ko\'rib chiqilmoqda';
      case 'rejected':
        return 'Rad etilgan';
      case 'draft':
        return 'Qoralama';
      default:
        return status;
    }
  };

  const handleCreateSyllabus = () => {
    router.push('/dashboard/teacher/create-syllabus');
  };

  const handleViewSyllabus = (syllabusId: string) => {
    router.push(`/dashboard/teacher/syllabus/${syllabusId}`);
  };

  const handleEditSyllabus = (syllabusId: string) => {
    router.push(`/dashboard/teacher/syllabus/${syllabusId}/edit`);
  };

  const handleSubmitForReview = async (syllabusId: string) => {
    try {
      // Update status to pending
      const drafts = JSON.parse(localStorage.getItem('syllabus-drafts') || '[]');
      const syllabi = JSON.parse(localStorage.getItem('syllabi') || '[]');
      
      // Find the draft and move it to syllabi with pending status
      const draftIndex = drafts.findIndex((d: any) => d.id === syllabusId);
      if (draftIndex !== -1) {
        const draft = drafts[draftIndex];
        draft.status = 'pending';
        draft.updatedAt = new Date().toISOString();
        
        // Move from drafts to syllabi
        drafts.splice(draftIndex, 1);
        syllabi.push(draft);
        
        localStorage.setItem('syllabus-drafts', JSON.stringify(drafts));
        localStorage.setItem('syllabi', JSON.stringify(syllabi));
        
        // Update local state
        setSyllabi(prev => prev.map(s => 
          s.id === syllabusId 
            ? { ...s, status: 'pending' as const, updatedAt: new Date().toISOString() }
            : s
        ));
        
        toast({
          title: "Ko'rib chiqishga yuborildi",
          description: "O'quv dasturi muvaffaqiyatli ko'rib chiqishga yuborildi.",
        });
      }
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "O'quv dasturini yuborishda xatolik yuz berdi.",
        variant: "destructive",
      });
    }
  };

  const renderSyllabusCard = (syllabus: Syllabus) => (
    <Card key={syllabus.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{syllabus.title}</CardTitle>
            <CardDescription>
              {syllabus.courseCode} • {syllabus.credits} kredit
            </CardDescription>
            <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                Oxirgi yangilanish: {new Date(syllabus.updatedAt).toLocaleDateString('uz-UZ')}
              </span>
            </div>
          </div>
          <Badge variant={getStatusColor(syllabus.status)} className="capitalize">
            {getStatusText(syllabus.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleEditSyllabus(syllabus.id)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Tahrirlash
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleViewSyllabus(syllabus.id)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Batafsil ko'rish
          </Button>
          {syllabus.status === "draft" && (
            <Button 
              size="sm"
              onClick={() => handleSubmitForReview(syllabus.id)}
            >
              Ko'rib chiqishga yuborish
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Dashboard ma'lumotlari yuklanmoqda...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
            <p className="text-destructive font-medium">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={fetchTeacherData}
            >
              Qayta urinib ko'rish
            </Button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "syllabi":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Mening o'quv dasturlarim</h3>
                <p className="text-muted-foreground">
                  Kafedra: {departmentInfo?.name || 'Tayinlanmagan'} | Fakultet: {facultyInfo?.name || 'Tayinlanmagan'}
                </p>
              </div>
              <Button onClick={handleCreateSyllabus}>
                <Plus className="mr-2 h-4 w-4" />
                Yangi o'quv dasturi yaratish
              </Button>
            </div>

            {syllabi.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">O'quv dasturlari topilmadi</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Siz hali hech qanday o'quv dasturi yaratmagansiz. Birinchi o'quv dasturingizni yaratish bilan boshlang.
                  </p>
                  <Button onClick={handleCreateSyllabus}>
                    <Plus className="mr-2 h-4 w-4" />
                    Birinchi o'quv dasturingizni yarating
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {syllabi.map(renderSyllabusCard)}
              </div>
            )}
          </div>
        );

      case "department":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Kafedra ma'lumotlari</h3>
            {departmentInfo ? (
              <Card>
                <CardHeader>
                  <CardTitle>{departmentInfo.name}</CardTitle>
                  <CardDescription>{departmentInfo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Fakultet:</strong> {facultyInfo?.name || 'Tayinlanmagan'}
                    </p>
                    <p>
                      <strong>Kafedra mudiri:</strong> {departmentInfo.departmentHead?.name || "Tayinlanmagan"}
                    </p>
                    <p>
                      <strong>Jami o'qituvchilar:</strong> {departmentInfo.facultyCount || 0}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Kafedra ma'lumotlari yo'q</h3>
                  <p className="text-muted-foreground text-center">
                    Siz hozircha hech qaysi kafedraga tayinlanmagansiz. Iltimos, administratoringiz bilan bog'laning.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Foydalanuvchi ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title={`Xush kelibsiz, ${user.name}`}
      subtitle="O'qituvchi boshqaruv paneli"
      tabs={[
        { id: "syllabi", label: "Mening o'quv dasturlarim", icon: BookOpen },
        { id: "department", label: "Kafedra", icon: Building2 },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
