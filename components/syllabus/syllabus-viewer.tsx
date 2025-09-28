"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, FileText, Download, Share } from "lucide-react";
import { useRouter } from "next/navigation";

interface SyllabusViewerProps {
  syllabusId: string;
  onEdit?: () => void;
}

interface SyllabusData {
  id: string;
  title: string;
  courseCode: string;
  credits: number;
  semester: string;
  academicYear: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  textbooks: Array<{
    title: string;
    author: string;
    edition: string;
    publisher: string;
  }>;
  assessmentMethods: Array<{
    method: string;
    percentage: number;
    description: string;
  }>;
  weeklySchedule: Array<{
    week: number;
    topic: string;
    activities: string;
    readings: string;
  }>;
  gradingScale: Array<{
    grade: string;
    minScore: number;
    maxScore: number;
  }>;
  policies: {
    attendance: string;
    lateSubmission: string;
    academicIntegrity: string;
  };
  status: string;
  teacherId: string;
  teacherName?: string;
  updatedAt: string;
}

export function SyllabusViewer({ syllabusId, onEdit }: SyllabusViewerProps) {
  const router = useRouter();
  const [syllabus, setSyllabus] = useState<SyllabusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSyllabusData();
  }, [syllabusId]);

  const fetchSyllabusData = async () => {
    setLoading(true);
    try {
      // Get from localStorage for now
      const savedSyllabi = JSON.parse(localStorage.getItem('syllabi') || '[]');
      const draftSyllabi = JSON.parse(localStorage.getItem('syllabus-drafts') || '[]');
      const allSyllabi = [...savedSyllabi, ...draftSyllabi];
      
      let foundSyllabus = allSyllabi.find((s: any) => s.id === syllabusId);
      
      // If not found, check mock data
      if (!foundSyllabus) {
        const mockSyllabi = [
          {
            id: '1',
            title: 'Kompyuter ilmlari asoslari',
            courseCode: 'CS 101',
            credits: 3,
            semester: '1',
            academicYear: '2024-2025',
            description: 'Bu fan kompyuter ilmlarining asosiy tushunchalari va printsiplarini o\'rgatadi. Talabalar kompyuter arxitekturasi, dasturlash asoslari va ma\'lumotlar tuzilmasi haqida bilim oladilar.',
            objectives: [
              'Kompyuter tizimlarining asosiy komponentlarini tushunish',
              'Dasturlash tillarining asosiy tushunchalarini o\'rganish',
              'Algoritmlar va ma\'lumotlar tuzilmalarini qo\'llash',
              'Problem solving ko\'nikmalarini rivojlantirish'
            ],
            prerequisites: ['Matematika asoslari', 'Mantiq asoslari'],
            textbooks: [
              {
                title: 'Computer Science: An Overview',
                author: 'Glenn Brookshear',
                edition: '12th Edition',
                publisher: 'Pearson'
              },
              {
                title: 'Introduction to Algorithms',
                author: 'Thomas H. Cormen',
                edition: '3rd Edition',
                publisher: 'MIT Press'
              }
            ],
            assessmentMethods: [
              { method: 'Oraliq imtihon', percentage: 30, description: '2 ta oraliq imtihon o\'tkaziladi' },
              { method: 'Yakuniy imtihon', percentage: 40, description: 'Semestr oxirida yakuniy imtihon' },
              { method: 'Mustaqil ish', percentage: 20, description: 'Haftalik vazifalar va loyihalar' },
              { method: 'Amaliy mashg\'ulotlar', percentage: 10, description: 'Laboratoriya ishlari' }
            ],
            weeklySchedule: [
              { week: 1, topic: 'Kompyuter ilmlariga kirish', activities: 'Ma\'ruza, muhokama', readings: 'Brookshear 1-bob' },
              { week: 2, topic: 'Kompyuter arxitekturasi', activities: 'Ma\'ruza, amaliy', readings: 'Brookshear 2-bob' },
              { week: 3, topic: 'Dasturlash asoslari', activities: 'Ma\'ruza, laboratoriya', readings: 'Brookshear 3-bob' },
              { week: 4, topic: 'Algoritmlar', activities: 'Ma\'ruza, amaliy', readings: 'Cormen 1-2 bob' },
              { week: 5, topic: 'Ma\'lumotlar tuzilmasi', activities: 'Ma\'ruza, laboratoriya', readings: 'Cormen 3-4 bob' },
              { week: 6, topic: 'Dasturlash tillari', activities: 'Ma\'ruza, amaliy', readings: 'Brookshear 4-bob' },
              { week: 7, topic: 'Dasturiy ta\'minot', activities: 'Ma\'ruza, loyiha', readings: 'Brookshear 5-bob' },
              { week: 8, topic: 'Oraliq imtihon 1', activities: 'Imtihon', readings: 'Takrorlash' }
            ],
            gradingScale: [
              { grade: 'A', minScore: 90, maxScore: 100 },
              { grade: 'B', minScore: 80, maxScore: 89 },
              { grade: 'C', minScore: 70, maxScore: 79 },
              { grade: 'D', minScore: 60, maxScore: 69 },
              { grade: 'F', minScore: 0, maxScore: 59 }
            ],
            policies: {
              attendance: 'Darsga qatnashish majburiy. 80% dan kam qatnashish holatida talaba yakuniy imtihonga qo\'yilmaydi.',
              lateSubmission: 'Kech topshirilgan vazifalar har kun uchun 10% ball yo\'qotadi. 3 kundan keyin vazifa qabul qilinmaydi.',
              academicIntegrity: 'Plagiat va akademik inkorrupsiya qat\'iyan man etiladi. Bunday holatlar nol baho bilan jazolanadi.'
            },
            status: 'approved',
            teacherId: 'teacher-1',
            teacherName: 'Oybek Usmonov',
            updatedAt: new Date().toISOString()
          }
        ];
        foundSyllabus = mockSyllabi.find(s => s.id === syllabusId);
      }
      
      if (foundSyllabus) {
        setSyllabus(foundSyllabus as SyllabusData);
      }
    } catch (error) {
      console.error('O\'quv dasturini yuklashda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Tasdiqlangan';
      case 'pending': return 'Ko\'rib chiqilmoqda';
      case 'rejected': return 'Rad etilgan';
      case 'draft': return 'Qoralama';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">O'quv dasturi yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!syllabus) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">O'quv dasturi topilmadi</h2>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <div>
            <h1 className="text-2xl font-bold">O'quv Dasturi</h1>
            <p className="text-muted-foreground">
              Oxirgi yangilanish: {new Date(syllabus.updatedAt).toLocaleDateString('uz-UZ')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={getStatusColor(syllabus.status)}>
            {getStatusText(syllabus.status)}
          </Badge>
          {onEdit && (
            <Button variant="outline" onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Tahrirlash
            </Button>
          )}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            PDF yuklash
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{syllabus.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fan kodi</p>
              <p className="text-lg font-semibold">{syllabus.courseCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Kredit soatlari</p>
              <p className="text-lg font-semibold">{syllabus.credits} kredit</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Semestr</p>
              <p className="text-lg font-semibold">{syllabus.semester}-semestr</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">O'quv yili</p>
              <p className="text-lg font-semibold">{syllabus.academicYear}</p>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-2">Fan tavsifi</h4>
            <p className="text-muted-foreground">{syllabus.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>O'quv maqsadlari</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {syllabus.objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary font-medium mt-0.5">{index + 1}.</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      {syllabus.prerequisites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Oldindan talab qilinadigan bilimlar</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {syllabus.prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Textbooks */}
      {syllabus.textbooks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Asosiy adabiyotlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {syllabus.textbooks.map((book, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h5 className="font-medium">{book.title}</h5>
                  <p className="text-sm text-muted-foreground">
                    Muallif: {book.author} | Nashr: {book.edition} | Nashriyot: {book.publisher}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assessment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Baholash tizimi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {syllabus.assessmentMethods.map((method, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h5 className="font-medium">{method.method}</h5>
                  {method.description && (
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-primary">{method.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grading Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Baho shkakasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {syllabus.gradingScale.map((grade, index) => (
              <div key={index} className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{grade.grade}</div>
                <div className="text-sm text-muted-foreground">
                  {grade.minScore}-{grade.maxScore}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Haftalik o'quv rejasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {syllabus.weeklySchedule.filter(week => week.topic).map((week, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 border rounded-lg">
                <div className="font-medium">
                  Hafta {week.week}
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Mavzu: </span>
                  {week.topic}
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Faoliyat: </span>
                  {week.activities}
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Adabiyot: </span>
                  {week.readings}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Fan siyosati va qoidalari</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {syllabus.policies.attendance && (
            <div>
              <h5 className="font-medium mb-2">Davomat siyosati</h5>
              <p className="text-muted-foreground">{syllabus.policies.attendance}</p>
            </div>
          )}
          {syllabus.policies.lateSubmission && (
            <div>
              <h5 className="font-medium mb-2">Kech topshirish siyosati</h5>
              <p className="text-muted-foreground">{syllabus.policies.lateSubmission}</p>
            </div>
          )}
          {syllabus.policies.academicIntegrity && (
            <div>
              <h5 className="font-medium mb-2">Akademik halollik</h5>
              <p className="text-muted-foreground">{syllabus.policies.academicIntegrity}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Ushbu o'quv dasturi {syllabus.teacherName || 'O\'qituvchi'} tomonidan tayyorlangan</p>
            <p>Oxirgi yangilanish: {new Date(syllabus.updatedAt).toLocaleDateString('uz-UZ')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}