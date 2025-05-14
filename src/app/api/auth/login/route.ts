// import ConnectToDatabase from "@/utils/mongodb";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";
// import userModel from "../../../../../models/userModel";

// export default async function POST(req: NextRequest) {
//   const { username, email, password, confirmPassword } = await req.json();

//   const isValidEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
//     return emailRegex.test(email);
//   };

//   if (!username || !email || !password || !confirmPassword) {
//     return NextResponse.json(
//       { message: "All fields are required." },
//       { status: 400 }
//     );
//   }

//   if (!isValidEmail(email)) {
//     return NextResponse.json(
//       { message: "Invalid email format." },
//       { status: 400 }
//     );
//   }

//   if (password !== confirmPassword) {
//     return NextResponse.json(
//       { message: "Passwords do not match." },
//       { status: 400 }
//     );
//   }

//   if (password.length < 6) {
//     return NextResponse.json(
//       { message: "Password must be at least 6 character long" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Connect to MongoDB (optional, depending on your logic)
//     ConnectToDatabase();

//     // Hash the password (you can also add your database logic here)

//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User already exist" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await userModel.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     return NextResponse.json(
//       { message: "User registered successfully." },
//       { status: 201 }
//     );
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Failed registering ", err },
//       { status: 500 }
//     );
//   }
// }
