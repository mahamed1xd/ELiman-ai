"use client";
import AdminGuard from "@/app/components/AdminGaurd";
import { useEffect, useState } from "react";
import Loader from "@/app/components/loader";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const getUsers = async () => {
      setloading(true)
      const res = await fetch('/api/admin/getUsers')
      const data = await res.json()
      console.log(data.users);
      setUsers(data.users)
      setloading(false)
    }
    getUsers()
  }, [])
  return (
    <AdminGuard>
      <div className="w-full h-full">
        {loading && <Loader />}
        {!loading && <div>
          {users.map((user, i) => {
            return (
              <>
                <p key={i}>{user.name}</p> <br />
              </>
            )
          })}
        </div>}
      </div>
    </AdminGuard>
  );
}