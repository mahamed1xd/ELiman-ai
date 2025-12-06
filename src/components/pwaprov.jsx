"use client";
import { useEffect, useState } from "react";

export default function PwaOnly({ children }) {
  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    const iosStandalone = window.navigator.standalone === true;

    if (standalone || iosStandalone) {
      setIsPwa(true);
    }
  }, []);

  if (!isPwa) return null; // ميظهرش في الموقع

  return (
    <>
      {children} 
    </>
  );
}
