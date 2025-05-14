"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      return;
    }
    console.log(response.json());
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-950">
      <Card className="w-[80%] md:w-[480px] md:p-4 p-6 bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center font-bold text-2xl text-sky-800 border-b pb-2">
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardDescription className="text-center font-medium text-lg text-gray-600 mb-4">
          Join us to unlock new features and connect with others!
        </CardDescription>
        <CardContent>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Enter your username"
              type="text"
              disabled={loading}
              required
            />
            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              type="email"
              disabled={loading}
              required
            />
            <Input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              type="password"
              disabled={loading}
              required
            />
            <Input
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm password"
              type="password"
              disabled={loading}
              required
            />
            <Button
              disabled={loading}
              type="submit"
              className=" disabled:bg-slate-700 bg-sky-600 text-white hover:bg-sky-700 transition w-full"
            >
              Register
            </Button>
          </form>
          <Separator />

          <div className="w-full flex items-center gap-3 mt-2">
            <Button
              disabled={loading}
              className=" disabled:bg-slate-700 flex w-full md:w-[48%] items-center justify-center bg-gray-800 text-white hover:bg-gray-700 transition py-2 rounded"
            >
              <FaGithub />
              <span className="ml-2">Register with GitHub</span>
            </Button>
            <Button
              disabled={loading}
              className=" disabled:bg-slate-700 flex w-full md:w-[48%] items-center justify-center bg-slate-400 text-white hover:bg-slate-500 transition py-2 rounded"
            >
              <FcGoogle />
              <span className="ml-2">Register with Google</span>
            </Button>
          </div>

          <div className="text-center mt-4 flex gap-1">
            <p>Already have an account?</p>
            <Link href="/login" className="text-sky-700 underline">
              login to my account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
