"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api, getActiveChildId } from "@/lib/api/client";
import { Lesson, ProgressSummary } from "@/types/domain";

type Dashboard = { progress: ProgressSummary; lastLesson: Lesson | null; recommendation: string; nextLesson: Lesson | null };

export default function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);
  const childId = getActiveChildId();

  useEffect(() => {
    if (childId) api<Dashboard>(`/dashboard/${childId}`).then(setData);
  }, [childId]);

  if (!childId) return <EmptyProfile />;
  if (!data) return <div className="p-8">Memuat dashboard...</div>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[28px] border border-app-border bg-white p-6 shadow-soft md:p-8">
          <p className="text-sm font-semibold text-brand-dark">Halo, Bunda</p>
          <h1 className="mt-2 max-w-xl text-4xl font-black leading-tight text-app-text md:text-5xl">Lanjutkan belajar dari materi yang paling dekat dengan anak.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-app-muted">Dari satu langkah kecil hari ini, anak bisa membaca, mencoba, lalu berbicara dengan lebih nyaman.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={data.nextLesson ? `/lessons/${data.nextLesson.id}` : "/courses"}><Button className="px-6 py-3 text-base">Lanjutkan Belajar</Button></Link>
            <Link href="/simulation"><Button variant="secondary" className="px-6 py-3 text-base">Latihan ngobrol</Button></Link>
          </div>
        </div>
        <div className="rounded-[28px] border border-app-border bg-brand-light p-6 shadow-soft md:p-8">
          <p className="text-sm font-semibold text-brand-dark">Progress hari ini</p>
          <div className="mt-4 rounded-[24px] bg-white p-5">
            <p className="text-5xl font-black text-app-text">{data.progress.overall}%</p>
            <ProgressBar value={data.progress.overall} />
            <p className="mt-3 text-sm text-app-muted">{data.progress.completedLessons} materi selesai</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Metric title="Materi terakhir" icon={<BookOpen className="text-brand-dark" />} value={data.lastLesson?.title ?? "Belum mulai"} note={data.lastLesson ? "Lanjutkan dari sini." : "Pilih materi pertama."} />
        <Metric title="Rekomendasi DisaAI" icon={<MessageCircle className="text-brand-dark" />} value="1 langkah kecil" note={data.recommendation} />
        <Metric title="Kebiasaan hari ini" icon={<CheckCircle2 className="text-brand-dark" />} value="2 tugas selesai" note="Belajar, lalu latihan percakapan." />
      </div>

      <div className="mt-6 rounded-[28px] border border-app-border bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-2xl font-bold">Urutan hari ini</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {["Buka materi", "Coba quiz", "Latihan ngobrol"].map((item, index) => (
            <div key={item} className={`rounded-2xl p-4 ${index < 2 ? "bg-brand-light" : "bg-app-surface2"}`}>
              <p className="flex items-center gap-2 font-semibold"><CheckCircle2 className={index < 2 ? "text-success" : "text-app-muted"} /> {item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmptyProfile() {
  return (
    <section className="px-4 py-8 md:px-6">
      <div className="rounded-[28px] border border-app-border bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black">Belum ada profil anak.</h1>
        <p className="mt-3 max-w-xl text-app-muted">Buat profil dulu supaya materi, progress, dan rekomendasi bisa mengikuti kebutuhan anak.</p>
        <Link href="/profile"><Button className="mt-6 px-6 py-3">Buat Profil</Button></Link>
      </div>
    </section>
  );
}

function Metric({ title, icon, value, note }: { title: string; icon: React.ReactNode; value: string; note: string }) {
  return (
    <div className="rounded-[24px] border border-app-border bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-app-muted">{title}</h2>
        {icon}
      </div>
      <p className="mt-4 text-2xl font-black text-app-text">{value}</p>
      <p className="mt-2 text-sm text-app-muted">{note}</p>
    </div>
  );
}
