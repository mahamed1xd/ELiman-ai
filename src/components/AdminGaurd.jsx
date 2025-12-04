"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JWT from "jsonwebtoken"

export default function AdminGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = localStorage.getItem("token");
  console.log(JWT.decode(token));

  useEffect(() => {
    const checkAdmin = async () => {
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log(data.user);


        if (data.user.role !== "admin") {
          router.push("/notAllowed"); // صفحة رفض الدخول
          setLoading(false)
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);

      }
      finally {

      }
    };

    checkAdmin();
  }, []);

  if (loading) return <p className="text-center mt-10">جاري التحقق...</p>;

  return children;
}
