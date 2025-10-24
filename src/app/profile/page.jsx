"use client";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import Skeleton from "@/components/skeleton";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      setUser(decoded);
    }
    setLoading(false);

  }, []);
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h1 className="text-center mt-10 text-2xl">صفحة الملف الشخصي</h1>
          <div dir="rtl" className="max-w-md mx-auto mt-6 p-6 bg-gray-100 rounded-lg shadow ">
            <p>اسم المستخدم: {user?.name}</p>
            <br />
            <p>البريد الإلكتروني: {user?.email}</p>
            <br />
            <p>الدور: {user?.role}</p>
          </div>
          </>
      )
      }



    </>
  );
}