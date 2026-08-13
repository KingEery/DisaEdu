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
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-brand-dark">Belajar</p>
        <h1 className="mt-2 text-4xl font-black text-app-text">Pilih materi yang paling pas untuk langkah berikutnya.</h1>
        <p className="mt-4 text-lg leading-8 text-app-muted">Setiap kursus dirancang pendek, konkret, dan mudah dipindah dari layar ke aktivitas harian.</p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <article key={course.id} className="rounded-[26px] border border-app-border bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <BookOpen className="text-brand-dark" />
              <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-dark">{course.difficulty}</span>
            </div>
            <p className="mt-4 text-sm font-semibold text-app-muted">{course.category}</p>
            <h2 className="mt-2 text-2xl font-bold">{course.title}</h2>
            <p className="mt-3 min-h-16 text-app-muted">{course.description}</p>
            <p className="mt-4 text-sm text-app-muted">{course.lessonCount} materi pendek</p>
            <ProgressBar value={course.progress} />
            <Link href={`/courses/${course.id}`}><Button className="mt-5 w-full">{course.progress > 0 ? "Lanjutkan" : "Mulai"}</Button></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

