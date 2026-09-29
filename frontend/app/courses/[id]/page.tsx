"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api, getActiveChildId, isForbiddenChildError } from "@/lib/api/client";
import { Course } from "@/types/domain";

export default function CourseDetailPage() {
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

  if (!course) return <div className="p-8">Memuat kursus...</div>;

  return (
    <section className="mx-auto max-w-4xl p-5 md:p-8">
      <div className="rounded-lg bg-brand-light p-6">
        <p className="font-semibold text-brand-dark">{course.category}</p>
        <h1 className="mt-2 text-3xl font-bold">{course.title}</h1>
        <p className="mt-2 text-app-muted">{course.description}</p>
        <div className="mt-5"><ProgressBar value={course.progress} /></div>
        <p className="mt-2 font-semibold">Progress: {course.progress}%</p>
      </div>
      <div className="mt-6 space-y-3">
        {course.lessons?.map((lesson) => {
          const completed = lesson.progress?.some((item) => item.completed);
          return (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="focus-ring flex items-center justify-between rounded-lg border border-app-border bg-white p-4 shadow-soft">
              <span className="flex items-center gap-3">{completed ? <CheckCircle2 className="text-success" /> : <Circle className="text-app-muted" />} {lesson.title}</span>
              <Button variant="secondary">Buka</Button>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
