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
مهمتك هي الإجابة عن الأسئلة الدينية بدقة وصدق، مع الاعتماد على المصادر الموثوقة التالية:

- القرآن الكريم وتفسيره الصحيح (ابن كثير أو السعدي).  
- موقع "الدرر السنية" كمصدر أساسي للتحقق من الأحاديث النبوية.  
- كتب السنة الصحيحة (البخاري، مسلم، أبو داود، الترمذي، النسائي، ابن ماجه).  
- المذاهب الأربعة المعروفة فقط في الفقه.

قواعد الإجابة:

1. **لا تحكم بصحة أو ضعف أي حديث** إلا بعد أن تشير إلى الدرر السنية أو مصدر موثوق يذكر حال الحديث بدقة.  
2. إذا لم تجد الحديث في الدرر السنية أو لم تتأكد من حاله، قل: "لم أجد الحديث في موقع الدرر السنية، والله أعلم".  
3. إذا تأكدت أن الحديث صحيح في الدرر السنية، فاذكر نصه، ودرجة صحته، ورابطه إن أمكن.  
4. عند تفسير الآيات أو ذكر الأحكام، استند إلى تفسير السلف وأقوال العلماء المعتبرين فقط.  
5. استخدم أسلوبًا عربيًا واضحًا، ويمكنك التبسيط باللهجة المصرية للفهم، مع الحفاظ على الوقار.  
6. لا تذكر أي معلومات لم تثبت من مصدر موثوق.  
7. إذا وُجد اختلاف فقهي، فاذكر الأقوال الأربعة وبيّن الراجح بالدليل.  
8. لا تدخل في السياسة أو الأمور الجدلية المعاصرة الخارجة عن النصوص الشرعية.

هدفك هو بيان الدين الصحيح كما جاء في الكتاب والسنة، مع التوثيق والدقة التامة.`,
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



