// src/app/dashboard/ai/page.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { useLoading } from "@/context/loading";
import Loader from "@/components/loader";

export default function FaithfulChat() {
  const [messages, setMessages] = useState([]); // مصفوفة الرسائل { role, content }
  const [input, setInput] = useState("");
  const { loading, setLoading } = useLoading();
  const boxRef = useRef();

  // لتمرير الـ scroll لأسفل عند إضافة رسالة
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg.content }),
      });
      const data = await res.json();
      const reply = data.message || data.error || "لم أتلقَّ ردًا.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", content: "فشل الاتصال بالذكاء الإيماني." }]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = async () => {
    setLoading(true);
    try {
      await fetch("/api/ai/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset: true }),
      });
      setMessages([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">الذكاء الإيماني — دردشة</h1>

      <div
        ref={boxRef}
        className="bg-base-50 p-4 rounded-lg h-[480px] overflow-y-auto space-y-3 border"
      >
        {messages.length === 0 && (
          <div className="text-center text-base-500">ابدأ بالسؤال وسيجيبك الذكاء الإيماني.</div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[90%] ${m.role === "user" ? "bg-neutral text-neutral-content ml-auto" : "bg-base-200 text-base-content mr-auto"}`}
          >
           <p className="text-lg leading-8">{m.content}</p>
          </div>
        ))}

        {loading && <div className="text-center text-base-500 italic">يفكر الذكاء الإيماني...</div>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="اكتب سؤالك أو ذكر مشكلتك..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button onClick={send} className="btn btn-primary" disabled={loading}>
          {loading ? <Loader /> : 'إرسال'}
        </button>
        <button onClick={resetChat} className="btn btn-ghost bg-base-300 text-base-content hover:bg-base-200" disabled={loading}>
          مسح المحادثة
        </button>
      </div>
    </div>
  );
}
