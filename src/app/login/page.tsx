"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, User, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter the email");
      return;
    }
    if (!password) {
      toast.error("Please enter the password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Login successful");
        router.push("/");
        router.refresh();
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-2 px-2">
            Enter your credentials to access the system
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="flex flex-col w-full overflow-hidden rounded-md border border-border focus-within:ring-1 focus-within:ring-ring bg-muted">
            <div className="relative w-full border-b border-border">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                style={{ paddingLeft: "2.75rem", paddingRight: "0.75rem" }}
              />
            </div>
            <div className="relative w-full border-b border-border">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                style={{ paddingLeft: "2.75rem", paddingRight: "0.75rem" }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase disabled:opacity-50 transition-colors hover:bg-primary/80"
            >
              {isLoading ? "..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
