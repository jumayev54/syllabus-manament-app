"use client";

import { EditSyllabusForm } from "@/components/syllabus/edit-syllabus-form";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Required for static export
export async function generateStaticParams() {
  // Since this is a dynamic page that depends on user data,
  // return an empty array - pages will be generated on demand
  return [];
}

// Make the page dynamic
export const dynamic = 'force-dynamic';

interface EditSyllabusPageProps {
  params: {
    id: string;
  };
}

export default function EditSyllabusPage({ params }: EditSyllabusPageProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'teacher')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

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

  return <EditSyllabusForm syllabusId={params.id} />;
}