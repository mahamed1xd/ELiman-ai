"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import RegisterPage from "@/components/register";
import { useAuth } from "@/context/authContext";
<<<<<<< HEAD
import { toast } from "sonner";
import Loader from "@/components/loader";
import { useLoading } from "@/context/loading";

export default function LoginPage() {
  const { loading, setLoading } = useLoading();
  const router = useRouter();
=======


export default function LoginPage() {
>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef
  const { setUser } = useAuth();
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
<<<<<<< HEAD
      console.log(res.data.user);

      setUser({ name: res.data.user.name, role: res.data.user.role, email: res.data.user.email });
      toast.success(`تم تسجيل الدخول بنجاح (${res.data.user.role}) ✅`, {
        duration: 2500,
      });
      router.push("/")
=======
      setUser({ name: res.data.user.name, role: res.data.user.role });
      setMessage(`تم تسجيل الدخول بنجاح (${res.data.user.role}) ✅`);
      console.log(res);
>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef
      
    } catch (err) {
      setMessage(err.response?.data?.error || "خطأ في تسجيل الدخول");
      toast.error(err.response?.data?.error || "خطأ في تسجيل الدخول", {
        duration: 2500,
      });
    }
  }

  return (
    <>
<<<<<<< HEAD
      <div className="p-10 mt-6 max-w-md mx-auto bg-gray-100 rounded-lg shadow">
        <h1 className="text-2xl mb-4 text-center">تسجيل الدخول</h1>
        <form className="flex flex-col gap-3">
=======

      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center"> <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">تسجيل الدخول</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef
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
          <button onClick={handleLogin} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-2/5 rounded">{loading ? <Loader /> : 'دخول'}</button>
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


<<<<<<< HEAD
=======
        </div></div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">  <RegisterPage /></div>
      </div>



>>>>>>> 4755500f58d06b2fabcdb5246c1e3bdff89a35ef
    </>

  );



}
