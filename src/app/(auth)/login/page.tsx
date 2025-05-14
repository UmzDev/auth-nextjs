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
    email: "",
    password: "",
  });
  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-950">
      <Card className="w-[80%] md:w-[480px] md:p-4 p-6 bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center font-bold text-2xl text-sky-800 border-b pb-2">
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardDescription className="text-center font-medium text-lg text-gray-600 mb-4">
          Join us to access exclusive features and stay connected!
        </CardDescription>
        <CardContent>
          <form className="flex flex-col gap-3">
            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              type="email"
              required
            />
            <Input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
              type="password"
              required
            />

            <Button
              type="submit"
              className="bg-sky-600 text-white hover:bg-sky-700 transition w-full"
            >
              Login
            </Button>
          </form>
          <Separator />

          <div className="w-full flex items-center gap-3 mt-2">
            <Button className="flex w-full md:w-[48%] items-center justify-center bg-gray-800 text-white hover:bg-gray-700 transition py-2 rounded">
              <FaGithub />
              <span className="ml-2">Login with GitHub</span>
            </Button>
            <Button className="flex w-full md:w-[48%] items-center justify-center bg-slate-400 text-white hover:bg-slate-500 transition py-2 rounded">
              <FcGoogle />
              <span className="ml-2">Login with Google</span>
            </Button>
          </div>

          <div className="text-center mt-4 flex gap-1">
            <p>D&apos;ont have an account?</p>
            <Link href="/register" className="text-sky-700 underline">
              Create a new account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
