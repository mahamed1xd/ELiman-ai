"use client"
import axios from "axios"
import Loader from "@/components/loader"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { useLoading } from "@/context/loading";

export default function RegisterPage() {
    const router = useRouter();
    const { setUser } = useAuth();
    const { loading, setLoading } = useLoading();
    const [role, setRole] = useState("user");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/register", {
                name,
                email,
                password,
                role
            });
            setLoading(false);
            console.log(response.data.dataLogin);


            localStorage.setItem("token", response.data.dataLogin.token);
            localStorage.setItem("role", response.data.dataLogin.user.role);
            localStorage.setItem("loggedIn", "true");
            setUser({ name: response.data.dataLogin.user.name, role: response.data.dataLogin.user.role });
            router.push("/");



            toast.success(response.data.dataLogin.message, {
                duration: 2500,
            });
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Registration failed", {
                duration: 2500,
            });
        }
    };
    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-2xl mb-4 text-center">إنشاء حساب</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="الاسم" className="border p-2" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="البريد الإلكتروني" className="border p-2" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" className="border p-2" />
        <select onChange={(e) => setRole(e.target.value)} name="role">
            <option value="user">مستخدم</option>
            <option value="admin">مشرف</option>
        </select>
                <button type="submit" disabled={loading} className="bg-neutral hover:bg-accent hover:text-accent-content duration-700 text-neutral-content p-2">{loading ? <Loader /> : "إنشاء حساب"}</button>
      </form>
    </div>
    )
}

