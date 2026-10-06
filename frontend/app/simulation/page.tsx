"use client";

import { FormEvent, useEffect, useState, useRef } from "react";
import { MessageCircle, Mic, Send, MicOff, Volume2, VolumeX, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { api, getActiveChildId, redirectToProfileOnForbiddenChild } from "@/lib/api/client";
import { Simulation, SimulationMessage } from "@/types/domain";
import { AiStatus } from "@/types/domain";
import { playSoftFemaleVoice } from "@/lib/voice";

type SessionState = { id: string; simulationId: string; title: string; messages: SimulationMessage[] };

export default function SimulationPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [session, setSession] = useState<SessionState | null>(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [error, setError] = useState("");
  const [aiStatus, setAiStatus] = useState<AiStatus | null>(null);
  const childId = getActiveChildId();
  const recognitionRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api<Simulation[]>("/simulations")
      .then(setSimulations)
      .catch((reason) => setError(reason instanceof Error ? reason.message : "Latihan belum dapat dimuat."));
    api<AiStatus>("/ai/status").then(setAiStatus).catch(() => undefined);
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.lang = "id-ID";
        recognitionRef.current.onresult = (event: any) => setInputText(event.results[0][0].transcript);
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    if (session?.messages && soundEnabled) {
      const lastMsg = session.messages[session.messages.length - 1];
      if (lastMsg?.role === "assistant") {
        playSoftFemaleVoice(lastMsg.content);
      }
    }
  }, [session?.messages, soundEnabled, loading]);

  const toggleListen = () => {
    if (!recognitionRef.current) return alert("Browser tidak mendukung sensor suara.");
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  async function start(simulation: Simulation) {
    if (!childId) return;
    setError("");
    try {
      const result = await api<{ session: { id: string; simulationId: string }; opening: string }>(`/simulations/${simulation.id}/start`, {
        method: "POST",
        body: JSON.stringify({ childId })
      });
      setSession({ id: result.session.id, simulationId: simulation.id, title: simulation.title, messages: [{ id: "opening", role: "assistant", content: result.opening }] });
      setFinished(false);
    } catch (reason) {
      if (!redirectToProfileOnForbiddenChild(reason)) {
        setError(reason instanceof Error ? reason.message : "Sesi latihan belum dapat dimulai.");
      }
    }
  }

  async function send(event?: FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault();
    if (!childId || !session || !inputText.trim()) return;
    
    const message = inputText.trim();
    setInputText("");
    setLoading(true);
    setError("");
    setSession({ ...session, messages: [...session.messages, { id: Math.random().toString(36).substring(2, 10), role: "child", content: message }] });
    try {
      const result = await api<{ messages: SimulationMessage[] }>(`/simulations/${session.simulationId}/message`, {
        method: "POST",
        body: JSON.stringify({ childId, sessionId: session.id, message })
      });
      setSession((current) => (current ? { ...current, messages: result.messages } : current));
    } catch (reason) {
      if (redirectToProfileOnForbiddenChild(reason)) return;
      setError(reason instanceof Error ? reason.message : "Pesan belum dapat dikirim.");
    } finally {
      setLoading(false);
    }
  }

  async function finish() {
    if (!childId || !session) return;
    setError("");
    try {
      await api(`/simulations/${session.simulationId}/finish`, { method: "POST", body: JSON.stringify({ childId, sessionId: session.id }) });
      setFinished(true);
    } catch (reason) {
      if (!redirectToProfileOnForbiddenChild(reason)) {
        setError(reason instanceof Error ? reason.message : "Sesi belum dapat diakhiri.");
      }
    }
  }

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      {!session && (
        <>
          {error && <p className="mb-6 rounded-xl border border-warning bg-warning-light p-4 font-semibold text-app-text">{error}</p>}
          <div className="mb-12 mt-8 p-8 md:p-12 ai-gradient-bg rounded-[32px] shadow-glow-ai flex flex-col md:flex-row items-center justify-between gap-8 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-white/10 blur-2xl"></div>
            <div className="z-10 relative">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-sm">DisaTalk AI</h1>
              <p className="text-lg md:text-xl font-medium text-white/90 max-w-xl">
                Latihan ngobrol dengan asisten pintar kami untuk melatih kepercayaan dirimu!
              </p>
              {aiStatus && <div className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white"><span>{aiStatus.isDemo ? "Mode demo" : "Mode live"}</span><span className="text-white/70">·</span><span>Provider: {aiStatus.provider}</span></div>}
            </div>
            {/* MASCOT TALK - POP OUT 3D EFFECT */}
            <div className="w-48 h-48 flex-shrink-0 mascot-float scale-[1.4] origin-bottom md:origin-bottom-right z-20 md:-mt-16 md:-mr-4 pointer-events-none">
              <img 
                src="/mascots/talk.png" 
                alt="Maskot DisaTalk" 
                className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {simulations.map((simulation) => (
              <button key={simulation.id} onClick={() => start(simulation)} className="focus-ring text-left rounded-[32px] bg-white p-8 shadow-soft transition-transform hover:-translate-y-2 border border-app-border flex flex-col h-full">
                <div className="w-16 h-16 bg-ai-light rounded-2xl flex items-center justify-center text-ai mb-6">
                  <MessageCircle size={32} />
                </div>
                <h2 className="text-2xl font-black text-app-text mb-2">{simulation.title}</h2>
                <p className="text-app-muted font-medium mb-8 flex-1">{simulation.description}</p>
                <div className="inline-flex rounded-[20px] bg-yellow text-app-text px-8 py-4 font-black text-lg shadow-[0_6px_0_0_#d99c00] mt-auto w-full justify-center">
                  Mulai Latihan
                </div>
              </button>
            ))}
          </div>
          {aiStatus && <section className="mt-8 rounded-3xl border border-app-border bg-white p-6"><h2 className="text-xl font-black">Contoh personalisasi respons</h2><p className="mt-2 text-sm text-app-muted">DisaAI mempertimbangkan usia, minat, dan preferensi belajar. Perbandingan ini adalah contoh perilaku provider saat presentasi.</p><div className="mt-5 grid gap-4 md:grid-cols-2">{aiStatus.examples.map((example) => <div key={example.profile} className="rounded-2xl bg-app-surface2 p-4"><p className="font-bold">{example.profile}</p><p className="mt-1 text-xs text-app-muted">{example.details}</p><p className="mt-3 text-sm">{example.response}</p></div>)}</div>{aiStatus.isDemo && <p className="mt-4 rounded-xl bg-warning-light p-3 text-xs font-semibold">Mode demo aktif: respons percakapan menggunakan aturan mock, bukan model AI eksternal.</p>}</section>}
        </>
      )}

      {session && (
        <div className="rounded-[32px] bg-white shadow-[0_20px_60px_-15px_rgba(131,56,236,0.1)] border border-ai-border overflow-hidden flex flex-col h-[75vh]">
          {error && <p className="m-4 rounded-xl border border-warning bg-warning-light p-4 font-semibold text-app-text">{error}</p>}
          {/* Chat Header */}
          <div className="bg-ai text-white p-4 px-6 md:px-8 flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">{session.title}</h2>
                <p className="text-white/80 text-sm font-medium">DisaAI Assistant {aiStatus && `· ${aiStatus.isDemo ? "Mode demo" : "Mode live"}`}</p>
              </div>
            </div>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="focus-ring p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </div>

          {/* Chat Messages Container */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-app-bg scroll-smooth">
            {session.messages.map((message) => (
              <div key={message.id} className={`flex w-full ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-ai text-white flex items-center justify-center shrink-0 mr-3 mt-auto mb-1">
                    <span className="text-xs font-bold">AI</span>
                  </div>
                )}
                <div 
                  className={`relative max-w-[80%] rounded-[24px] px-6 py-4 text-[17px] font-medium leading-relaxed shadow-sm
                    ${message.role === "assistant" 
                      ? "bg-white text-app-text rounded-bl-sm border border-app-border" 
                      : "bg-brand text-white rounded-br-sm"
                    }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start items-end w-full">
                <div className="w-8 h-8 rounded-full bg-ai text-white flex items-center justify-center shrink-0 mr-3 mb-1">
                  <span className="text-xs font-bold">AI</span>
                </div>
                <div className="bg-white rounded-[24px] rounded-bl-sm border border-app-border px-6 py-4 shadow-sm flex items-center gap-3">
                  <Loader2 size={20} className="animate-spin text-ai" />
                  <span className="font-medium text-app-muted">DisaAI sedang mengetik...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input & Controls */}
          {!finished ? (
            <div className="p-4 md:p-6 bg-white border-t border-app-border">
              <form onSubmit={send} className="flex gap-3 mb-4">
                <input 
                  name="message" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ketik balasanmu di sini..." 
                  className="focus-ring flex-1 rounded-full bg-app-surface2 border border-transparent focus:border-ai px-6 py-4 text-[17px] font-medium transition-colors"
                />
                <button type="submit" disabled={!inputText.trim() || loading} className="focus-ring w-14 h-14 shrink-0 rounded-full bg-brand text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-sm">
                  <Send size={24} className="ml-1" />
                </button>
              </form>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <button 
                  onClick={toggleListen} 
                  type="button"
                  className={`focus-ring relative flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300
                    ${isListening 
                      ? "bg-ai text-white animate-pulse-glow" 
                      : "bg-app-surface2 text-app-text hover:bg-app-border"
                    }`}
                >
                  {isListening ? <MicOff size={24} /> : <Mic size={24} />} 
                  {isListening ? "Mendengarkan..." : "Gunakan Suara"}
                </button>
                
                <button onClick={finish} className="focus-ring px-6 py-3 rounded-full text-app-muted font-bold hover:bg-app-surface2 transition-colors">
                  Akhiri Sesi
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-success-light text-center border-t border-success/20">
              <div className="w-20 h-20 bg-success text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-app-text mb-2">Hebat Sekali!</h3>
              <p className="text-app-muted font-medium mb-6">Kamu telah menyelesaikan sesi latihan ini dengan baik.</p>
              <Button onClick={() => setSession(null)} className="px-8 py-4 rounded-full text-lg shadow-[0_6px_0_0_#059669]">
                Pilih Latihan Lain
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
