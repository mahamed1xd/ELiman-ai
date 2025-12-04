import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
    async function getUsers() {
    const DB = await connectToDatabase()
    const users = await User.find({})
    return users
    }
const users =  await getUsers()
    return NextResponse.json({users})
} 