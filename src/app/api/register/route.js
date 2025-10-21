import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb.js";
import User from "@/models/user";

const secret = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        const data = await req.json();
        const user = {
            id: new Date().getTime().toString(),
            name: data.name,
            email: data.email,
            password: await bcrypt.hash(data.password, 10),
            role: data.role || 'user',
        };

        await connectToDatabase();
        const newUser = new User(user);
        
        await newUser.save();
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

    
    } catch (error) {
        console.error("❌ Error in registration:", error);
        return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
}