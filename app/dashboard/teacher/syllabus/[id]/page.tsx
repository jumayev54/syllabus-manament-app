"use client";

import { SyllabusViewer } from "@/components/syllabus/syllabus-viewer";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SyllabusViewPage({ params }: { params: { id: string } }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'teacher')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleEdit = () => {
    router.push(`/dashboard/teacher/syllabus/${params.id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'teacher') {
    return null;
  }

  return <SyllabusViewer syllabusId={params.id} onEdit={handleEdit} />;
}