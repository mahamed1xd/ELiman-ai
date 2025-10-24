"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function RegisterPage() {
    const router = useRouter();
    const { setUser } = useAuth();
    const [role, setRole] = useState("user");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/register", {
                name,
                email,
                password,
                role
            });

            console.log(response.data.dataLogin);


            localStorage.setItem("token", response.data.dataLogin.token);
            localStorage.setItem("role", response.data.dataLogin.user.role);
            localStorage.setItem("loggedIn", "true");
            setUser({ name: response.data.dataLogin.user.name, role: response.data.dataLogin.user.role });
            router.push("/");



            alert(response.data.dataLogin.message);
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

