
"use client"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/loader";
import "@/css/hadith.css"

export default function Hadiths() {
  const [loading, setLoading] = useState(false);
    const [hadiths, setHadiths] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [book, setBook] = useState("")
    const [method, setMethod] = useState("")
    const handleSearch = () => {
        console.log(method);
        setLoading(true);
        if (method === "hadithNumber") {
            async function getHadithsByNumber() {
                console.log(book);
                
                console.log("hadithNumber");
                const res = await fetch(`/api/getHadiths?hadithNumber=${searchInput}&book=${book}`);
                const data = await res.json();
                console.log(data.data);
                setHadiths(data.data);
            }
            getHadithsByNumber();
            setLoading(false);
                }
        if (method === "hadithArabic") {
            async function getHadithsByArabic() {
                console.log("hadithArabic");
                const res = await fetch(`/api/getHadiths?hadithArabic=${searchInput}`);
                const data = await res.json();
                console.log(data.data);
                setHadiths(data.data);
            }
            getHadithsByArabic();
            setLoading(false);
        }
        if (method === "hadithEnglish") {
            async function getHadithsByEnglish() {
                console.log("hadithEnglish");
                const res = await fetch(`/api/getHadiths?hadithEnglish=${searchInput}`);
                const data = await res.json();
                console.log(data.data);
                setHadiths(data.data);
            }
            getHadithsByEnglish();
            setLoading(false);
        }
        if (method === "") {
            toast.error("no method selected");
            setLoading(false);
        }
    }
    return (
<div className="flex flex-col items-center w-full py-6">

  <h1 className="text-2xl md:text-3xl text-center mb-6 font-bold">
    بحث الأحاديث الشريفة
  </h1>

  {/* الـ Container الأساسي */}
  <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-base-100 shadow-md rounded-xl p-4 space-y-4">

    {/* صف الإدخالات */}
    <div className="grid grid-cols-1 md:grid-cols-1 gap-3">

      {/* البحث */}
      <input
        type="text"
        id="hadithNumber"
        placeholder="أدخل رقم الحديث أو نص الحديث"
        onChange={(e) => setSearchInput(e.target.value)}
        className="input input-bordered w-full rounded-lg"
      />

      {/* طريقة البحث */}
      <div className="flex flex-row gap-2">
      <select
        name="method"
        id="method"
        onChange={(e) => setMethod(e.target.value)}
        className="select select-bordered w-full rounded-lg"
      >
        <option value="">اختر طريقة البحث</option>
        <option value="hadithNumber">حسب رقم</option>
        <option value="hadithArabic">حسب النص العربي</option>
        <option value="hadithEnglish">حسب النص الإنجليزي</option>
      </select>

      {/* الكتاب */}
      <select
        name="book"
        id="book"
        onChange={(e) => setBook(e.target.value)}
        className="select select-bordered w-full rounded-lg"
      >
        <option value="">اختر الكتاب</option>
        <option value="">كل الكتب</option>
        <option value="sahih-bukhari">صحيح البخاري</option>
        <option value="sahih-muslim">صحيح مسلم</option>
        <option value="al-tirmidhi">جامع الترمذي</option>
        <option value="abu-dawood">سنن أبي داود</option>
        <option value="ibn-e-majah">سنن ابن ماجه</option>
        <option value="sunan-nasai">سنن النسائي</option>
        <option value="mishkat">مشكاة المصابيح</option>
        <option value="musnad-ahmad">مسند أحمد</option>
        <option value="al-silsila-sahiha">السلسلة الصحيحة</option>
      </select>
      </div>
      {/* زر البحث */}
      <button
        disabled={loading}
        onClick={handleSearch}
        className="btn btn-primary w-full rounded-lg"
      >
        {loading ? <Loader /> : "بحث"}
      </button>

    </div>
  </div>

<div id="hadithsContainer" className="w-[90%] md:w-[80%] lg:w-[70%] bg-base-100 shadow-md rounded-xl p-4 space-y-4 overflow-y-scroll">
{hadiths ? hadiths.map((hadith) => (
  <div className="flex flex-col gap-2 p-2 border mt-3 rounded-lg border-base-200" key={hadith.id}>
    <p>{hadith.hadithArabic} الحديث :</p>
    <p>{hadith.hadithEnglish} الحديث الإنجليزي :</p>
    <p>{hadith.hadithNumber} رقم الحديث :</p>
    <p>{hadith.book.bookName} الكتاب :</p>
  </div>
)) : <p>لا يوجد نتائج</p>}
</div>

</div>

    );
}