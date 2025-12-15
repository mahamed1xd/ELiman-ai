"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./loader"; 

export default function AdminGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = localStorage.getItem("token");
  const isAdmin = sessionStorage.getItem('isAdmin')

  useEffect(() => {
    const checkAdmin = async () => {
      if (!token) {
        router.push("/login");
        setLoading(false)
        return;
      }
      if (isAdmin) {
        setLoading(false)
        return;
      }
      try {
        const res = await fetch("/api/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();


        if (data.user.role !== "admin") {
          router.push("/notAllowed"); // صفحة رفض الدخول
          setLoading(false)
        } else {
          sessionStorage.setItem('isAdmin', true)
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false)
      }
      finally {

      }
    };

    checkAdmin();
  }, []);

  if (loading) return <div className="min-h-[90vh] w-full flex justify-center items-center"><Loader /></div>;

  return children;
}
