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
import { Separator } from "@/components/ui/separator";

import Link from "next/link";

//react icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 character long");
      return;
    }
    setLoading(true);

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!response?.ok) {
      setError("Invalid Credentials");
      setLoading(false);
      return;
    }
    router.push("/");
    toast.success("login successful");
  };

  const handleProvider = async (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();

    try {
      await signIn(value, { callbackUrl: "/" });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign in</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service, to sign in
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
            <Input
              type="password"
              disabled={loading}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button className="w-full" size="lg" disabled={loading}>
              login
            </Button>
          </form>
          <Separator />
          <div className="flex my-2 justify-evenly mx-auto items-center">
            <Button
              disabled={loading}
              onClick={(e) => handleProvider(e, "google")}
              className=" disabled:bg-slate-700 flex w-full md:w-[48%] items-center justify-center bg-gray-800 text-white hover:bg-gray-700 transition py-2 rounded"
            >
              <FcGoogle className="size-6 left-2.5 top-2.5" />
            </Button>
            <Button
              disabled={loading}
              onClick={(e) => handleProvider(e, "github")}
              className=" disabled:bg-slate-700 flex w-full md:w-[48%] items-center justify-center bg-gray-800 text-white hover:bg-gray-700 transition py-2 rounded"
            >
              <FaGithub className="size-6 left-2.5 top-2.5" />
            </Button>
          </div>
          <div className="text-center ">
            <Link
              className="text-muted-foreground mt-4 cursor-pointer"
              href="/auth/forget-password"
            >
              Did you forget your password?
            </Link>
            <p className="text-sm mt-2 text-muted-foreground">
              Create new account?
              <Link
                className="text-sky-700 hover:underline cursor-pointer"
                href="/auth/register"
              >
                {" "}Sing up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
