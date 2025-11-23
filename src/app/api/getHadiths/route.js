import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const hadithEnglish = searchParams.get("hadithEnglish") || "";
  const hadithArabic = searchParams.get("hadithArabic") || "";
  const hadithNumber = searchParams.get("hadithNumber") || "";
  const book = searchParams.get("book") || "";

  console.log(
    `hadithEnglish: ${hadithEnglish}, hadithArabic: ${hadithArabic}, hadithNumber: ${hadithNumber}, book: ${book}`
  );

  const ApiKey =
    "$2y$10$BmU8Ux64wYDfGPSxUrgYHuRpoZhvHVnc2Fzi1csuawK8CxFzCa3tS";

  const res = await fetch(
    `https://hadithapi.com/api/hadiths/?apiKey=${ApiKey}&book=${book}&hadithEnglish=${hadithEnglish}&hadithArabic=${hadithArabic}&hadithNumber=${hadithNumber}`
  );

  const data = await res.json();
  console.log("signed ✔");

  return NextResponse.json(data?.hadiths ?? []);
}
