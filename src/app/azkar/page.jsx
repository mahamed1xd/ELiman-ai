"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ استخدم useRouter هنا

export default function Azkar() {
  const [azkar, setAzkar] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ جهّز الراوتر

  // دالة التنقل
  function redirect(category) {
    // هنا ممكن تعمل أي حاجة قبل التنقل (زي حفظ الاسم في localStorage)
    router.push(`/azkar/${encodeURIComponent(category)}`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/data/azkar.json");
        setAzkar(res.data);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-primary">
        جاري تحميل الأذكار...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {Object.keys(azkar).map((category, i) => (
        <div
          key={i}
          onClick={() => redirect(category)} // ✅ خليها function
          className="transition duration-700 w-60 h-36 p-4 border-2 border-primary bg-base-200 text-primary rounded-2xl flex flex-col justify-center items-center cursor-pointer shadow-2xl hover:scale-105 hover:bg-primary hover:text-base-100"
        >
          <button className="text-2xl font-semibold mb-2">{category}</button>
          <span className="badge badge-outline mt-2">
            {azkar[category]?.length || 0} ذكر
          </span>
        </div>
      ))}
    </div>
  );
}
