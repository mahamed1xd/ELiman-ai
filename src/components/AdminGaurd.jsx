"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.get("/api/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.data.user.role !== "admin") {
          router.push("/notAllowed"); // صفحة رفض الدخول
        } else {
          setLoading(false);
        }
      } catch (err) {
        router.push("/login");
      }
    };

    checkAdmin();
  }, []);

  if (loading) return <p className="text-center mt-10">جاري التحقق...</p>;

  return children;
}
