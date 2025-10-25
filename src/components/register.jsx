"use client"
import axios from "axios"
import Loader from "@/components/loader"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
<<<<<<< HEAD
import { toast } from "sonner";
import { useLoading } from "@/context/loading";
=======
>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef

export default function RegisterPage() {
    const router = useRouter();
    const { setUser } = useAuth();
<<<<<<< HEAD
    const { loading, setLoading } = useLoading();
=======
>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef
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
<<<<<<< HEAD
            setLoading(false);
=======

>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef
            console.log(response.data.dataLogin);


            localStorage.setItem("token", response.data.dataLogin.token);
            localStorage.setItem("role", response.data.dataLogin.user.role);
            localStorage.setItem("loggedIn", "true");
            setUser({ name: response.data.dataLogin.user.name, role: response.data.dataLogin.user.role });
            router.push("/");



<<<<<<< HEAD
            toast.success(response.data.dataLogin.message, {
                duration: 2500,
            });
=======
            alert(response.data.dataLogin.message);
>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef
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
                <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white p-2">{loading ? <Loader /> : "إنشاء حساب"}</button>
      </form>
    </div>
    )
}

