"use client";
import AdminGuard from "@/components/AdminGaurd";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([])
  const [loading, setloading] = useState(false)
  const storedUsers = sessionStorage.getItem('users')

  useEffect(() => {
    if (!storedUsers) {
    const getUsers = async () => {
      setloading(true)
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      console.log(data.users);
      setUsers(data.users)
      sessionStorage.setItem('users', JSON.stringify(data.users))
      setloading(false)
    }
    getUsers()
    } else {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  return (
    <AdminGuard>
      <div className="w-full h-full">

      </div>
    </AdminGuard>
  );
}