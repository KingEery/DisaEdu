"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from "recharts";
import { Activity, BookOpen, Clock, TrendingUp, Trophy } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api, getActiveChildId, isForbiddenChildError } from "@/lib/api/client";
import { ProgressSummary } from "@/types/domain";

const activityData = [
  { day: "Sen", jam: 15 },
  { day: "Sel", jam: 30 },
  { day: "Rab", jam: 20 },
  { day: "Kam", jam: 45 },
  { day: "Jum", jam: 25 },
  { day: "Sab", jam: 60 },
  { day: "Min", jam: 40 },
];

const COLORS = ['#0071FF', '#FF7A45', '#7BC9A5'];

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const childId = getActiveChildId();

  useEffect(() => {
    if (!childId) return;
    api<ProgressSummary>(`/progress/${childId}`)
      .then(setProgress)
      .catch((error) => {
        if (isForbiddenChildError(error)) window.location.assign("/profile");
        else console.error(error);
      });
  }, [childId]);

  if (!childId) return <div className="grid min-h-[50vh] place-items-center"><p className="text-lg text-app-muted">Buat profil anak terlebih dahulu.</p></div>;
  if (!progress) return <div className="grid min-h-[50vh] place-items-center"><p className="animate-pulse text-lg text-brand-dark">Memuat dashboard...</p></div>;

  return (
    <section className="mx-auto max-w-6xl p-4 py-8 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-app-text md:text-4xl">Dashboard Pendamping</h1>
        <p className="mt-2 text-lg text-app-muted">Pantau perkembangan belajar dan interaksi anak secara real-time.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard icon={<Trophy className="text-brand-dark" />} label="Skor Keseluruhan" value={`${progress.overall}%`} />
        <StatCard icon={<BookOpen className="text-brand-dark" />} label="Materi Selesai" value={progress.completedLessons.toString()} />
        <StatCard icon={<Activity className="text-success" />} label="Simulasi DisaTalk" value={progress.simulationCompleted.toString()} />
        <StatCard icon={<Clock className="text-sunrise" />} label="Total Waktu (Minggu Ini)" value="3j 15m" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Aktivitas Belajar (Chart) */}
        <div className="rounded-3xl border border-app-border bg-white p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Aktivitas Mingguan (Menit)</h2>
            <TrendingUp className="text-app-muted" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DCE8EB" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3A8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3A8', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(10, 25, 48, 0.08)' }}
                  cursor={{ stroke: '#E8F1FF', strokeWidth: 2 }}
                />
                <Line type="monotone" dataKey="jam" stroke="#0071FF" strokeWidth={4} dot={{ r: 4, fill: '#0071FF', strokeWidth: 2, stroke: '#FFFFFF' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Kursus */}
        <div className="rounded-3xl border border-app-border bg-white p-6 shadow-soft">
          <h2 className="mb-6 text-xl font-bold">Detail Kursus</h2>
          <div className="space-y-5">
            {progress.courses.map((course) => (
              <div key={course.id} className="group rounded-2xl border border-app-border bg-app-surface2 p-5 transition hover:border-brand hover:bg-white hover:shadow-sm">
                <div className="flex justify-between gap-4">
                  <h3 className="font-bold text-app-text">{course.title}</h3>
                  <span className="font-mono font-bold text-brand-dark">{course.progress}%</span>
                </div>
                <div className="mt-3"><ProgressBar value={course.progress} /></div>
                <p className="mt-3 text-sm font-medium text-app-muted">{course.completedLessons} dari {course.totalLessons} materi diselesaikan</p>
              </div>
            ))}
            {progress.courses.length === 0 && <p className="text-app-muted">Belum ada kursus yang dimulai.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-app-border bg-white p-6 shadow-soft transition hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-app-muted">{label}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-app-surface2">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-4xl font-black tracking-tight text-app-text">{value}</p>
    </div>
  );
}
