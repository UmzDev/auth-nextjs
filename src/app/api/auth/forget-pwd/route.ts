import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import { Resend } from "resend";
import crypto from "crypto";
import linkValidToken from "@/email/linkValidToken";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User doesn't exist." },
        { status: 400 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    const resetUrl = `http://localhost:3000/auth/reset-password/${resetToken}`;

    await existingUser.save(); // Save changes to the user

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Younes Mazouz <emazouz@resend.dev>",
        to: email,
        subject: "Password Reset Request",
        react: linkValidToken(existingUser.name, resetUrl),
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { message: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Password reset link has been sent to your email." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
