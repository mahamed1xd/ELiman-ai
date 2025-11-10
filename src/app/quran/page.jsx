"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { toast } from "sonner";
import Loader from "@/components/loader";

export default function Quran() {
  const [surah, setSurah] = useState([]);
  const [ayat, setAyat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingA, setLoadingA] = useState(false);
  const [fromAyah, setFromAyah] = useState("");
  const [toAyah, setToAyah] = useState("");
  const [selectedSurah, setSelectedSurah] = useState(null);
  const cache = useRef({});

  // تحميل السور مرة واحدة فقط (مع localStorage)
  useEffect(() => {
    const cached = localStorage.getItem("surahList");
    if (cached) {
      setSurah(JSON.parse(cached));
      setLoading(false);
      return;
    }

    async function getSurah() {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah");
        const json = await res.json();
        setSurah(json.data);
        localStorage.setItem("surahList", JSON.stringify(json.data));
      } catch (err) {
        console.error(err);
        toast.error("حدث خطأ أثناء تحميل السور");
      } finally {
        setLoading(false);
      }
    }
    getSurah();
  }, []);

  // تحميل آيات السورة مع كاش داخلي
  const getAyat = async (num) => {
    if (cache.current[num]) {
      setAyat(cache.current[num]);
      return;
    }

    setLoadingA(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}`);
      const json = await res.json();
      cache.current[num] = json.data.ayahs;
      setAyat(json.data.ayahs);
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء تحميل الآيات");
    } finally {
      setLoadingA(false);
    }
  };

  // تقسيم الآيات
  const splitAyat = () => {
    const from = parseInt(fromAyah);
    const to = parseInt(toAyah);

    if (isNaN(from) || isNaN(to) || from < 1 || to < from) {
      toast.error("❌ الأرقام غير صحيحة");
      return;
    }

    setAyat((prev) => prev.slice(from - 1, to));
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-row-reverse flex-wrap justify-center gap-6 p-6">
      {surah.map((s) => (
        <div key={s.number}>
          <div
            onClick={() => {
              setSelectedSurah(s);
              getAyat(s.number);
              document.getElementById("quran_modal").showModal();
            }}
            className="transition duration-500 w-60 h-36 p-4 border-2 border-neutral bg-base-200 text-secondary rounded-2xl flex flex-col justify-center items-center cursor-pointer shadow-2xl hover:scale-105 hover:bg-neutral hover:text-neutral-content"
          >
            <button className="text-2xl font-semibold mb-2">{s.name}</button>
            <span className="badge badge-outline mt-2">{s.numberOfAyahs} آية</span>
            <span className="badge badge-outline mt-2">
              {s.revelationType === "Meccan" ? "مكية" : "مدنية"}
            </span>
          </div>
        </div>
      ))}

      {/* مودال واحد فقط */}
      <dialog id="quran_modal" className="modal modal-bottom p-4 sm:modal-middle">
        {selectedSurah && (
          <div className="modal-box max-w-full">
            <form method="dialog" className="sticky top-0">
              <button className="btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
            </form>

            <h2 className="text-center font-bold text-xl mb-2">{selectedSurah.name}</h2>

            <div className="flex flex-col md:flex-row-reverse items-baseline gap-2 justify-center">
              <div className="flex flex-row-reverse gap-2 items-baseline">
              <span>اختار من الآية</span>
              <input
                type="number"
                className="input w-16 h-10 text-primary input-neutral"
                min="1"
                max={selectedSurah.numberOfAyahs}
                value={fromAyah}
                onChange={(e) => setFromAyah(e.target.value)}
              />
              <span>إلى</span>
              <input
                type="number"
                className="input w-16 h-10 text-primary input-neutral"
                min="1"
                max={selectedSurah.numberOfAyahs}
                value={toAyah}
                onChange={(e) => setToAyah(e.target.value)}
              />
              </div>
              <button
                type="button"
                onClick={splitAyat}
                className="btn hover:bg-primary hover:text-primary-content active:bg-primary active:text-primary-content duration-500"
              >
                تم
              </button>
            </div>

            <br />

            {loadingA ? (
              <h1 className="text-center direction-rtl">جاري التحميل...</h1>
            ) : (
              <Suspense fallback={<Loader />}>
                <div dir="rtl" className="p-4 leading-loose text-lg md:text-2xl font-['quran']">
                  {selectedSurah.number !== 9 && (
                    <h1 className="text-center text-lg md:text-2xl font-['quran'] mb-4">
                      بسم الله الرحمن الرحيم
                    </h1>
                  )}
                  {ayat.map((ayah) => (
                    <span key={ayah.number} className="inline">
                      {ayah.text}
                      <span className="text-primary text-sm font-['quran']">
                        {" "}
                        ({ayah.numberInSurah}){" "}
                      </span>
                    </span>
                  ))}
                </div>
              </Suspense>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
