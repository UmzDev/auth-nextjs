"use client";
import { Button } from "@/components/ui/button";
import { MdArrowBackIos } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";

//react icons
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResetPassword = ({ params }: any) => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const router = useRouter();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const verifyToken = async () => {
      if (!params.token) {
        setError("Invalid token");
        return; // Early return if no token is provided
      }
      setLoading(true);
      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: params.token }), // Wrap token in an object
        });

        if (!response.ok) {
          setError("Invalid token");
          return;
        }

        const { email } = await response.json();
        setEmail(email);
      } catch (error) {
        console.error("Error verifying token:", error);
        setError("An error occurred during verification");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.token]);

  useEffect(() => {
    if (email) {
      console.log("email: ", email);
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
    if (confirmPassword !== password) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          email,
        }),
      });

      if (!response.ok) {
        setError("Invalid credentials");
        return;
      }

      const data = await response.json();
      router.push("/auth/login");
      toast.success(data.message);
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An error occurred while resetting the password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Reset Your Password</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Please enter a new password
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
              type="password"
              disabled={loading}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              disabled={loading}
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button
              disabled={error.length > 0 || loading}
              className="w-full"
              size="lg"
            >
              Reset Password
            </Button>
          </form>
          <Separator />

          <Link
            className="text-sky-700 mt-5 hover:text-sky-900 flex items-center"
            href="/auth/login"
          >
            <MdArrowBackIos className="size-4" />
            <p>Cancel Reset</p>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
