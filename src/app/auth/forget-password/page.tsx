"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!email) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/auth/forget-pwd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    toast.success(data.message);
    router.push(`/auth/reset-success/${email}`);
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Password Recovery</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Reset Your Password
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          {!!error && (
            <CardDescription className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert />
              <p>{error}</p>
            </CardDescription>
          )}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              disabled={loading}
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              Send reset link
            </Button>
          </form>
        </CardContent>
        <p className="text-sm mt-2 text-muted-foreground">
          Don&apos;t have an account?
          <Link href={"/auth/login"}> Sign up now</Link>
        </p>
      </Card>
    </div>
  );
}
