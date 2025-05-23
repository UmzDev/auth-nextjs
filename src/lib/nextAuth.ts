import { type AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("User not found");
          }

          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return user; // Return the user object if authentication is successful
        } catch (error) {
          console.error("Authorization error:", error); // Log the error message
          return null; // Return null if any error occurs
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        await connectToDatabase();
        try {
          const existingUser = await User.findOne({ email: profile?.email });
          if (!existingUser) {
            await User.create({
              name: profile?.name || "Unnamed",
              email: profile?.email,
            });
          }
        } catch (error) {
          console.error("Error during user sign-in:", error);
          throw new Error("User sign-in failed.");
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          name: token.name,
          image: token.picture,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
