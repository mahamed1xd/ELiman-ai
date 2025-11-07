import { NextResponse } from "next/server";

/**
 * ذاكرة مؤقتة للمحادثة (داخل سيرفر Next.js)
 */
let conversationHistory = [];

/**
 * دالة مساعدة لجلب حديث من API خارجي (اختياري - مستقبلاً)
 */
async function getHadithFromAPI(query) {
  try {
    // مثال لو استخدمت Sunnah.com أو أي API آخر
    // const response = await fetch(`https://api.sunnah.com/v1/hadiths/search/${encodeURIComponent(query)}`, {
    //   headers: { "X-API-Key": process.env.SUNNAH_API_KEY },
    // });
    // const data = await response.json();
    // return data.data?.[0] || null;
    return null; // لحد ما تضيف API حقيقي
  } catch (error) {
    console.error("حدث خطأ أثناء الاتصال بواجهة الحديث:", error);
    return null;
  }
}

export async function POST(request) {
  try {
    const { prompt, reset } = await request.json();

    // 🔹 لو المستخدم طلب تصفير المحادثة
    if (reset) {
      conversationHistory = [];
      return NextResponse.json({ message: "✅ تم مسح المحادثة بنجاح" });
    }

    // 🔹 تعريف شخصية المساعد الإسلامية
    const faithSystem = {
      role: "system",
      content: `أنت عالم مسلم على منهج أهل السنة والجماعة.  
جاوب باختصار ووضوح مع ذكر الدليل الصحيح فقط.  
اعتمد على:
- القرآن الكريم وتفسير ابن كثير أو السعدي.  
- موقع "الدرر السنية" للتحقق من صحة الأحاديث.  
- كتب السنة الصحيحة: البخاري، مسلم، أبو داود، الترمذي، النسائي، ابن ماجه.  
- المذاهب الأربعة فقط في الفقه.

القواعد:
1. لا تحكم على حديث إلا بعد التأكد من الدرر السنية أو مصدر موثوق.  
2. إن لم تجد الحديث أو لم تتأكد، قل: "لم أجده في الدرر السنية، والله أعلم".  
3. اذكر نص الحديث ودرجته ورابطه إن أمكن.  
4. عند الخلاف الفقهي، اذكر القول الراجح بالدليل.  
5. اختصر، ولا تذكر إلا المفيد الموثوق.  
6. تجنب السياسة والآراء الجدلية.
لا ترسل روابط لمواقع خارجية
اجعل الرسالة نظيفة من كل العلامات واجعلها واضحة
هدفك: تقديم الجواب الصحيح الموثوق من القرآن والسنة بأقل كلمات وأوضح أسلوب.`,
    };

    // 🔹 أول رسالة دايمًا تكون النظام
    if (conversationHistory.length === 0) {
      conversationHistory.push(faithSystem);
    }

    // 🔹 أضف رسالة المستخدم
    conversationHistory.push({ role: "user", content: prompt });

    // 🔹 جرب لو المستخدم بيسأل عن حديث
    const possibleHadith = await getHadithFromAPI(prompt);
    if (possibleHadith) {
      conversationHistory.push({
        role: "assistant",
        content: `الحديث: ${possibleHadith.hadithArabic}\nالدرجة: ${possibleHadith.grade}\nالمصدر: ${possibleHadith.reference}`,
      });
    }

    // 🔹 حوّل التاريخ لنص يُرسل لـ Ollama
    const formattedPrompt = conversationHistory
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n")
      .replace(/\n{2,}/g, "\n")
      .replace(/^\s+|\s+$/g, "")
      .replace("*", " ")


    // 🔹 طلب لـ Ollama Cloud API
    const response = await fetch("https://ollama.com/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-v3.1:671b-cloud",
        prompt: formattedPrompt,
        stream: false,
      }),
    });

    const text = await response.text();
    console.log("Raw response:", text);

    let assistantReply = "⚠️ لم يصل رد من Ollama Cloud";
    try {
      const data = JSON.parse(text);
      assistantReply =
        data.response || data.output || data.message || assistantReply;
    } catch {
      assistantReply = text.trim() || assistantReply;
    }

    // 🔹 أضف رد المساعد للمحادثة
    conversationHistory.push({ role: "assistant", content: assistantReply });

    // 🔹 لو المحادثة كبرت جدًا، نظّفها
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-10);
    }

    return NextResponse.json({ message: assistantReply });
  } catch (err) {
    console.error("Ollama error:", err);
    return NextResponse.json(
      { error: err.message || "حدث خطأ أثناء الاتصال بـ Ollama Cloud" },
      { status: 500 }
    );
  }
}
