import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb.js";
import User from "@/models/user";
import axios from "axios";

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
            image: data.image || "null"
        };

        await connectToDatabase();
        const newUser = new User(user);

        await newUser.save();
        const loginResponse = await axios.post('http://localhost:3000/api/login', {
            email: data.email,
            password: data.password
        });
        const dataLogin = loginResponse.data;
        return NextResponse.json({ dataLogin }, { status: 201 });

    
    } catch (error) {
        console.error("❌ Error in registration:", error);
        return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
}