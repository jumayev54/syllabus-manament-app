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
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Noto'g'ri email yoki parol");
      }
      // If successful, the login function will handle the redirect
    } catch (err) {
      console.error("Login error:", err);
      setError("Tizimga kirishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  // Quick login function for demo users
  const quickLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
    setIsLoading(true);

    try {
      const success = await login(demoEmail, demoPassword);
      if (!success) {
        setError("Demo ma'lumotlarida xatolik");
      }
    } catch (err) {
      console.error("Quick login error:", err);
      setError("Tizimga kirishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-muted/20 dark:from-background dark:via-muted/5 dark:to-muted/10 flex items-center justify-center p-4">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 p-4 shadow-lg border border-border/50 backdrop-blur-sm">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Universitet O'quv Dasturi Boshqaruv Tizimi
            </h1>
            <p className="text-muted-foreground text-pretty">
              Boshqaruv paneliga kirish va o'quv dasturlarini boshqarish uchun
              tizimga kiring
            </p>
          </div>
        </div>

        <Card className="shadow-xl border border-border bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-card-foreground">
              Tizimga kirish
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Tizimga kirish uchun ma'lumotlaringizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email manzil
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sizning.email@universitet.uz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Parol
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolingizni kiriting"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-muted/50"
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
                <Alert
                  variant="destructive"
                  className="bg-destructive/10 border-destructive/20"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-destructive">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Kirilmoqda..." : "Kirish"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/30 dark:bg-muted/20 rounded-lg border border-border/50">
              <p className="text-sm font-medium mb-3 text-center text-foreground">
                Demo ma'lumotlari (bosing):
              </p>
              <div className="text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-2 text-left flex-col items-start hover:bg-muted/50 dark:hover:bg-muted/30"
                    onClick={() =>
                      quickLogin("admin@universitet.uz", "admin123")
                    }
                    disabled={isLoading}
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        Administrator
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        admin@universitet.uz
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-2 text-left flex-col items-start hover:bg-muted/50 dark:hover:bg-muted/30"
                    onClick={() =>
                      quickLogin("o.usmonov@universitet.uz", "teacher123")
                    }
                    disabled={isLoading}
                  >
                    <div>
                      <p className="font-medium text-foreground">O'qituvchi</p>
                      <p className="text-[10px] text-muted-foreground">
                        o.usmonov@universitet.uz
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-2 text-left flex-col items-start hover:bg-muted/50 dark:hover:bg-muted/30"
                    onClick={() =>
                      quickLogin("n.karimova@universitet.uz", "head123")
                    }
                    disabled={isLoading}
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        Kafedra mudiri
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        n.karimova@universitet.uz
                      </p>
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-2 text-left flex-col items-start hover:bg-muted/50 dark:hover:bg-muted/30"
                    onClick={() =>
                      quickLogin("a.toshmatov@universitet.uz", "dean123")
                    }
                    disabled={isLoading}
                  >
                    <div>
                      <p className="font-medium text-foreground">Dekan</p>
                      <p className="text-[10px] text-muted-foreground">
                        a.toshmatov@universitet.uz
                      </p>
                    </div>
                  </Button>
                </div>

                <div className="text-center pt-2 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-2 text-center hover:bg-muted/50 dark:hover:bg-muted/30"
                    onClick={() =>
                      quickLogin("m.rahimova@universitet.uz", "rector123")
                    }
                    disabled={isLoading}
                  >
                    <div>
                      <p className="font-medium text-foreground">Rektor</p>
                      <p className="text-[10px] text-muted-foreground">
                        m.rahimova@universitet.uz
                      </p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
