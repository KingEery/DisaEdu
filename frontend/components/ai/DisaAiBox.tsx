"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api/client";

export function DisaAiBox({ childId, lessonId }: { childId: string; lessonId: string }) {
  const [messages, setMessages] = useState<{ role: "child" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Aku bisa membantu menjelaskan materi ini." }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function send(message: string) {
    if (!message.trim()) return;
    setError("");
    setMessages((items) => [...items, { role: "child", content: message }]);
    setLoading(true);
    try {
      const result = await api<{ answer: string }>("/ai/lesson", { method: "POST", body: JSON.stringify({ childId, lessonId, message }) });
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

  return (
    <section className="rounded-lg border border-brand bg-brand-light p-5">
      <h2 className="text-xl font-bold">DisaAI</h2>
      <div className="mt-4 space-y-3">
        {messages.map((message, index) => (
          <p key={index} className={`rounded-lg p-3 ${message.role === "assistant" ? "bg-white" : "bg-success-light"}`}>{message.content}</p>
        ))}
        {loading && <p className="text-app-muted">DisaAI sedang berpikir...</p>}
        {error && <p className="rounded-lg bg-warning-light p-3 text-sm">{error}</p>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Beri contoh", "Jelaskan lebih sederhana"].map((item) => <Button key={item} variant="secondary" onClick={() => send(item)}>{item}</Button>)}
      </div>
      <form onSubmit={submit} className="mt-4 flex gap-2">
        <input name="message" placeholder="Tulis pertanyaan..." className="focus-ring min-w-0 flex-1 rounded-lg border border-app-border px-4 py-3" />
        <Button aria-label="Kirim pertanyaan"><Send size={18} /></Button>
      </form>
    </section>
  );
}
