import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Section from "@/models/section";
export async function POST(req) {
    const { name, nameAr, description, catagory } = await req.json();
    try {
        await connectToDatabase();
         if (name) {
        const section = new Section({ name, nameAr, description, catagory });
        await section.save();
        return NextResponse.json(section);
    }
   
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function GET() {
    try {
        await connectToDatabase()
        const sections = await Section.find({}) 
        return NextResponse.json(sections)
    }
    catch (error) {
        return NextResponse.json({ error: error.message })
    }
}

export async function PATCH(req) {
    const data = await req.json()
    try {
        await connectToDatabase()
        const section = await Section.updateOne({ id: data.id }, { $set: data }, {new: true})
        return NextResponse.json({section , success : true})
    }
    catch (err) {
        return NextResponse.json({ error: err.message, success: false })
    }
}

export async function DELETE(req) {
    const data = await req.json()
    try {
        await connectToDatabase()
        const section = await Section.deleteOne({ id: data.id })
        return NextResponse.json({section , success : true})
    }
    catch (err) {
        return NextResponse.json({ error: err.message, success: false })
    }
}
