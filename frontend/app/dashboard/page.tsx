"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, MessageCircle, Play, Star, Trophy, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api, getActiveChildId, isForbiddenChildError } from "@/lib/api/client";
import { Lesson, ProgressSummary } from "@/types/domain";

type Dashboard = { progress: ProgressSummary; lastLesson: Lesson | null; recommendation: string; nextLesson: Lesson | null };

export default function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);
  const childId = getActiveChildId();

  useEffect(() => {
    if (!childId) return;
    api<Dashboard>(`/dashboard/${childId}`)
      .then(setData)
      .catch((error) => {
        if (isForbiddenChildError(error)) window.location.assign("/profile");
        else console.error(error);
      });
  }, [childId]);

  if (!childId) return <EmptyProfile />;
  if (!data) return <div className="p-8">Memuat petualanganmu...</div>;

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      {/* Dynamic Hero Banner */}
      <div className="relative rounded-[32px] mesh-bg p-8 md:p-12 shadow-soft mb-8 border border-brand-light">
        <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full mb-4 shadow-sm text-brand-dark font-bold text-sm">
              <Star size={16} className="text-yellow" fill="currentColor" /> Petualangan Seru Menanti!
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight tracking-tight">
              Ayo mulai <br className="hidden md:block"/> belajar hari ini!
            </h1>
            <p className="mt-4 max-w-lg text-lg font-medium text-app-text/90">
              Satu langkah kecil hari ini bisa membuatmu hebat besok!
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={data.nextLesson ? `/lessons/${data.nextLesson.id}` : "/courses"}>
                {/* ORANGE PROMINENT BUTTON */}
                <button className="tactile-btn flex items-center gap-2 bg-yellow text-app-text text-xl font-black px-10 py-5 rounded-[20px] shadow-[0_8px_0_0_#d99c00] hover:bg-[#e5a90e] transition-colors">
                  <Play size={28} fill="currentColor" /> MULAI BELAJAR
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center relative z-20">
            {/* MASCOT HERO - POP OUT 3D EFFECT */}
            <div className="w-64 h-64 mascot-float scale-[1.35] lg:scale-[1.5] origin-bottom -mr-4 -mt-8 pointer-events-none">
              <img 
                src="/mascots/hero.png" 
                alt="Maskot Utama" 
                className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* DisaTalk Card */}
        <Link href="/simulation" className="focus-ring md:col-span-2 group block relative overflow-hidden rounded-[32px] ai-gradient-bg p-8 shadow-soft transition-transform hover:-translate-y-1">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm text-white mb-6">
                <MessageCircle size={32} />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">DisaTalk AI</h2>
              <p className="text-white/90 font-medium max-w-sm text-lg">Latihan ngobrol seru bareng asisten pintar!</p>
            </div>
            
            <div className="mt-8 self-start inline-flex items-center gap-2 bg-yellow text-app-text px-6 py-3 rounded-full font-bold shadow-[0_4px_0_0_#d99c00] hover:bg-[#e5a90e] transition-colors">
              <Play size={20} fill="currentColor" /> Mulai Ngobrol
            </div>
          </div>
        </Link>

        {/* Progress Card */}
        <Link href="/progress" className="focus-ring block rounded-[32px] bg-white border border-app-border p-8 shadow-soft transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 bg-yellow-light rounded-2xl flex items-center justify-center shadow-sm text-yellow">
              <Trophy size={32} />
            </div>
          </div>
          <h2 className="text-4xl font-black text-app-text">{data.progress.overall}%</h2>
          <p className="text-app-muted font-bold mb-4">Progress Belajar</p>
          <ProgressBar value={data.progress.overall} />
        </Link>
      </div>

      {/* Recommended Section */}
      <div className="mt-6 rounded-[32px] bg-white border border-app-border p-8 shadow-soft">
        <h2 className="text-2xl font-black mb-6">Misi Hari Ini</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {["Buka satu materi baru", "Latihan bicara 5 menit", "Dapat 1 lencana emas"].map((item, index) => (
            <div key={item} className={`flex items-center gap-4 p-5 rounded-[24px] ${index === 0 ? "bg-brand-light/50 border border-brand-light" : "bg-app-surface2"}`}>
              <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center ${index === 0 ? "bg-brand text-white" : "bg-white text-app-muted shadow-sm"}`}>
                <CheckCircle2 size={24} />
              </div>
              <p className="font-bold text-app-text">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmptyProfile() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-48 h-48 mb-6 mascot-float">
        <img 
          src="/mascots/empty.png" 
          alt="Maskot Sedih" 
          className="w-full h-full object-contain drop-shadow-xl"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full bg-brand-light rounded-[32px] flex items-center justify-center text-brand font-bold text-center shadow-soft">Taruh maskot empty.png di public/mascots/</div>';
          }}
        />
      </div>
      <h1 className="text-4xl font-black text-brand-dark mb-4">Kamu Belum Punya Profil</h1>
      <p className="max-w-md text-app-text font-medium mb-8 text-lg">Buat profil dulu supaya materi dan serunya petualangan ini bisa disesuaikan khusus buatmu!</p>
      <Link href="/profile">
        <button className="tactile-btn bg-yellow text-app-text text-xl font-black px-10 py-5 rounded-[20px] shadow-[0_8px_0_0_#d99c00] hover:bg-[#e5a90e] transition-colors">
          BUAT PROFIL SEKARANG
        </button>
      </Link>
    </section>
  );
}
