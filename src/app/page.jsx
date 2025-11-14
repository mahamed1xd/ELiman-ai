"use client";
import "@/css/main.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lenis from "lenis";
import AOS from "aos";

export default function HomePage() {

  useEffect(() => {
    AOS.init();
  }, []);

  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  // Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smooth: true,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Check login
  useEffect(() => {
    const logged = localStorage.getItem("loggedIn");
    setLoggedIn(Boolean(logged));
  }, []);

  // 🔥 component reusable
  const SectionCard = ({ title, desc, link, img, efect }) => (
    <div data-aos={efect || "fade-up"} className="sticky top-0 h-screen grid font-[ar3] text-right direction-rtl place-content-center">
      <div className="group card min-w-[100%] h-[100%] m-auto hover:scale-[1.02] transition-all duration-300">
        <figure>
          <img
            className="brightness-50 duration-300 group-hover:brightness-100"
            src={img}
            alt="img" />
        </figure>
        <div className="card-body bg-base-100 w-full p-10 rounded-2xl shadow-xl shadow-base-300/30 ">
          <h1 className="card-title font-[ar3] p-3 text-2xl text-secondary">{title}</h1>
        <p className="font-[ar3] p-3 text-md text-base-content">{desc}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary mt-4 text-base" onClick={() => router.push(link)}>
              المزيد
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="w-full">
      <div className="wrapper">
        {/* Hero */}
        <div id="header" className="p-0 hero h-screen w-full sticky top-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center mb-28">
            <div className="max-w-md font-[ar2]">
              <h1 className="mb-5 text-5xl md:text-7xl font-black font-[ar1]">
                السلام عليكم
              </h1>

              <p className="mb-5 leading-8">
                موقع بصيرة… خطوة نحو فهمٍ أعمق وإيمانٍ أصفى.
                مكان بيجمع العلم والإيمان، ويكون صدقة جارية لكل واحد بيدور على الهُدى.
              </p>

              {!loggedIn && (
                <button className="btn btn-primary" onClick={() => router.push("/login")}>
                  ابدأ الآن
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sections */}
        <section
          id="sec2"
          className="bg-base-100 w-full items-center min-h-screen sticky top-0"
        >
          <div className="grid grid-cols-1 px-8 w-full gap-4 py-10">
            <SectionCard
              title="علوم القرآن"
              desc="كل ما يتعلق بعلوم القرآن في مكان واحد."
              link="/quran"
              img="https://www.dar-alifta.org/images/Fatwa/raergeragrtgt.jpeg"
              efect="fade-left"
            />
            <SectionCard
              title="الأذكار"
              desc="مجموعة منظمة من الأذكار اليومية."
              link="/azkar"
              img="https://www.dar-alifta.org/images/Fatwa/raergeragrtgt.jpeg"
              efect="fade-right"
            />
            <SectionCard
              title="الذكاء الإيماني"
              desc="مساعدك الذكي موجود معاك وقت ما تحتاجه."
              link="/ai/chat"
              img="https://www.dar-alifta.org/images/Fatwa/raergeragrtgt.jpeg"
              efect="fade-down"
            />

          </div>
        </section>
      </div>
    </main>
  );
}
