"use client";
import { toast } from "sonner";
import '@/css/main.css'
import { useEffect, useState } from "react";

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    function check() {
      const logged = localStorage.getItem('loggedIn')
      if (logged) setLoggedIn(true)
    }
    check()
  }, [])

  return (
    <>

      <div
        id="header"
        className="p-0 hero min-h-screen"
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center mb-28">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl md:text-7xl font-black font-[ar1]">السلام عليكم</h1>
            <p className="mb-5 font-[ar2]">موقع بصيرة خطوة نحو فهمٍ أعمق، وإيمانٍ أصفى، وبصيرةٍ تهدي القلوب. مساحةٌ تنبض بالمعرفة، وتستنير بالقيم، هدفها أن تكون أثرًا طيبًا وصدقةً جارية في طريق كل من يبحث عن الهُدى والنور
            </p>
            {!loggedIn &&
              <button id="get" className="btn btn-primary" onClick={() => toast.success("Button clicked!")}>Get Started</button>
            }
          </div>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-md md:text-2xl font-black font-[ar2] text-secondary text-center my-2">تعريف المشروع</h1>
        <p className="text-sm font-bold md:text-lg font-[ar2] text-base-content text-right">هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
          إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص كما يمكن استخدامه لتصاميم الجرافيكس.</p>
      </div>
    </>
  );
}