import Course from "@/models/course";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";


export async function POST(request) {
    try {await connectToDatabase();}
    catch (error) {console.log("error in connecting to database");}
    const data = await request.json();
    console.log(data);
    
    const course = new Course({name: data.name, description: data.description ,  link : data.link , catagory: data.catagory, section: data.section});
    await course.save();
    return NextResponse.json({course , success : true});
}


export async function DELETE(req) {
    const data = await req.json()
    try {
        await connectToDatabase()
        const course = await Course.deleteOne({ id: data.id })
        return NextResponse.json({course , success : true})
    }
    catch (err) {
        return NextResponse.json({ error: err.message, success: false })
    }
}

export async function PATCH(req) {
    const data = await req.json()
    try {
        await connectToDatabase()
        const course = await Course.updateOne({ id: data.id }, { $set: data }, {new: true})
        return NextResponse.json({course , success : true})
    }
    catch (err) {
        return NextResponse.json({ error: err.message, success: false })
    }
}


export async function GET(req) {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    try {
        await connectToDatabase()
        if (id) {
            const course = await Course.find({id : id})
            return NextResponse.json({course , success : true})
        }
        const courses = await Course.find({}) 
        return NextResponse.json({courses , success : true})
    }
    catch (error) {
        return NextResponse.json({ error: error.message , success : false })
    }
}