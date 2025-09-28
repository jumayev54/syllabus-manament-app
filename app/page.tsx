"use client";

import { useAuth } from "@/hooks/use-auth";
import { LoginForm } from "@/components/auth/login-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getDefaultRoute } from "@/lib/auth-utils";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Agar foydalanuvchi allaqachon kirgan bo'lsa, tegishli boshqaruv paneliga yo'naltirish
      const defaultRoute = getDefaultRoute(user);
      router.push(defaultRoute);
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // Agar foydalanuvchi kirgan bo'lsa, ular useEffect orqali yo'naltiriladi
  // Autentifikatsiya qilinmagan foydalanuvchilar uchun login formani ko'rsatish
  if (!user) {
    return <LoginForm />;
  }

  return null; // Yo'naltirish paytida qisqa vaqtga ko'rsatiladi
}
