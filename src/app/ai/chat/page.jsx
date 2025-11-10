"use client";
import { useState, useRef, useEffect } from "react";
import { useLoading } from "@/context/loading";
import Loader from "@/components/loader";

export default function FaithfulChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { loading, setLoading } = useLoading();
  const boxRef = useRef();

  // Scroll لآخر رسالة
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
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "فشل الاتصال بالذكاء الإيماني." },
      ]);
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
    <div className="w-full h-full p-6">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-4 text-primary">
        💡 الذكاء الإيماني — دردشة
      </h1>

      <div
        ref={boxRef}
        className="bg-base-200 shadow-inner rounded-2xl p-4 h-[480px] overflow-y-auto flex flex-col gap-3 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="text-center text-base-content/60 mt-10">
            ابدأ بالسؤال وسيجيبك الذكاء الإيماني 🤍
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat ${m.role === "user" ? "chat-start" : "chat-end"
              } `}
          >
            <div
              className={`chat-bubble whitespace-pre-wrap leading-relaxed text-lg ${m.role === "user"
                ? "chat-bubble-primary text-base-content"
                : "chat-bubble-secondary-content text-base-content"
                } p-4 text-right`}
            >
              <span className="direction-rtl text-right">{m.content}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-secondary italic text-base-content/70 animate-pulse">
              يفكر الذكاء الإيماني...
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-4">
        <input
          type="text"
          className="input input-bordered p-3 flex-1 h-12 text-lg"
          placeholder="اكتب سؤالك أو ذكر مشكلتك..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="btn btn-primary h-12 text-lg"
          disabled={loading}
        >
          {loading ? <Loader /> : "إرسال"}
        </button>
        <button
          onClick={resetChat}
          className="btn btn-outline btn-error h-12 text-lg"
          disabled={loading}
        >
          مسح المحادثة
        </button>
      </div>
    </div>
  );
}
