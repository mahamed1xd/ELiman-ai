"use client"

export default function Test() {
return (
<>
<h1>test page</h1> 
{/*"use client"

import { useEffect, useRef, useState } from "react";
import Awesomplete from "awesomplete";
import "awesomplete/awesomplete.css";

export default function RadioSearch() {
  const inputRef = useRef(null);
  const [radios, setRadios] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);

  useEffect(() => {
    // تحميل بيانات الإذاعات
    async function fetchData() {
      const res = await fetch("https://data-rosy.vercel.app/radio.json");
      const data = await res.json();
      setRadios(data.radios);

      // إنشاء قائمة suggestions للـ Awesomplete
      const list = data.radios.map((radio) => radio.name);

      new Awesomplete(inputRef.current, {
        list: list,
        minChars: 1,
        maxItems: 10,
        autoFirst: true,
      });

      // حدث اختيار المستخدم
      inputRef.current.addEventListener("awesomplete-selectcomplete", (e) => {
        const radio = data.radios.find(r => r.name === e.text.value);
        setSelectedRadio(radio);
      });
    }

    fetchData();
  }, []);

  return (
    <div className="mt-4 w-[90%] max-w-md mx-auto">
      <h1 className="text-primary font-[ar2] text-2xl text-center mb-4">
        ابحث عن إذاعة القرآن الكريم
      </h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="اكتب اسم الإذاعة..."
        className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {selectedRadio && (
        <div className="mt-4 text-center flex flex-col items-center">
          <img
            src={selectedRadio.img}
            alt={selectedRadio.name}
            className="h-24 w-24 rounded-full border-2 border-primary mb-2"
          />
          <h2 className="text-primary font-[ar2] mb-2">{selectedRadio.name}</h2>
          <audio controls src={selectedRadio.url} className="mx-auto" />
        </div>
      )}
    </div>
  );
}
 */}
</>
)
}