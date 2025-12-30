"use client";
import AdminGuard from "@/components/AdminGaurd";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import storage from "@/lib/storage";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([])
  const [loading, setloading] = useState(false)
  const storedUsers = storage.getItem('users')


  useEffect(() => {
    const clearOnClose = () => {
      storage.removeItem("users");
    };

    window.addEventListener("beforeunload", clearOnClose);

    return () => {
      window.removeEventListener("beforeunload", clearOnClose);
    };
  }, []);



  useEffect(() => {
    if (!storedUsers) {
    const getUsers = async () => {
      setloading(true)
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      console.log(data.users);
      setUsers(data.users)
      await storage.setItem('users', data.users)
      setloading(false)
    }
    getUsers()
    } else {
      setUsers(storedUsers)
    }
  }, [])

  return (
    <AdminGuard>
      <div className="w-full h-full">
        <p>سيتم وضع الاحصائيات قريبا</p>
      </div>
    </AdminGuard>
  );
}