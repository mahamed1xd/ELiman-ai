import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Catagory from "@/models/catagory";
export async function POST(req) {
    const { name, nameAr, description } = await req.json();
    try {
        await connectToDatabase();
         if (name) {
        const catagory = new Catagory({ name, nameAr, description });
        await catagory.save();
        return NextResponse.json(catagory);
    }
   
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function GET() {
    try {
        await connectToDatabase()
        const catagories = await Catagory.find({}) 
        return NextResponse.json(catagories)
    }
    catch (error) {
        return NextResponse.json({ error: error.message })
    }
}

export async function PATCH(req) {
    const data = await req.json()
    try {
        await connectToDatabase()
        const catagory = await Catagory.updateOne({ id: data.id }, { $set: data }, {new: true})
        return NextResponse.json({catagory , success : true})
    }
    catch (err) {
        return NextResponse.json({ error: err.message, success: false })
    }
}

export async function DELETE(req) {
    const data = await req.json()
    try {
        await connectToDatabase()
        const catagory = await Catagory.deleteOne({ id: data.id })
        return NextResponse.json({catagory , success : true})
    }
    catch (err) {
        return NextResponse.json({ error: err.message, success: false })
    }
}


