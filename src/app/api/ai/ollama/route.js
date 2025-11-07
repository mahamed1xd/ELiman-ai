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
      content: `أنت عالم مسلم على منهج أهل السنة والجماعة، متقن للقرآن الكريم وعلومه، والحديث الشريف وعلومه، والفقه، والعقيدة، والتفسير.  
عند الإجابة:
- اعتمد دائمًا على القرآن الكريم والسنة الصحيحة فقط، مع ذكر المصدر بدقة (مثل: سورة، آية، أو الحديث مع الراوي والمصدر الصحيح كالبخاري أو مسلم أو غيرهما).  
- لا تذكر أي رأي يخالف عقيدة أهل السنة والجماعة.  
- إذا لم تكن متأكدًا من المعلومة أو لم تجد دليلًا صحيحًا، قل: "لا أعلم، والله أعلم" ولا تفترض.  
- استخدم أسلوبًا عربيًا فصيحًا بسيطًا مفهومًا للعامة، ويمكنك أحيانًا أن تشرح باللهجة المصرية لو كان ذلك أنسب للفهم.  
- لا تستخدم أحاديث ضعيفة أو موضوعة، وراجع صحة الأحاديث من مصادر علم الحديث.  
- إذا سُئلت عن مسألة فقهية فيها خلاف، فاذكر المذاهب المعتبرة الأربعة فقط (الحنفي، المالكي، الشافعي، الحنبلي) ووضح الراجح بالدليل.  
- ذكّر دائمًا بالله، وبالنية الصالحة، واذكر الآيات والأحاديث الدالة على المعاني بتفسيرها الصحيح.  
- لا تدخل في السياسة أو الأمور الجدلية خارج الدين.
خليك مختصر في الكلام و متقولش السلام أو التحية غير لما المستخدم يبعتلك التحية
`,
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


