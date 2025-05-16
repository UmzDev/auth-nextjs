import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
// import { Resend } from "resend";
import crypto from "crypto";
// import ResetPasswordEmail from "@/email/resetPasswordEmail";

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    await connectToDatabase();

    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    const existingUser = await User.findOne({
      resetToken: hashToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User doesn't exist." },
        { status: 400 }
      );
    }

    return NextResponse.json(existingUser, { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
