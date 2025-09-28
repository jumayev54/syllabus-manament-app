"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { GraduationCap, AlertCircle, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Added password visibility toggle
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Noto'g'ri email yoki parol"); // Translated error message to Uzbek
      }
    } catch (err) {
      setError("Tizimga kirishda xatolik yuz berdi"); // Translated error message to Uzbek
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4 transition-theme">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-4 shadow-lg">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Universitet O'quv Dasturi Boshqaruv Tizimi
            </h1>
            <p className="text-muted-foreground text-pretty">
              Boshqaruv paneliga kirish va o'quv dasturlarini boshqarish uchun
              tizimga kiring
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Tizimga kirish
            </CardTitle>
            <CardDescription>
              Tizimga kirish uchun ma'lumotlaringizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email manzil</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sizning.email@universitet.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-theme"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolingizni kiriting"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-theme pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="transition-theme">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full transition-theme"
                disabled={isLoading}
              >
                {isLoading ? "Kirilmoqda..." : "Kirish"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg border transition-theme">
              <p className="text-sm font-medium mb-3 text-center">
                Demo ma'lumotlari:
              </p>
              <div className="text-xs space-y-2 text-muted-foreground">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p>
                      <strong>Administrator:</strong>
                    </p>
                    <p className="text-[10px]">admin@universitet.uz</p>
                    <p className="text-[10px]">Parol: admin123</p>
                  </div>
                  <div>
                    <p>
                      <strong>O'qituvchi:</strong>
                    </p>
                    <p className="text-[10px]">o.usmonov@universitet.uz</p>
                    <p className="text-[10px]">Parol: teacher123</p>
                  </div>
                  <div>
                    <p>
                      <strong>Kafedra mudiri:</strong>
                    </p>
                    <p className="text-[10px]">n.karimova@universitet.uz</p>
                    <p className="text-[10px]">Parol: head123</p>
                  </div>
                  <div>
                    <p>
                      <strong>Dekan:</strong>
                    </p>
                    <p className="text-[10px]">a.toshmatov@universitet.uz</p>
                    <p className="text-[10px]">Parol: dean123</p>
                  </div>
                </div>
                <div className="text-center pt-2 border-t border-border/50">
                  <p>
                    <strong>Rektor:</strong> m.rahimova@universitet.uz
                  </p>
                  <p className="text-[10px]">Parol: rector123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
