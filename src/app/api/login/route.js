import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

const secret = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    console.log("📩 Request received");

    const { email, password } = await req.json();
    console.log("📧 Email:", email);

    const db = await connectToDatabase();
    console.log("✅ Connected to DB");

    const user = await User.findOne({ email });
    console.log("👤 User found:", user);

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log("🔑 Password valid:", passwordIsValid);

    if (!passwordIsValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    console.log(user);
    
    const Uimage = user.image; 
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      secret,
    );

    console.log("✅ Token created");

    return NextResponse.json({ message: "تم تسجيل الدخول بنجاح", token, Uimage, user }, { status: 200 });
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
