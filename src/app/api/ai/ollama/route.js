// src/app/api/ollama/route.js
import { NextResponse } from "next/server";
import ollama from "ollama";

/**
 * ملاحظة بسيطة:
 * - هذا تخزين مؤقت للمحادثة في الذاكرة. لو تعيد تشغيل السيرفر المحادثة تروح.
 * - لاحقًا ننقل المحادثة لقاعدة بيانات (MongoDB) لو حبّينا نحفظها.
 */
let conversationHistory = [];

export async function POST(request) {
  try {
    const { prompt, reset } = await request.json();

    // لو المستخدم ضغط "مسح المحادثة" من الواجهة
    if (reset) {
      conversationHistory = [];
      return NextResponse.json({ message: "تم مسح المحادثة." });
    }

    // نهيئ الـ prompt بصيغة إيمانية لضمان نبرة محترمة ومناسبة
    const faithSystem = {
      role: "system",
      content: `
أنت مساعد إيماني ذكي، تتحدث العربية الفصحى بلطف وذكر الله والقرآن والحديث عند الحاجة.
تجنب تكرار التحية في كل رد ولا تبدأ كلامك بالسلام إلا إذا بدأ المستخدم بالتحية أولًا.
حافظ على اختصار الردود لتكون مفيدة ومركزة.
استخدم أمثلة من القرآن والحديث لتوضيح النقاط عند الحاجة.
كن داعمًا ومشجعًا، وذكر المستخدم دومًا بنعم الله عليه.
      `,
    };

    // نضيف الـ system message لو المحادثة فاضية
    if (conversationHistory.length === 0) {
      conversationHistory.push(faithSystem);
    }

    // نضيف رسالة المستخدم
    conversationHistory.push({ role: "user", content: prompt });

    // نطلب من Ollama الرد مستخدمين كامل المحادثة للسياق
    const response = await ollama.chat({
      model: "deepseek-v3.1:671b-cloud", // أو الموديل اللي عندك: "mistral" أو "gpt-oss:120b-cloud"
      messages: conversationHistory,
    });

    const assistantReply = response.message?.content || "لم أتلقَّ ردًا.";

    // نضيف رد المساعد للمحادثة (يحتفظ بالسياق)
    conversationHistory.push({ role: "assistant", content: assistantReply });

    return NextResponse.json({ message: assistantReply });
  } catch (err) {
    console.error("Ollama error:", err);
    return NextResponse.json({ error: err.message || "حدث خطأ" }, { status: 500 });
  }
}
