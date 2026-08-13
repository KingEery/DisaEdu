"use client";

import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api, getActiveChildId } from "@/lib/api/client";
import { ProgressSummary } from "@/types/domain";

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const childId = getActiveChildId();

  useEffect(() => {
    if (childId) api<ProgressSummary>(`/progress/${childId}`).then(setProgress);
  }, [childId]);

  if (!childId) return <div className="p-8">Buat profil anak terlebih dahulu.</div>;
  if (!progress) return <div className="p-8">Memuat progress...</div>;

  return (
    <section className="mx-auto max-w-4xl p-5 md:p-8">
      <h1 className="text-3xl font-bold">Progress Belajar</h1>
      <div className="mt-6 rounded-lg border border-app-border bg-white p-5 shadow-soft">
        <h2 className="font-bold">Overall</h2>
        <p className="mt-3 text-4xl font-bold">{progress.overall}%</p>
        <ProgressBar value={progress.overall} />
      </div>
      <div className="mt-5 space-y-3">
        {progress.courses.map((course) => (
          <div key={course.id} className="rounded-lg border border-app-border bg-white p-4">
            <div className="flex justify-between gap-4">
              <h2 className="font-bold">{course.title}</h2>
              <span>{course.progress}%</span>
            </div>
            <ProgressBar value={course.progress} />
            <p className="mt-2 text-sm text-app-muted">{course.completedLessons} dari {course.totalLessons} materi selesai</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Stat label="materi selesai" value={progress.completedLessons} />
        <Stat label="simulasi selesai" value={progress.simulationCompleted} />
        <Stat label="aktivitas selesai" value={progress.quizAttempts} />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg bg-brand-light p-5 text-center"><p className="text-3xl font-bold">{value}</p><p className="text-app-muted">{label}</p></div>;
}

