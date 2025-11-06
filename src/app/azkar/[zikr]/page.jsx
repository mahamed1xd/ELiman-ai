"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function ZikrPage() {
  const param = useParams();
  const zikr = decodeURIComponent(param.zikr);
  const [azkar, setAzkar] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAzkars() {
      setLoading(true);
      try {
        const res = await fetch("/data/azkar.json");
        const data = await res.json();
        setAzkar(data[zikr] || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getAzkars();
  }, [zikr]);

  function handleCount(key) {
    setCounts(prev => {
      const newCount = (prev[key] ?? azkar[key].count) - 1;
      if (newCount <= 0) {
        document.querySelector(`#zikr-${key}`).classList.add("hidden");
        return prev;
      }
      return { ...prev, [key]: newCount };
    });
  }

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col">
      {azkar.map((zeekr, i) => (
        <div
          id={`zikr-${i}`}
          key={i}
          onClick={() => handleCount(i)}
          className="mx-auto my-5 cursor-pointer bg-base-200 text-2xl duration-500 flex flex-col items-center justify-center text-base-content p-4 m-4 border-2 border-neutral rounded shadow-2xl w-[85%]"
        >
          <p
          onClick={() => handleCount(i)} 
          className="text-2xl">{zeekr.content}</p>
          <br />
          <span
            className="cursor-pointer badge badge-outline badge-secondary"
            onClick={() => handleCount(i)}
          >
            {counts[i] ?? zeekr.count}
          </span>
        </div>
      ))}
    </div>
  );
}
