"use client"
import axios from "axios"
import Loader from "@/components/loader"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { useLoading } from "@/context/loading";

export default function RegisterPage() {
    const [image, setImage] = useState('')
    const router = useRouter();
    const { setUser } = useAuth();
    const { loading, setLoading } = useLoading();
    const [role, setRole] = useState("user");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleImage = (e) => {
        const image = e.target.files[0];
        if (!image) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            console.log("✅ Base64:", base64);
            setImage(base64);

            // احفظها في localStorage لو عايز تحتفظ بيها مؤقتًا
            localStorage.setItem("profileImage", base64);
        };

        reader.readAsDataURL(image); // 🟢 دي لازم تكون برا
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log(image);

            const response = await axios.post("/api/register", {
                name,
                email,
                password,
                role,
                image
            });
            setLoading(false);
            console.log(response.data.dataLogin);

            setUser(response.data.dataLogin.user)
            localStorage.setItem("token", response.data.dataLogin.token);
            localStorage.setItem("role", response.data.dataLogin.user.role);
            localStorage.setItem("loggedIn", "true");
            router.push("/");



            toast.success(response.data.dataLogin.message, {
                duration: 2500,
            });
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Registration failed", {
                duration: 2500,
            });
            setLoading(false)
        }
    };
    return (
        <div className="p-10 max-w-md mx-auto">
            <h1 className="text-2xl mb-4 text-center">إنشاء حساب</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="mx-auto avatar">
                    <div className="w-24 rounded-full">
                        {image && <img src={image} />}
                    </div>
                </div>
        <input type="text" placeholder="الاسم" className="border p-2" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="البريد الإلكتروني" className="border p-2" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور" className="border p-2" />
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Pick an Image</legend>
                    <input type="file" onChange={handleImage} className="file-input w-full" />
                </fieldset>
                <select onChange={(e) => setRole(e.target.value)} name="role" defaultValue="Pick a text editor" className="select w-full">
                    <option disabled={true}>Pick a role</option>
                    <option value="user">مستخدم</option>
            <option value="admin">مشرف</option>
        </select>


                <button type="submit" disabled={loading} className="bg-neutral hover:bg-accent hover:text-accent-content duration-700 text-neutral-content p-2">{loading ? <Loader /> : "إنشاء حساب"}</button>
      </form>
    </div>
    )
}

