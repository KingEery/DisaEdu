"use client";

import { Send, Sparkles, Volume2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api/client";
import { playSoftFemaleVoice } from "@/lib/voice";

export function DisaAiBox({ childId, lessonId }: { childId: string; lessonId: string }) {
  const [messages, setMessages] = useState<{ role: "child" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Halo! Aku Maskot Disa. Kalau ada bagian yang belum kamu pahami, tanyakan padaku ya!" }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  async function send(message: string) {
    if (!message.trim()) return;
    setError("");
    setMessages((items) => [...items, { role: "child", content: message }]);
    setLoading(true);
    try {
      const result = await api<{ answer: string }>("/ai/lesson", {
        method: "POST",
        body: JSON.stringify({ childId, lessonId, message })
      });
      setMessages((items) => [...items, { role: "assistant", content: result.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pesan belum dapat dikirim.");
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = String(form.get("message") ?? "");
    event.currentTarget.reset();
    void send(message);
  }

  function listen(text: string) {
    playSoftFemaleVoice(text);
  }

  return (
    <section className="rounded-3xl border-2 border-brand/20 bg-gradient-to-b from-[#F0F7FF] to-white p-6 shadow-soft transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-sm">
            <Sparkles size={22} />
          </div>
          <div>
            <h2 className="font-display text-xl font-black text-brand-dark">Tanya Maskot Disa</h2>
            <p className="text-xs font-semibold text-app-muted">Teman belajar pendamping untuk menjelaskan materi</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-app-border bg-white px-3 py-1.5 text-xs font-bold text-app-text hover:bg-app-surface2"
        >
          {isOpen ? "Tutup Bantuan" : "Buka Bantuan"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 space-y-4">
          <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col gap-1 rounded-2xl p-4 text-sm leading-relaxed ${
                  message.role === "assistant"
                    ? "border border-brand/10 bg-white text-app-text shadow-sm"
                    : "ml-auto max-w-[85%] bg-brand font-semibold text-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-brand-dark">
                    {message.role === "assistant" ? "Maskot Disa:" : "Kamu:"}
                  </span>
                  {message.role === "assistant" && (
                    <button
                      type="button"
                      aria-label="Dengarkan jawaban"
                      onClick={() => listen(message.content)}
                      className="text-brand hover:text-brand-dark"
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
                <p className={message.role === "assistant" ? "text-app-text" : "text-white"}>
                  {message.content}
                </p>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 rounded-2xl bg-white/70 p-4 text-sm text-app-muted">
                <span className="h-2 w-2 animate-ping rounded-full bg-brand"></span>
                <span>Maskot Disa sedang menyiapkan jawaban...</span>
              </div>
            )}
            {error && (
              <p className="rounded-xl border border-warning bg-warning-light p-3 text-xs font-bold text-app-text">
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="w-full text-xs font-bold text-app-muted">Pilihan bantuan cepat:</span>
            {["Jelaskan lebih sederhana", "Beri contoh lain", "Semangati aku"].map((item) => (
              <Button
                key={item}
                type="button"
                variant="secondary"
                onClick={() => send(item)}
                className="rounded-xl py-1.5 text-xs font-bold"
              >
                💡 {item}
              </Button>
            ))}
          </div>

          <form onSubmit={submit} className="flex gap-2 pt-2">
            <input
              name="message"
              placeholder="Tulis pertanyaanmu di sini..."
              className="focus-ring min-w-0 flex-1 rounded-2xl border-2 border-app-border bg-white px-4 py-3 text-sm font-medium transition-all focus:border-brand focus:outline-none placeholder:text-app-muted/60"
            />
            <Button aria-label="Kirim pertanyaan" className="rounded-2xl px-5">
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}
    </section>
  );
}
