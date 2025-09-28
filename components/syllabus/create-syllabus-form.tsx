"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SyllabusData {
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
}

export function CreateSyllabusForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [syllabusData, setSyllabusData] = useState<SyllabusData>({
    title: "",
    courseCode: "",
    credits: 3,
    semester: "",
    academicYear: new Date().getFullYear().toString(),
    description: "",
    objectives: [""],
    prerequisites: [""],
    textbooks: [{ title: "", author: "", edition: "", publisher: "" }],
    assessmentMethods: [
      { method: "Oraliq imtihon", percentage: 30, description: "" },
      { method: "Yakuniy imtihon", percentage: 40, description: "" },
      { method: "Mustaqil ish", percentage: 20, description: "" },
      { method: "Amaliy mashg'ulotlar", percentage: 10, description: "" }
    ],
    weeklySchedule: Array.from({ length: 16 }, (_, i) => ({
      week: i + 1,
      topic: "",
      activities: "",
      readings: ""
    })),
    gradingScale: [
      { grade: "A", minScore: 90, maxScore: 100 },
      { grade: "B", minScore: 80, maxScore: 89 },
      { grade: "C", minScore: 70, maxScore: 79 },
      { grade: "D", minScore: 60, maxScore: 69 },
      { grade: "F", minScore: 0, maxScore: 59 }
    ],
    policies: {
      attendance: "",
      lateSubmission: "",
      academicIntegrity: ""
    }
  });

  const [activeSection, setActiveSection] = useState("basic");
  const [isSaving, setIsSaving] = useState(false);

  const handleBasicInfoChange = (field: keyof SyllabusData, value: any) => {
    setSyllabusData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (
    arrayField: keyof SyllabusData,
    index: number,
    value: string
  ) => {
    setSyllabusData(prev => ({
      ...prev,
      [arrayField]: (prev[arrayField] as string[]).map((item, i) =>
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (arrayField: keyof SyllabusData) => {
    setSyllabusData(prev => ({
      ...prev,
      [arrayField]: [...(prev[arrayField] as any[]), ""]
    }));
  };

  const removeArrayItem = (arrayField: keyof SyllabusData, index: number) => {
    setSyllabusData(prev => ({
      ...prev,
      [arrayField]: (prev[arrayField] as any[]).filter((_, i) => i !== index)
    }));
  };

  const handleTextbookChange = (index: number, field: string, value: string) => {
    setSyllabusData(prev => ({
      ...prev,
      textbooks: prev.textbooks.map((book, i) =>
        i === index ? { ...book, [field]: value } : book
      )
    }));
  };

  const handleAssessmentChange = (index: number, field: string, value: string | number) => {
    setSyllabusData(prev => ({
      ...prev,
      assessmentMethods: prev.assessmentMethods.map((method, i) =>
        i === index ? { ...method, [field]: value } : method
      )
    }));
  };

  const handleWeeklyScheduleChange = (index: number, field: string, value: string) => {
    setSyllabusData(prev => ({
      ...prev,
      weeklySchedule: prev.weeklySchedule.map((week, i) =>
        i === index ? { ...week, [field]: value } : week
      )
    }));
  };

  const handlePolicyChange = (field: keyof typeof syllabusData.policies, value: string) => {
    setSyllabusData(prev => ({
      ...prev,
      policies: { ...prev.policies, [field]: value }
    }));
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage for now
      const drafts = JSON.parse(localStorage.getItem('syllabus-drafts') || '[]');
      const newDraft = {
        id: `draft-${Date.now()}`,
        ...syllabusData,
        teacherId: user?.id,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      drafts.push(newDraft);
      localStorage.setItem('syllabus-drafts', JSON.stringify(drafts));
      
      toast({
        title: "Qoralama saqlandi",
        description: "O'quv dasturi qoralama sifatida muvaffaqiyatli saqlandi.",
      });
      
      router.push('/dashboard/teacher');
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "O'quv dasturini saqlashda xatolik yuz berdi.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const submitForReview = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage for now
      const syllabi = JSON.parse(localStorage.getItem('syllabi') || '[]');
      const newSyllabus = {
        id: `syllabus-${Date.now()}`,
        ...syllabusData,
        teacherId: user?.id,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      syllabi.push(newSyllabus);
      localStorage.setItem('syllabi', JSON.stringify(syllabi));
      
      toast({
        title: "Ko'rib chiqishga yuborildi",
        description: "O'quv dasturi ko'rib chiqish uchun muvaffaqiyatli yuborildi.",
      });
      
      router.push('/dashboard/teacher');
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "O'quv dasturini yuborishda xatolik yuz berdi.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Fan nomi *</Label>
          <Input
            id="title"
            value={syllabusData.title}
            onChange={(e) => handleBasicInfoChange('title', e.target.value)}
            placeholder="Masalan: Kompyuter ilmlari asoslari"
            required
          />
        </div>
        <div>
          <Label htmlFor="courseCode">Fan kodi *</Label>
          <Input
            id="courseCode"
            value={syllabusData.courseCode}
            onChange={(e) => handleBasicInfoChange('courseCode', e.target.value)}
            placeholder="Masalan: CS 101"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="credits">Kredit soatlari *</Label>
          <Select
            value={syllabusData.credits.toString()}
            onValueChange={(value) => handleBasicInfoChange('credits', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map(credit => (
                <SelectItem key={credit} value={credit.toString()}>
                  {credit} kredit
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="semester">Semestr *</Label>
          <Select
            value={syllabusData.semester}
            onValueChange={(value) => handleBasicInfoChange('semester', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Semestrni tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1-semestr</SelectItem>
              <SelectItem value="2">2-semestr</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="academicYear">O'quv yili *</Label>
          <Input
            id="academicYear"
            value={syllabusData.academicYear}
            onChange={(e) => handleBasicInfoChange('academicYear', e.target.value)}
            placeholder="2024-2025"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Fan tavsifi *</Label>
        <Textarea
          id="description"
          value={syllabusData.description}
          onChange={(e) => handleBasicInfoChange('description', e.target.value)}
          placeholder="Fanning umumiy tavsifi va maqsadlari..."
          rows={4}
        />
      </div>
    </div>
  );

  const renderObjectives = () => (
    <div className="space-y-4">
      <div>
        <Label>O'quv maqsadlari *</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Ushbu fan tugagandan so'ng talabalar quyidagi bilim va ko'nikmalarga ega bo'lishi kerak:
        </p>
        {syllabusData.objectives.map((objective, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={objective}
              onChange={(e) => handleArrayFieldChange('objectives', index, e.target.value)}
              placeholder={`${index + 1}-maqsad`}
            />
            {syllabusData.objectives.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('objectives', index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => addArrayItem('objectives')}
          className="mt-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Maqsad qo'shish
        </Button>
      </div>

      <Separator />

      <div>
        <Label>Oldindan talab qilinadigan bilimlar</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Ushbu fanni o'rganish uchun zarur bo'lgan oldingi fanlar:
        </p>
        {syllabusData.prerequisites.map((prerequisite, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={prerequisite}
              onChange={(e) => handleArrayFieldChange('prerequisites', index, e.target.value)}
              placeholder={`Talab qilinadigan fan ${index + 1}`}
            />
            {syllabusData.prerequisites.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeArrayItem('prerequisites', index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => addArrayItem('prerequisites')}
          className="mt-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Talab qo'shish
        </Button>
      </div>
    </div>
  );

  const renderAssessment = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-4">Baholash usullari</h4>
        {syllabusData.assessmentMethods.map((method, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Baholash usuli</Label>
                  <Input
                    value={method.method}
                    onChange={(e) => handleAssessmentChange(index, 'method', e.target.value)}
                    placeholder="Baholash usuli"
                  />
                </div>
                <div>
                  <Label>Foiz ulushi</Label>
                  <Input
                    type="number"
                    value={method.percentage}
                    onChange={(e) => handleAssessmentChange(index, 'percentage', parseInt(e.target.value) || 0)}
                    placeholder="0-100"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <Label>Tavsif</Label>
                  <Input
                    value={method.description}
                    onChange={(e) => handleAssessmentChange(index, 'description', e.target.value)}
                    placeholder="Qo'shimcha ma'lumot"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">
            Jami: {syllabusData.assessmentMethods.reduce((sum, method) => sum + method.percentage, 0)}%
          </p>
          {syllabusData.assessmentMethods.reduce((sum, method) => sum + method.percentage, 0) !== 100 && (
            <p className="text-sm text-destructive">
              Diqqat: Umumiy foiz 100% bo'lishi kerak
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-4">
      <h4 className="font-medium">Haftalik o'quv rejasi</h4>
      <div className="space-y-3">
        {syllabusData.weeklySchedule.map((week, index) => (
          <Card key={index}>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">
                    {week.week}-hafta
                  </Label>
                </div>
                <div>
                  <Label className="text-xs">Mavzu</Label>
                  <Input
                    value={week.topic}
                    onChange={(e) => handleWeeklyScheduleChange(index, 'topic', e.target.value)}
                    placeholder="Haftalik mavzu"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Faoliyatlar</Label>
                  <Input
                    value={week.activities}
                    onChange={(e) => handleWeeklyScheduleChange(index, 'activities', e.target.value)}
                    placeholder="Mashg'ulot turlari"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">O'qish materiallari</Label>
                  <Input
                    value={week.readings}
                    onChange={(e) => handleWeeklyScheduleChange(index, 'readings', e.target.value)}
                    placeholder="Adabiyotlar"
                    className="text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const sections = [
    { id: "basic", label: "Asosiy ma'lumotlar", component: renderBasicInfo },
    { id: "objectives", label: "Maqsadlar va talablar", component: renderObjectives },
    { id: "assessment", label: "Baholash tizimi", component: renderAssessment },
    { id: "schedule", label: "O'quv rejasi", component: renderSchedule },
  ];

  const currentSectionComponent = sections.find(s => s.id === activeSection)?.component || renderBasicInfo;

  return (
    <div className="container max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Yangi o'quv dasturi yaratish</h1>
            <p className="text-muted-foreground">
              O'qituvchi: {user?.name}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={saveDraft} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            Qoralama saqlash
          </Button>
          <Button onClick={submitForReview} disabled={isSaving}>
            <Eye className="mr-2 h-4 w-4" />
            Ko'rib chiqishga yuborish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bo'limlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {sections.find(s => s.id === activeSection)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentSectionComponent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}