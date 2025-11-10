import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

const secret = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        const { name, email, password, role, image } = await req.json();

        // وصلنا للداتا بيس
        await connectToDatabase();

        // اتأكد إن الايميل مش موجود قبل التسجيل
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "المستخدم موجود بالفعل" }, { status: 400 });
        }

        // عمل hash للباسورد
        const hashedPassword = await bcrypt.hash(password, 10);

        // حفظ المستخدم الجديد
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
            image: image || "null",
        });

        await newUser.save();

        // login داخلي بعد التسجيل
        const token = jwt.sign(
            {
                name: newUser.name,
                id: newUser._id,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image,
                createdAt: newUser.createdAt,
            },
            secret,
            { expiresIn: "1d" }
        );

        return NextResponse.json({
            message: "تم التسجيل وتسجيل الدخول بنجاح ✅",
            token,
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image,
            },
        }, { status: 201 });

    } catch (error) {
        console.error("❌ Error in registration:", error);
        return NextResponse.json({ error: error.message || "فشل التسجيل" }, { status: 500 });
    }
}
