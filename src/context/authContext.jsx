"use client";
import { useState, useEffect, createContext, useContext } from "react";
import jwt from 'jsonwebtoken';
import localforage from "localforage"
import storage from "@/lib/storage";

// إنشاء الـ context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🟢 استرجاع بيانات المستخدم من localStorage عند تحميل الصفحة
  useEffect(() => {
    const token = localStorage.getItem("token");
    let user = jwt.decode(token);

    if (user) {
      setUser(user);
      if (!user.image) {
        user.image = localStorage.getItem('image') || localStorage.getItem('profileImage')
      }
    }
  }, []);

  // 🟡 حفظ بيانات المستخدم تلقائيًا عند أي تغيير
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔴 دالة لتسجيل الخروج
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem('image')
    await storage.clear()
    sessionStorage.clear()
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🧩 hook بسيط لاستخدام السياق بسهولة
export function useAuth() {
  return useContext(AuthContext);
}
