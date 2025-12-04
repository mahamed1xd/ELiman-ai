
"use client"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/app/components/loader";
import "@/css/hadith.css"

export default function Hadiths() {
  const [loading, setLoading] = useState(false);
  const [modalHadith, setModalHAdith] = useState({})
    const [hadiths, setHadiths] = useState([]);
    const [sharhs, setSharhs] = useState([]);
    const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState()
  const [book, setBook] = useState("")
  const [grade, setGrade] = useState("")
  const [method, setMethod] = useState("")

  useEffect(() => {
    const isBooks = localStorage.getItem("hadithbooks")
    if (!isBooks) {
      const getBooks = async () => {
        const res = await fetch("https://basera-dorar.vercel.app/v1/data/book")
        const data = await res.json()
        setBooks(data.data)
        localStorage.setItem("hadithbooks", JSON.stringify(data.data))

      }
      getBooks()
    } else {
      setBooks(JSON.parse(isBooks))
    }
  }, [])
  const handleSearch = () => {
    if (!searchInput) {
      toast.error("البحث فارغ");
      return
    }
  const getHadiths = async () => {
    try {
      setLoading(true);

      // 1. استلام الرد (الـ Response Object) - ده الظرف
      const res = await fetch(`https://basera-dorar.vercel.app/v1/site/hadith/search?value=${searchInput}&st=p&s[]=${book}&d[]=${grade}`);

      // 2. 🚨 التعديل الجذري: استنى لحد ما تقرأ البيانات اللي جوه الظرف كـ JSON
      // السطر ده هو اللي بيفتح الـ Promise الثانية
      const data = await res.json(); 
      
      
      // 3. هنا الـ data بقت Object نظيف فيه البيانات (الأحاديث والشروحات)
      // 4. ممكن تستخدم data.data عشان تجيب المصفوفة مباشرة
      const sharhResults = data.data; 
      setHadiths(sharhResults)
      // دلوقتي تقدر تعمل setResults(sharhResults)
      
    } catch (error) {
      console.error('فشل في جلب البيانات:', error);
      // ممكن تعرض رسالة للمستخدم هنا
    } finally {
      // الـ finally بتتنفذ سواء حصل خطأ أو لا
      setLoading(false);
    }
  };
  getHadiths();
};

const getHadithInfo = async (hadith) => {
  setLoading(true)
  const res = await(await fetch(`https://basera-dorar.vercel.app${hadith.sharhMetadata.urlToGetSharh}`)).json()
  const data = res.data
  const sharh = data.sharhMetadata.sharh
  const grade = data.grade
  const hadithInfos = {...hadith,sharh,grade
  }
  setModalHAdith(hadithInfos)
  setLoading(false)

  document.getElementById("hadithInfo").showModal()
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
              placeholder="أدخل نص الحديث"
        onChange={(e) => setSearchInput(e.target.value)}
        className="input input-bordered w-full rounded-lg"
      />

      {/* طريقة البحث */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* الكتاب */}
              {books ? (
                <div>
                  <input list="books" name="book"
        id="book"
        onChange={(e) => setBook(e.target.value)}
                    className="input input-bordered w-full rounded-lg"
                    placeholder="اختر الكتاب"
                  />
                  <datalist id="books" className="bg-primary">
                    {books.map((book) => (
                      <option key={book.key} value={book.key}>{book.value}</option>
                    ))
                    }
                  </datalist>
                </div>
              ) : null}
              {/* صحة الحديث */}
              <select
                name="grade"
                id="grade"
                onChange={(e) => setGrade(e.target.value)}
                className="select select-bordered w-full rounded-lg overflow-y-auto"
              >
                <option value="">اختر صحة الحديث</option>
                <option value="0">الكل</option>
                <option value="1">صحيح</option>
                <option value="2">صحيح السند</option>
                <option value="3">ضعيف</option>
                <option value="4">ضعيف السند</option>
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

        {/* Open the modal using document.getElementById('ID').showModal() method */}


        <div className="w-[90%] shadow-2xl flex flex-col rounded-2xl bg-base-200 p-2 mt-2 overflow-y-auto">

                 {hadiths ? (hadiths.length > 0) ? hadiths.map((hadith) => (
                  <div key={hadith.hadithId}>
                  <div className="flex flex-row-reverse items-center justify-between">
                    <p className="direction-rtl text-right text-xl line-clamp-1" id={`${hadith.numberOrPage}_p`} onClick={() => {
                      document.getElementById(`${hadith.numberOrPage}_p`).classList.remove("line-clamp-1")
                    }}>{hadith.hadith}</p>
                    <button className="btn btn-primary mr-1" onClick={() => {getHadithInfo(hadith)}}>
        {loading ? <Loader /> : "عرض"}

                    </button>
                  </div>
                  <div className="divider"></div>
                  </div>
                 )) : <p>  </p> : <p>لا يوجد نتائج</p>}

              </div>

<dialog id="hadithInfo" className="modal">
<div className="modal-box w-[90%]">
  {(modalHadith != {}) && <>
  <div className="grid grid-cols-1 gap-2 text-right text-lg text-base-content">
    <p className="p-4 bg-base-200 rounded-2xl text-base-content text-xl direction-rtl text-right">{modalHadith.hadith}</p>
    <div className="divider my-0.5"></div>
    <p>خلاصة الحكم : <span className="text-primary">{modalHadith.explainGrade}</span></p>
    <div>
      <p>الراوي : <span className="text-primary">{modalHadith.rawi}</span> | المحدث : <span className="text-primary">{modalHadith.mohdith}</span> | المصدر : <span className="text-primary">{modalHadith.book}</span> | الصفحة أو الرقم : <span className="text-primary">{modalHadith.numberOrPage}</span></p> <br />
      <p>التخريج : <span className="text-primary">{modalHadith.grade}</span></p>
    </div>
    <div className="divider my-0.5"></div>
    <p>{modalHadith.sharh}</p>
    </div>
    </>}
</div>
<form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
</dialog>

</div>

    );
}