"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loader from "./loader";

export default function LoginCheck({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // الصفحات المفتوحة بدون تسجيل
    const publicRoutes = ["/login", "/"];
    const token = localStorage.getItem("token");

    // لو مفيش توكن والمكان مش صفحة عامة → redirect
    if (!token && !publicRoutes.includes(path)) {
      router.replace("/login");
      return;
    }

    // لو وصل هنا يبقى إما عنده توكن أو في صفحة عامة
    setChecked(true);
  }, [path, router]);

  // طول ما لسه بيتحقق، متعرضش أي حاجة
  if (!checked) {
      return <div className="flex justify-center items-center m-auto"><Loader /> </div>;
  }

  return children;
}
