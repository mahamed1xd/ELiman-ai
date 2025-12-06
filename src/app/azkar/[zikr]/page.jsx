"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/loader";

export default function ZikrPage() {
  const param = useParams();
  const zikr = decodeURIComponent(param.zikr);
  const [azkar, setAzkar] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const lastClickTime = useRef({}); // لتخزين آخر وقت ضغط لكل ذكر

  useEffect(() => {
    async function getAzkars() {
      setLoading(true);
      try {
        const res = await fetch("/data/azkar.json");
        const data = await res.json();
        const list = data[zikr] || [];
        setAzkar(list);

        const initialCounts = {};
        list.forEach((item, index) => {
          initialCounts[index] = item.count;
        });
        setCounts(initialCounts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getAzkars();
  }, [zikr]);

  function handleCount(key) {
    const now = Date.now();
    const last = lastClickTime.current[key] || 0;
    const cooldown = 500; // ← الفاصل بالمللي ثانية (هنا 0.8 ثانية)

    // لو لسه الضغط قريب من السابق، تجاهل الضغط
    if (now - last < cooldown) {
      return
    };
    lastClickTime.current[key] = now;

    setCounts((prev) => {
      const current = prev[key];
      if (current <= 1) {
        const el = document.querySelector(`#zikr-${key}`);
        if (el) {
          document.querySelector(`#button-${key}`).disabled = true
          el.classList.add(
            "lg:opacity-0",
            "lg:scale-0",
            "lg:-ml-44",
            "lg:duration-500"
          );
          setTimeout(() => el.classList.add("lg:hidden"), 470);
        }
        return { ...prev, [key]: 0 };
      }
      return { ...prev, [key]: current - 1 };
    });
  }

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col w-full">
      <div className="carousel rounded-box w-[85%] m-auto">
        {azkar.map((zeekr, i) => (
          <div
            key={i}
            id={`zikr-${i}`}
            className="carousel-item w-full transition-all duration-200"
          >
            <div
              className="mx-auto my-5 lg:my-32 cursor-pointer bg-base-200 text-2xl duration-500 flex flex-col items-center justify-between text-base-content m-4 border-2 border-neutral rounded-lg shadow-2xl"
            >
              <p className="text-center direction-rtl text-2xl p-6">
                {zeekr.content}
              </p>
              <button
                id={`button-${i}`}
                className="btn h-12 text-xl rounded-b-md active:text-[11px] active:border-neutral-content active:bg-neutral-content active:text-neutral duration-700 btn-neutral rounded-none w-full"
                onClick={() => handleCount(i)}
              >
                {counts[i] ?? zeekr.count}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
