import NextAuth from "next-auth";
// import User from "@/models/user";
// import connectToDatabase from "@/lib/mongodb";
// import bcrypt from "bcryptjs";
// import CredentialsProvider from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import { authOptions } from "@/lib/nextAuth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
