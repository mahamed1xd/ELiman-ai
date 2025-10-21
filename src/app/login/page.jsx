"use client";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      setMessage(`تم تسجيل الدخول بنجاح (${res.data.user.role}) ✅`);
      console.log(res);
      
    } catch (err) {
      setMessage(err.response?.data?.error || "خطأ في تسجيل الدخول");
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">تسجيل الدخول</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
        <button className="bg-blue-600 text-white p-2 rounded">دخول</button>

      </form>
      <p className="mt-3">{message}</p>

    </div>
  );



}
