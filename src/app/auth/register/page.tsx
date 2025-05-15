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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    toast.success(data.message);
    router.push("/login");
  };

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/" });
  };
  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign up</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service, to create account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          {!!error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert />
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              disabled={loading}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              type="text"
              disabled={loading}
              placeholder="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              type="password"
              disabled={loading}
              placeholder="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Input
              type="password"
              disabled={loading}
              placeholder="confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
            <Button className="w-full" size="lg" disabled={loading}>
              register
            </Button>
          </form>
          <Separator />{" "}
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
          </div>{" "}
          <p className="text-center text-sm mt-2 text-muted-foreground">
            Already have an account?
            <Link
              className="text-sky-700 ml-4 hover:underline cursor-pointer"
              href="auth/login"
            >
              Sing in{" "}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
