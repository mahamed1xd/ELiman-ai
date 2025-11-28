"use client";

import { useEffect, useState } from "react";

export default function Radio() {
  const [radios, setRadios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://data-rosy.vercel.app/radio.json");

        if (!res.ok) {
          throw new Error("خطأ في تحميل البيانات");
        }

        const data = await res.json();
        setRadios(data.radios || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-primary font-[ar2] text-2xl text-center mb-3">
        إذاعات القرآن الكريم
      </h1>

      {loading && (
        <p className="text-center text-base-content">جاري التحميل...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {radios
          .filter((radio) => radio.id === "19")
          .map((radio) => (
            <div
              key={radio.id}
              className="flex flex-col items-center border border-base-200 rounded-lg p-3 hover:bg-base-200 duration-300 hover:text-primary-content"
            >
              <img
                src={radio.image}
                alt={radio.name}
                className="w-full rounded-md mb-2"
              />

              <h2 className="text-lg font-bold mb-1">{radio.name}</h2>

              <audio
                controls
                src={radio.url}
                className="w-full mt-2"
              ></audio>
            </div>
          ))}
      </div>
    </div>
  );
}