"use client";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PasswordResetSuccess: NextPage = ({ params }: any) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Password Reset Link Sent</title>
        <meta
          name="description"
          content="Password reset link has been sent to your email"
        />
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Password Reset Link Sent
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="flex items-center mb-4 text-sm text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p>
              We&apos;ve sent a password reset link to{" "}
              <span className="font-medium text-blue-600">
                {params.email || "your email"}
              </span>
              .
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            If you don&apos;t see the email in your inbox, please check your
            spam folder.
          </p>

          <div className="mt-6">
            <Link
              href="/auth/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
