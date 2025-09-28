import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AuthProvider } from "@/hooks/use-auth";
import { WorkflowProvider } from "@/hooks/use-workflow";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Universitet O'quv Dasturi Boshqaruv Tizimi", // Translated to Uzbek
  description:
    "Universitetlar uchun zamonaviy o'quv dasturi boshqaruv platformasi", // Translated to Uzbek
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body
        className={`font-sans transition-theme ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <WorkflowProvider>
              <Suspense>{children}</Suspense>
              <Toaster />
            </WorkflowProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
