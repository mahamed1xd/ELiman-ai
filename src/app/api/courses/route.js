import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Course from "@/models/course";
export async function GET(req)  {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log(id);
    try {
        await connectToDatabase();
        if (id == null) {
            const course = await Course.find({})
            console.log(course);
            return NextResponse.json(course);
        } 
        const course = await Course.find({id : id});

        if (course == null || course == []) {            
            return NextResponse.json({ error: "Course not found" });
        }
        return NextResponse.json(course);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}