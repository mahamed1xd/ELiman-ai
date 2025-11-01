"use client";
import { useState, useEffect, createContext, useContext } from "react";

// إنشاء الـ context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🟢 استرجاع بيانات المستخدم من localStorage عند تحميل الصفحة
  useEffect(() => {
    const userImage = localStorage.getItem("profileImage")
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser({
        ...JSON.parse(savedUser),
        image: userImage, // الصورة Base64
      });
      
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
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
