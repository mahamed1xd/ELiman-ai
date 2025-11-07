"use client"
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

export default function Quran() {
  const [surah, setSurah] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromAyah, setFromAyah] = useState("");
  const [toAyah, setToAyah] = useState("");
  const currentSurah = useRef(null);
  const router = useRouter()

  const toSurah = (Snum) => {
    if (parseInt(fromAyah) < parseInt(toAyah)) {
    router.push(`/quran/${Snum}/${fromAyah}/${toAyah}`)}
    else {
        toast.error("الرقم خاطئ", {
            duration: 2000
        })
    }
  };

  useEffect(() => {
    async function getSurah() {
      setLoading(true);
      const url = "https://api.alquran.cloud/v1/surah";
      try {
        const res = await fetch(url);
        const json = await res.json();
        setSurah(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getSurah();
  }, []);

  if (loading) return <h1>loading....</h1>;

  return (
    <div className="flex flex-row-reverse flex-wrap justify-center gap-6 p-6">
      {surah.map((s) => (
        <div key={s.number}>
          <div
            onClick={() => {
              currentSurah.current = s.number;
              document.getElementById(`${s.number}_modal`).showModal();
            }}
            className="transition duration-700 w-60 h-36 p-4 border-2 border-neutral bg-base-200 text-secondary rounded-2xl flex flex-col justify-center items-center cursor-pointer shadow-2xl hover:scale-107 hover:bg-neutral hover:text-neutral-content"
          >
            <button className="text-2xl font-semibold mb-2">{s.name}</button>
            <span className="badge badge-outline mt-2">
              {s.numberOfAyahs} أية
            </span>
            {s.revelationType == "Meccan" && (
              <span className="badge badge-outline mt-2">مكية</span>
            )}
            {s.revelationType == "Medinan" && (
              <span className="badge badge-outline mt-2">مدنية</span>
            )}
          </div>

          <dialog
            id={`${s.number}_modal`}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box w-11/12 max-w-5xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <br />
              <div className="flex flex-row-reverse items-baseline gap-1.5">
                <span>اختار من الأية</span>
                <input
                  type="number"
                  className="input w-14 h-10 text-primary input-neutral"
                  min="1"
                  max={s.numberOfAyahs}
                  onChange={(e) => setFromAyah(e.target.value)}
                />
                <span>إلى الأية</span>
                <input
                  type="number"
                  className="input w-14 h-10 text-primary input-neutral"
                  min="1"
                  max={s.numberOfAyahs}
                  onChange={(e) => setToAyah(e.target.value)}
                />
              </div>
              <form method="dialog">
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => toSurah(s.number)}
                  className="btn hover:bg-primary hover:text-primary-content duration-300"
                >
                  تم
                </button>
              </div>
              </form>
            </div>
          </dialog>
        </div>
      ))}
    </div>
  );
}
