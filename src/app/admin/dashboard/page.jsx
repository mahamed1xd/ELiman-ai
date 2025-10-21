"use client";
import AdminGuard from "@/components/AdminGaurd";

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">لوحة تحكم المسؤول</h1>
        <p>مرحبًا بك في لوحة تحكم المسؤول. هنا يمكنك إدارة التطبيق.</p>
      </div>
    </AdminGuard>
  );
}