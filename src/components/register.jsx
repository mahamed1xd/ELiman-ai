"use client"
import axios from "axios"
import { useState, useEffect } from "react"

export default function RegisterPage() {
    const [role, setRole] = useState("user");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log("Selected role:", role);
    }, [role]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/register", {
                name,
                email,
                password,
                role
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Registration failed");
        }
    };
    return (
        <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">إنشاء حساب</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="الاسم" className="border p-2" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="البريد الإلكتروني" className="border p-2" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" className="border p-2" />
        <select onChange={(e) => setRole(e.target.value)} name="role">
            <option value="user">مستخدم</option>
            <option value="admin">مشرف</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">إنشاء حساب</button>
      </form>
    </div>
    )
}

