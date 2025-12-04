"use client";
import AdminGuard from "@/components/AdminGaurd";
import connectToDatabase from "@/lib/mongodb";
// import User from "@/models/user";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  // useEffect(() => {
  //   console.log("hello conneting to database");

  //   const fetchData = async () => {
  //     try {
  //       connectToDatabase();
  //       console.log("connected to database");
  //       const users = await User.find({});
  //       console.log(users);
  //     } catch (error) {
  //       console.log("error connecting to database");
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, [])
  return (
    <AdminGuard>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">لوحة تحكم المسؤول</h1>
        <p>مرحبًا بك في لوحة تحكم المسؤول. هنا يمكنك إدارة التطبيق.</p>
      </div>
    </AdminGuard>
  );
}