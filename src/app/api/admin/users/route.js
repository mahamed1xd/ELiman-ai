import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";


export async function GET() {
    async function getUsers() {
    const DB = await connectToDatabase()
    const users = await User.find({})
    return users
    }
const users =  await getUsers()
    return NextResponse.json({users})
} 

export async function DELETE(request) {
    const { id } = await request.json()
    const DB = await connectToDatabase()
    const user = await User.deleteOne({ id: id })
    if (!user) {
        return NextResponse.json({message: "لم يتم العثور على المستخدم",user ,success: false })
    }
    return NextResponse.json({message: "تم حذف المستخدم بنجاح",user ,success: true })
}

export async function PATCH(request) {
    const data = await request.json()
    const DB = await connectToDatabase()
    console.log(data);
        const user = await User.findOne({ id: data.id })
        if (!user) {
            return NextResponse.json({message: "لم يتم العثور على المستخدم",user ,success: false })
        }
        const isMatch = await bcrypt.compare(data.pastPassword, user.password)
        if (!isMatch) {
            return NextResponse.json({message: "كلمة المرور غير صحيحة",user ,success: false })
        }
    const Uuser = await User.updateOne({ id: data.id }, { $set: { name: data.name, email: data.email, role: data.role, password: data.password} }, {new: true})
    if (!Uuser) {
        return NextResponse.json({message: "لم يتم العثور على المستخدم",Uuser ,success: false })
    }
    return NextResponse.json({message: "تم تعديل المستخدم المستخدم بنجاح",Uuser ,success: true })
}
