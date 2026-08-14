"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api, getActiveChildId } from "@/lib/api/client";
import { Course } from "@/types/domain";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const childId = getActiveChildId();

  useEffect(() => {
    api<Course[]>(`/courses${childId ? `?childId=${childId}` : ""}`).then(setCourses);
  }, [childId]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <div className="mb-10 p-8 md:p-12 ai-gradient-bg rounded-[32px] shadow-glow-ai flex flex-col md:flex-row items-center justify-between gap-8 border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-white/10 blur-2xl"></div>
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-black text-yellow uppercase tracking-widest drop-shadow-sm mb-2">Modul Pembelajaran</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-sm mb-4">Pilih materi yang paling pas untuk langkah berikutnya.</h1>
          <p className="text-lg font-medium text-white/90">Setiap kursus dirancang pendek, konkret, dan mudah dipindah dari layar ke aktivitas harian.</p>
        </div>
        <div className="w-48 h-48 flex-shrink-0 mascot-float pointer-events-none scale-[1.3] origin-bottom md:origin-bottom-right z-20 md:-mr-4 md:-mb-12">
           <img src="/mascots/hero.png" alt="Mascot" className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]" onError={(e) => e.currentTarget.style.display = 'none'} />
        </div>
      </div>

      {/* Grid Materi */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <article key={course.id} className="group flex flex-col justify-between rounded-[32px] border-2 border-white/60 bg-white/60 backdrop-blur-xl p-8 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-2xl group-hover:bg-brand/20 transition-colors pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center text-brand border border-white">
                  <BookOpen size={28} />
                </div>
                <span className="rounded-full bg-yellow/20 px-4 py-1.5 text-xs font-black text-[#d99c00] uppercase tracking-wider">{course.difficulty}</span>
              </div>
              <p className="text-xs font-black text-app-muted uppercase tracking-wider mb-2">{course.category}</p>
              <h2 className="text-2xl font-black text-brand-dark leading-tight">{course.title}</h2>
              <p className="mt-3 text-app-text font-medium text-sm leading-relaxed min-h-[4rem]">{course.description}</p>
            </div>
            
            <div className="mt-8 relative z-10">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold text-app-muted">{course.lessonCount} materi pendek</p>
                <p className="text-sm font-black text-brand">{Math.round(course.progress)}%</p>
              </div>
              {/* Custom Beautiful Progress Bar */}
              <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-white/50 shadow-inner">
                <div className="h-full bg-brand rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: `${course.progress}%` }}>
                  <div className="absolute top-0 left-0 w-full h-full bg-white/20"></div>
                </div>
              </div>
              
              <Link href={`/courses/${course.id}`} className="mt-8 block focus-ring rounded-[20px]">
                <button className="tactile-btn w-full bg-brand text-white font-black text-lg py-4 px-6 rounded-[20px] shadow-[0_6px_0_0_#005bb5] hover:bg-brand-hover transition-colors">
                  {course.progress > 0 ? "LANJUTKAN" : "MULAI BELAJAR"}
                </button>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

