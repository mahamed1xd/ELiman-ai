import { NextResponse } from "next/server";

/**
 * تخزين المحادثة في الذاكرة
 */
let conversationHistory = [];

export async function POST(request) {
  try {
    const { prompt, reset } = await request.json();

    // لو المستخدم طلب مسح المحادثة
    if (reset) {
      conversationHistory = [];
      return NextResponse.json({ message: "تم مسح المحادثة بنجاح ✅" });
    }

    // النظام الأساسي (تعريف شخصية المساعد)
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

هدفك: تقديم الجواب الصحيح الموثوق من القرآن والسنة بأقل كلمات وأوضح أسلوب.`,
    };

    // لو دي أول مرة المستخدم يتكلم
    if (conversationHistory.length === 0) {
      conversationHistory.push(faithSystem);
    }

    // أضف رسالة المستخدم
    conversationHistory.push({ role: "user", content: prompt });

    // حوّل كل الرسائل إلى نص واحد مرسل في prompt
    const formattedPrompt = conversationHistory
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    // الطلب إلى Ollama Cloud API
    const response = await fetch("https://ollama.com/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-oss:120b",
        prompt: formattedPrompt,
        stream: false,
      }),
    });

    const text = await response.text();
    console.log("Raw response:", text);

    let data;
    let assistantReply = "لم أتلقَّ ردًا من Ollama Cloud";

    try {
      data = JSON.parse(text);
      assistantReply =
        data.response || data.output || data.message || assistantReply;
    } catch {
      // لو الرد مش JSON (نص عادي)
      assistantReply = text || assistantReply;
    }

    // حفظ رد المساعد في المحادثة
    conversationHistory.push({ role: "assistant", content: assistantReply });

    return NextResponse.json({ message: assistantReply });
  } catch (err) {
    console.error("Ollama error:", err);
    return NextResponse.json(
      { error: err.message || "حدث خطأ أثناء الاتصال بـ Ollama Cloud" },
      { status: 500 }
    );
  }
}




