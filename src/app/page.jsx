"use client";
import "@/css/main.css";

import { useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuran, faHeart, faBrain } from "@fortawesome/free-solid-svg-icons";
import Aos from "aos";

// 🔥 Component: Section Card (Optimized)
const SectionCard = memo(function SectionCard({ title, desc, link, icon, eff }) {
  const router = useRouter();

  return (
    <div
      className="w-full h-96 grid font-[ar3] text-right direction-rtl place-content-center"
      data-aos={eff || "fade-in"} // استخدام effect لكل كارت
    >
      <div className="card w-[100%] mx-auto hover:scale-[1.02] duration-300 transition-all bg-base-100 border-2 border-primary rounded-xl shadow-xl shadow-base-300/30">
        <span className="w-20 h-20 flex items-center mx-auto mt-2 justify-center rounded-full bg-primary text-primary-content p-4">
          <FontAwesomeIcon icon={icon} size="2xl" />
        </span>
        <div className="card-body items-center text-center">
          <h1 className="card-title font-[ar3] p-3 text-2xl text-secondary">{title}</h1>
          <p className="font-[ar3] p-3 text-base text-base-content">{desc}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary mt-4 text-base" onClick={() => router.push(link)}>
              المزيد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function HomePage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  // -------------------------------------
  // 🔐 Check Login & Init AOS
  // -------------------------------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedIn(Boolean(localStorage.getItem("loggedIn")));
      Aos.init({
        duration: 900,
        easing: 'ease-in-sine',
        offset: 100,
        disable: false,
        mirror: false,
        once: true,
      });
    }
  }, []);

  return (
    <main className="w-full">
        {/* Hero */}
        <div id="header" className="hero h-screen w-full">
          <div className="hero-content flex flex-col justify-center items-center text-neutral-content text-center h-full">
            <div className="max-w-md font-[ar2]">
              <h1 className="mb-5 text-5xl md:text-7xl font-black font-[ar1]" data-aos="zoom-in">السلام عليكم</h1>
              <p className="mb-5 leading-8" data-aos="zoom-in">
                موقع بصيرة… خطوة نحو فهمٍ أعمق وإيمانٍ أصفى.
                <br />
                قال الله تعالى:
                <br />
                <span className="font-bold" data-aos="zoom-in">
                  {`{ فَمَن يُرِدِ ٱللَّهُ أَن يَهْدِيَهُ يَشْرَحْ صَدْرَهُ لِلْإِسْلَـٰمِ }`}
                </span>
                <br />
                <span className="text-xs" data-aos="zoom-in">(سورة الأنعام: 125)</span>
              </p>

              {!loggedIn && (
                <button
                  className="btn btn-primary"
                  onClick={() => router.push("/login")}
                >
                  ابدأ الآن
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sections */}
        <section id="sec2" className="bg-base-100 w-full min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 w-full gap-6 py-10">
            <SectionCard
              title="علوم القرآن"
              desc="كل ما يتعلق بعلوم القرآن في مكان واحد."
              link="/quran"
            icon={faQuran}
            />
            <SectionCard
              title="الأذكار"
              desc="مجموعة منظمة من الأذكار اليومية."
              link="/azkar"
            icon={faHeart}
            />
            <SectionCard
              title="الذكاء الإيماني"
              desc="مساعدك الذكي موجود معاك وقت ما تحتاجه."
              link="/ai/chat"
            icon={faBrain}
            />
          </div>
      </section>
    </main>
  );
}
