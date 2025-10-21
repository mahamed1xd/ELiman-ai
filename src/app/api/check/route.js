import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
    const secret = process.env.JWT_SECRET;
    const auth = req.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = auth.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secret);
        return NextResponse.json({ user: decoded }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}