import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { Resend } from "resend"; // Uncommented Resend import
import ResetEmailSuccess from "@/email/ResetEmailSuccess";

export async function POST(req: Request) {
  const { password, email } = await req.json();

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User doesn't exist." },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    existingUser.password = hashedPassword;
    existingUser.resetToken = undefined;
    existingUser.resetTokenExpiry = undefined;

    await existingUser.save();

    // Send confirmation email
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Younes Mazouz <emazouz@resend.dev>",
        to: email,
        subject: "Your Password Has Been Changed",
        react: ResetEmailSuccess(existingUser.name), // Adjusted to use the user's name
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }

    return NextResponse.json(
      { message: "Your password has been successfully reset." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
