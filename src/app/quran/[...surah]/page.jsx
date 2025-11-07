"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function SurahPage() {
    const [loading, setLoading] = useState(false)
    const param = useParams()
    const Snum = param.surah[0]
    const [ayat, setAyat] = useState()
    const Afrom = param.surah[1]
    const Ato = param.surah[2]
    console.log(Snum);
    
    
      useEffect(() => {
    async function getAyat() {
      try {
        setLoading(true)
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${Snum}?offset=${Afrom}&limit=${Ato}`)
        const data = await res.json()
        setAyat(data.data.ayahs)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error("Error fetching ayat:", err)
      }
    }

    if (Snum) getAyat()
  }, [Snum, Afrom, Ato])


  if (loading) return <h1>جارى تحميل الآيات...</h1>

  return (
    <>
        <h1 className="text-center">بسم الله الرحمن الرحيم</h1>
    <div dir="rtl" className="p-4 leading-loose text-lg">
      {ayat?.map((ayah) => (
  <span key={ayah.number} className="inline">
    {ayah.text} <span className="text-gray-500 text-sm">({ayah.numberInSurah}) </span>
  </span>
))}

    </div>
    </>
  )

}