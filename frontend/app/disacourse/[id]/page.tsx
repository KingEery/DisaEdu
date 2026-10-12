"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api, getActiveChildId, isForbiddenChildError } from "@/lib/api/client";
import { Course } from "@/types/domain";

export default function DisaCourseDetailPage() {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const childId = getActiveChildId();

  useEffect(() => {
    api<Course>(`/courses/${params.id}${childId ? `?childId=${childId}` : ""}`)
      .then(setCourse)
      .catch((error) => {
        if (isForbiddenChildError(error)) window.location.assign("/profile");
        else console.error(error);
      });
  }, [params.id, childId]);

  if (!course) {
    return (
      <div className="mx-auto max-w-4xl p-8 text-center font-bold text-app-muted">
        Memuat modul DisaCourse...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl p-4 md:p-8 space-y-6 animate-in fade-in duration-300">
      <Link 
        href="/disacourse" 
        className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand focus-ring rounded-lg px-2 py-1"
      >
        <ArrowLeft size={18} /> Kembali ke DisaCourse
      </Link>

      <div className="rounded-[32px] bg-gradient-to-br from-brand-light via-white to-blue-50/50 p-6 md:p-8 border-2 border-brand/10 shadow-soft">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand font-mono">
          <BookOpen size={16} /> {course.category}
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-black text-brand-dark font-display leading-tight">
          {course.title}
        </h1>
        <p className="mt-2 text-base md:text-lg font-medium text-app-muted">
          {course.description}
        </p>
        
        <div className="mt-6">
          <div className="flex justify-between items-center text-xs font-bold text-app-muted mb-2">
            <span>Kemajuan Modul</span>
            <span className="font-mono text-brand">{Math.round(course.progress)}%</span>
          </div>
          <ProgressBar value={course.progress} />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-black text-brand-dark font-display pt-2">
          Daftar Materi Pembelajaran ({course.lessons?.length || 0})
        </h2>
        {course.lessons?.map((lesson) => {
          const completed = lesson.progress?.some((item) => item.completed);
          return (
            <Link 
              key={lesson.id} 
              href={`/lessons/${lesson.id}`} 
              className="focus-ring flex items-center justify-between rounded-2xl border border-app-border bg-white p-4 shadow-soft hover:border-brand/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                {completed ? (
                  <CheckCircle2 className="text-success shrink-0" size={20} />
                ) : (
                  <Circle className="text-app-muted shrink-0 group-hover:text-brand" size={20} />
                )}
                <div>
                  <span className="font-bold text-app-text block">{lesson.title}</span>
                  <span className="text-xs text-app-muted">⏱️ {lesson.duration} Menit</span>
                </div>
              </div>
              <Button variant="secondary" className="rounded-xl px-4 py-2 font-bold text-xs">
                {completed ? "Ulangi" : "Buka"}
              </Button>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
