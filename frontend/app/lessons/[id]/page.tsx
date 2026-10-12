"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, Sparkles, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api, getActiveChildId, isForbiddenChildError, redirectToProfileOnForbiddenChild } from "@/lib/api/client";
import { Lesson } from "@/types/domain";

type QuizResult = { score: number; correct: number; total: number };

function getEmbedUrl(url?: string | null): string {
  if (!url) return "";
  try {
    if (url.includes("youtube.com/embed/")) {
      return url.split("?")[0];
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtube.com/watch")) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}`;
    }
  } catch {}
  return url;
}

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [videoKey, setVideoKey] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const childId = getActiveChildId();

  useEffect(() => {
    api<Lesson>(`/lessons/${params.id}${childId ? `?childId=${childId}` : ""}`)
      .then(setLesson)
      .catch((error) => {
        if (isForbiddenChildError(error)) window.location.assign("/profile");
        else setError(error instanceof Error ? error.message : "Materi tidak ditemukan.");
      });
  }, [params.id, childId]);

  useEffect(() => {
    if (!childId || !lesson) return;
    api<{ id: string }>("/learning-sessions", { method: "POST", body: JSON.stringify({ childId, lessonId: lesson.id }) })
      .then((session) => setSessionId(session.id))
      .catch(console.error);
  }, [lesson, childId]);

  const completed = useMemo(() => lesson?.progress?.some((item) => item.completed) ?? false, [lesson]);

  async function submitQuiz(event: FormEvent) {
    event.preventDefault();
    if (!childId) return;
    setError("");
    try {
      const quiz = await api<QuizResult>(`/lessons/${params.id}/quiz/submit`, { method: "POST", body: JSON.stringify({ childId, answers }) });
      setResult(quiz);
    } catch (reason) {
      if (!redirectToProfileOnForbiddenChild(reason)) {
        setError(reason instanceof Error ? reason.message : "Jawaban belum dapat disimpan.");
      }
    }
  }

  async function completeLesson() {
    if (!childId || !lesson) return;
    setError("");
    try {
      await api("/progress", { method: "POST", body: JSON.stringify({ childId, lessonId: lesson.id, completed: true, progress: 100, sessionId }) });
      setSaved(true);
    } catch (reason) {
      if (!redirectToProfileOnForbiddenChild(reason)) {
        setError(reason instanceof Error ? reason.message : "Progress belum dapat disimpan.");
      }
    }
  }

  if (!lesson) {
    if (error) {
      return (
        <section className="mx-auto max-w-xl p-8 text-center">
          <div className="rounded-3xl border border-app-border bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-brand-dark">Materi Tidak Ditemukan</h2>
            <p className="mt-3 text-app-muted">ID materi ini mungkin sudah diperbarui setelah seeding data ulang.</p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/disacourse" className="rounded-xl bg-brand px-6 py-3 font-bold text-white shadow-sm">
                Buka DisaCourse
              </Link>
              <Link href="/dashboard" className="rounded-xl border border-app-border bg-app-surface2 px-6 py-3 font-bold text-app-text">
                Dashboard
              </Link>
            </div>
          </div>
        </section>
      );
    }
    return <div className="p-8 text-center font-bold text-app-muted">Memuat materi pembelajaran...</div>;
  }

  return (
    <main className="min-h-screen bg-app-bg pb-16">
      {/* Top Navigation */}
      <div className="border-b border-app-border bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/disacourse" className="flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand focus-ring rounded-lg px-2 py-1">
            <ArrowLeft size={18} /> Kembali ke DisaCourse
          </Link>
          <span className="font-bold text-xs text-app-muted">
            ⏱️ {lesson.duration} Menit
          </span>
        </div>
      </div>

      <section className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
        {error && <p className="rounded-2xl border border-warning bg-warning-light p-4 font-bold text-app-text">{error}</p>}

        {/* Lesson Header Banner */}
        <div className="rounded-[32px] bg-gradient-to-br from-brand-light via-white to-blue-50/50 p-6 md:p-8 border-2 border-brand/10 shadow-soft">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand font-mono">
            <Star size={16} className="fill-brand text-brand" /> Materi Kelas 1 SD
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-black text-brand-dark font-display leading-tight">{lesson.title}</h1>
          <p className="mt-2 text-base md:text-lg font-medium text-app-muted">{lesson.description}</p>
          <div className="mt-5">
            <div className="flex justify-between items-center text-xs font-bold text-app-muted mb-2">
              <span>Status Belajar</span>
              <span>{completed || saved ? "100% Selesai 🎉" : "Sedang Berjalan"}</span>
            </div>
            <ProgressBar value={completed || saved ? 100 : 35} />
          </div>
        </div>

        {/* Video Section */}
        {lesson.videoUrl && (
          <section className="rounded-[32px] border-2 border-white bg-white p-5 md:p-7 shadow-soft">
            <div className="mb-4">
              <h2 className="text-xl font-black text-brand-dark font-display">Tonton Video Pembelajaran</h2>
              <p className="text-xs font-bold text-app-muted">Putar video animasi ceria di bawah ini untuk belajar bersama.</p>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner">
              <iframe
                key={videoKey}
                src={`${getEmbedUrl(lesson.videoUrl)}?autoplay=${videoKey > 0 ? 1 : 0}`}
                title="Video Pembelajaran"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              ></iframe>
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setVideoKey((k) => k + 1)}
                variant="secondary"
                className="rounded-2xl px-6 py-2.5 font-bold text-sm flex items-center gap-2 hover:bg-app-surface2"
              >
                <RotateCcw size={18} /> Putar Ulang Video
              </Button>
            </div>
          </section>
        )}

        {/* Quiz Section */}
        {lesson.quizQuestions && lesson.quizQuestions.length > 0 && (
          <form onSubmit={submitQuiz} className="rounded-[32px] border-2 border-white bg-white p-6 md:p-8 shadow-soft">
            <div className="flex items-center gap-3 border-b border-app-border pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand shadow-sm">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-brand-dark font-display">Kuis Pemahaman</h2>
                <p className="text-xs font-bold text-app-muted">Pilih satu jawaban yang paling tepat</p>
              </div>
            </div>

            <div className="mt-6 space-y-7">
              {lesson.quizQuestions.map((question, qIndex) => (
                <fieldset key={question.id} className="space-y-3">
                  <legend className="text-base md:text-lg font-black text-brand-dark">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-light text-xs font-black text-brand mr-2">
                      {qIndex + 1}
                    </span>
                    {question.question}
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-3 pt-1">
                    {question.options.map((option) => {
                      const isSelected = answers[question.id] === option;
                      return (
                        <label
                          key={option}
                          className={`flex items-center justify-center text-center rounded-2xl p-4 cursor-pointer font-bold text-sm transition-all border-2 ${
                            isSelected
                              ? "bg-brand text-white border-brand-dark shadow-[0_4px_0_0_#005bb5]"
                              : "bg-app-surface2 border-app-border text-app-text hover:bg-white hover:border-brand-light"
                          }`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={isSelected}
                            onChange={() => setAnswers((items) => ({ ...items, [question.id]: option }))}
                            className="sr-only"
                            required
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="mt-7 pt-5 border-t border-app-border flex flex-col sm:flex-row items-center gap-4">
              <Button type="submit" className="tactile-btn rounded-2xl bg-brand px-8 py-3.5 font-black text-base text-white shadow-[0_4px_0_0_#005bb5]">
                Kirim Jawaban Kuis
              </Button>
              {result && (
                <div className="rounded-2xl bg-success-light px-5 py-3 font-bold text-sm text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-success" />
                  <span>Skor: <b>{result.score}</b> (Benar {result.correct} dari {result.total})</span>
                </div>
              )}
            </div>
          </form>
        )}

        {/* Minimalist Completion Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <Button
            onClick={completeLesson}
            disabled={(!result && !completed) || saved}
            className={`w-full sm:w-auto tactile-btn rounded-2xl px-8 py-4 font-black text-base text-white transition-all ${
              saved || completed
                ? "bg-success shadow-[0_4px_0_0_#059669]"
                : "bg-brand hover:bg-brand-hover shadow-[0_4px_0_0_#005bb5] disabled:opacity-50"
            }`}
          >
            {saved || completed ? "✓ Materi Sudah Selesai" : "Selesaikan Materi ⭐"}
          </Button>

          <Link href="/disacourse" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto rounded-2xl px-6 py-4 font-bold text-sm">
              Lanjut ke DisaCourse →
            </Button>
          </Link>
        </div>

        {saved && (
          <p className="rounded-2xl bg-success-light p-4 text-center text-sm font-bold text-emerald-800 animate-in fade-in duration-300">
            🎉 Selamat! Kemajuan belajarmu telah dicatat. Kamu bisa melanjutkan ke materi berikutnya!
          </p>
        )}
      </section>
    </main>
  );
}
