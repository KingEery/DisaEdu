"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, MessageCircle, Play, Star, Trophy, UserRound, Stethoscope, Users } from "lucide-react";
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
            <h1 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight tracking-tight">
              Ayo mulai <br className="hidden md:block"/> belajar hari ini!
            </h1>
            <p className="mt-4 max-w-lg text-lg font-medium text-app-text/90">
              Satu langkah kecil hari ini bisa membuatmu hebat besok!
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={data.nextLesson ? `/lessons/${data.nextLesson.id}` : "/disacourse"}>
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
            
            <div className="mt-8 self-start inline-flex items-center gap-2 bg-yellow text-app-text px-6 py-3 rounded-2xl font-bold shadow-[0_4px_0_0_#d99c00] hover:bg-[#e5a90e] transition-colors">
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

      {/* 3 Exclusive Cards: DisaPrivate, DisaConsult & DisaCommunity */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {/* DisaPrivate Callout */}
        <div className="rounded-[32px] bg-white border border-app-border p-6 shadow-soft flex flex-col justify-between gap-6 hover:border-brand-light transition-all">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand shadow-sm shrink-0">
              <GraduationCap size={26} />
            </div>
            <div>
              <span className="text-xs font-bold text-brand uppercase tracking-wider font-mono">DisaPrivate</span>
              <h2 className="text-lg font-black text-brand-dark font-display mt-0.5">Guru Privat & Tutor</h2>
              <p className="mt-1 text-xs font-medium text-app-muted leading-relaxed">
                Tutor Pendidikan Luar Biasa (PLB) dan pendamping calistung ramah anak.
              </p>
            </div>
          </div>
          <Link href="/disaprivate" className="w-full">
            <button className="tactile-btn w-full rounded-2xl bg-brand px-4 py-3 font-black text-xs text-white shadow-[0_4px_0_0_#005bb5] hover:bg-brand-hover">
              Cari Guru Privat →
            </button>
          </Link>
        </div>

        {/* DisaConsult Callout */}
        <div className="rounded-[32px] bg-white border border-app-border p-6 shadow-soft flex flex-col justify-between gap-6 hover:border-emerald-200 transition-all">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-sm shrink-0">
              <Stethoscope size={26} />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">DisaConsult</span>
              <h2 className="text-lg font-black text-brand-dark font-display mt-0.5">Konsultasi Dokter</h2>
              <p className="mt-1 text-xs font-medium text-app-muted leading-relaxed">
                Evaluasi tumbuh kembang bersama dokter spesialis anak & psikolog berlisensi.
              </p>
            </div>
          </div>
          <Link href="/disaconsult" className="w-full">
            <button className="tactile-btn w-full rounded-2xl bg-emerald-600 px-4 py-3 font-black text-xs text-white shadow-[0_4px_0_0_#047857] hover:bg-emerald-700">
              Jadwalkan Dokter →
            </button>
          </Link>
        </div>

        {/* DisaCommunity Callout */}
        <div className="rounded-[32px] bg-white border border-app-border p-6 shadow-soft flex flex-col justify-between gap-6 hover:border-teal-200 transition-all">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 shadow-sm shrink-0">
              <Users size={26} />
            </div>
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider font-mono">DisaCommunity</span>
              <h2 className="text-lg font-black text-brand-dark font-display mt-0.5">Komunitas WhatsApp Kota</h2>
              <p className="mt-1 text-xs font-medium text-app-muted leading-relaxed">
                Cari grup WhatsApp sesama anak disabilitas intelektual di kotamu untuk berteman & bermain.
              </p>
            </div>
          </div>
          <Link href="/disacommunity" className="w-full">
            <button className="tactile-btn w-full rounded-2xl bg-teal-600 px-4 py-3 font-black text-xs text-white shadow-[0_4px_0_0_#0f766e] hover:bg-teal-700">
              Cari Komunitas Kotamu →
            </button>
          </Link>
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
