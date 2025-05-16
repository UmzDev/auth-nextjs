import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import { Resend } from "resend";
import WelcomeUser from "@/email/WelcomeUser";

export async function POST(req: Request) {
  const { name, email, password, confirmPassword } = await req.json();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: " All fields are required" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }
  if (confirmPassword !== password) {
    return NextResponse.json(
      { message: "Password do not match" },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 character long" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    await newUser.save();
    try {
      console.log("process.env.RESEND_API_KEY :", process.env.RESEND_API_KEY);
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Younes Mazouz <emazouz@resend.dev>",
        to: email,
        subject: "Hello World",
        react: WelcomeUser(name),
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
