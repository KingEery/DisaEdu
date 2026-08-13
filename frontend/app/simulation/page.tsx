"use client";

import { FormEvent, useEffect, useState } from "react";
import { MessageCircle, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { api, getActiveChildId } from "@/lib/api/client";
import { Simulation, SimulationMessage } from "@/types/domain";

type SessionState = { id: string; simulationId: string; title: string; messages: SimulationMessage[] };

export default function SimulationPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [session, setSession] = useState<SessionState | null>(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const childId = getActiveChildId();

  useEffect(() => {
    api<Simulation[]>("/simulations").then(setSimulations);
  }, []);

  async function start(simulation: Simulation) {
    if (!childId) return;
    const result = await api<{ session: { id: string; simulationId: string }; opening: string }>(`/simulations/${simulation.id}/start`, {
      method: "POST",
      body: JSON.stringify({ childId })
    });
    setSession({ id: result.session.id, simulationId: simulation.id, title: simulation.title, messages: [{ id: "opening", role: "assistant", content: result.opening }] });
    setFinished(false);
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!childId || !session) return;
    const form = new FormData(event.currentTarget);
    const message = String(form.get("message") ?? "");
    if (!message.trim()) return;
    event.currentTarget.reset();
    setLoading(true);
    setSession({ ...session, messages: [...session.messages, { id: crypto.randomUUID(), role: "child", content: message }] });
    const result = await api<{ messages: SimulationMessage[] }>(`/simulations/${session.simulationId}/message`, {
      method: "POST",
      body: JSON.stringify({ childId, sessionId: session.id, message })
    });
    setSession((current) => (current ? { ...current, messages: result.messages } : current));
    setLoading(false);
  }

  async function finish() {
    if (!childId || !session) return;
    await api(`/simulations/${session.simulationId}/finish`, { method: "POST", body: JSON.stringify({ childId, sessionId: session.id }) });
    setFinished(true);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-brand-dark">DisaTalk</p>
        <h1 className="mt-2 text-4xl font-black text-app-text">Latihan ngobrol untuk situasi yang sering ditemui anak.</h1>
        <p className="mt-4 text-lg leading-8 text-app-muted">Nada percakapan tetap sederhana, hangat, dan tidak menghakimi.</p>
      </div>

      {!session && (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {simulations.map((simulation) => (
            <button key={simulation.id} onClick={() => start(simulation)} className="text-left rounded-[26px] border border-app-border bg-white p-5 shadow-soft transition hover:-translate-y-0.5">
              <MessageCircle className="text-brand-dark" />
              <p className="mt-4 text-sm font-semibold text-app-muted">{simulation.difficulty}</p>
              <h2 className="mt-2 text-2xl font-bold">{simulation.title}</h2>
              <p className="mt-2 text-app-muted">{simulation.description}</p>
              <div className="mt-5 inline-flex rounded-full bg-brand-light px-4 py-2 text-sm font-semibold text-brand-dark">Mulai latihan</div>
            </button>
          ))}
        </div>
      )}

      {session && (
        <div className="mt-8 rounded-[28px] border border-app-border bg-white p-5 shadow-soft md:p-6">
          <h2 className="text-2xl font-bold">{session.title}</h2>
          <div className="mt-4 max-h-[420px] space-y-3 overflow-auto rounded-[24px] bg-app-surface2 p-4">
            {session.messages.map((message) => (
              <p key={message.id} className={`max-w-[85%] rounded-2xl p-3 ${message.role === "assistant" ? "bg-white" : "ml-auto bg-success-light"}`}>{message.content}</p>
            ))}
            {loading && <p className="text-app-muted">DisaAI sedang berpikir...</p>}
          </div>
          {!finished ? (
            <>
              <form onSubmit={send} className="mt-4 flex gap-2">
                <input name="message" placeholder="Tulis jawaban..." className="focus-ring min-w-0 flex-1 rounded-2xl border border-app-border px-4 py-3" />
                <Button aria-label="Kirim pesan"><Send size={18} /></Button>
              </form>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="secondary" type="button"><Mic size={18} /> Voice input</Button>
                <Button variant="secondary" onClick={finish}>Selesai</Button>
              </div>
            </>
          ) : (
            <div className="mt-4 rounded-2xl bg-success-light p-4">
              <h3 className="font-bold">Latihan selesai!</h3>
              <p>Kamu sudah menyelesaikan latihan ngobrol.</p>
              <Button className="mt-4" onClick={() => setSession(null)}>Pilih Latihan Lain</Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

