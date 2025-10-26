"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import RegisterPage from "@/components/register";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import Loader from "@/components/loader";
import { useLoading } from "@/context/loading";

export default function LoginPage() {
  const { loading, setLoading } = useLoading();
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/login", { email, password });
      setLoading(false);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("loggedIn", "true");

      console.log(res.data.user);
      await setUser({ name: res.data.user.name, role: res.data.user.role, email: res.data.user.email, image: res.data.image });
      console.log(user);
      console.log(res.data.user.image);
      localStorage.setItem("user", { name: res.data.user.name, role: res.data.user.role, email: res.data.user.email, image: res.data.user.image || 'dgdgd' })


      toast.success(`تم تسجيل الدخول بنجاح (${res.data.user.role}) ✅`, {
        duration: 2500,
      });
      router.push("/")
      
    } catch (err) {
      toast.error(err.response?.data?.error || "خطأ في تسجيل الدخول", {
        duration: 2500,
      });
    }
  }

  return (
    <>
      <div className="p-10 lg:w-[40%] max-w-md mx-auto bg-base-100 rounded-lg duration-700  shadow-2xl hover:shadow-neutral shadow-base-300">
        <h1 className="text-2xl mb-4 text-center">تسجيل الدخول</h1>
        <form className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          />

        </form>
        <div className="mt-2 flex justify-evenly">
          <button onClick={handleLogin} disabled={loading} className="bg-neutral hover:bg-accent duration-700 text-neutral-content hover:text-accent-content p-2 w-2/5 rounded">{loading ? <Loader /> : 'دخول'}</button>
          <button className="btn w-2/5" onClick={() => document.getElementById('my_modal_5').showModal()}>انشاء حساب</button>
        </div>

      </div>


      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <RegisterPage />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>


    </>

  );



}
