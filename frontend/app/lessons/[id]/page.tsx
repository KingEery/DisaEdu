"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Mic, Volume2, RotateCcw } from "lucide-react";
import { DisaAiBox } from "@/components/ai/DisaAiBox";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { api, getActiveChildId, isForbiddenChildError, redirectToProfileOnForbiddenChild } from "@/lib/api/client";
import { Lesson } from "@/types/domain";
import { playSoftFemaleVoice } from "@/lib/voice";

type QuizResult = { score: number; correct: number; total: number };

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [activity, setActivity] = useState("");
  const [activityDone, setActivityDone] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [videoKey, setVideoKey] = useState(0);
  const childId = getActiveChildId();

  useEffect(() => {
    api<Lesson>(`/lessons/${params.id}${childId ? `?childId=${childId}` : ""}`)
      .then(setLesson)
      .catch((error) => {
        if (isForbiddenChildError(error)) window.location.assign("/profile");
        else console.error(error);
      });
  }, [params.id, childId]);

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
      await api("/progress", { method: "POST", body: JSON.stringify({ childId, lessonId: lesson.id, completed: true, progress: 100 }) });
      setSaved(true);
    } catch (reason) {
      if (!redirectToProfileOnForbiddenChild(reason)) {
        setError(reason instanceof Error ? reason.message : "Progress belum dapat disimpan.");
      }
    }
  }

  function listen(text: string) {
    playSoftFemaleVoice(text);
  }

  if (!lesson) return <div className="p-8">Memuat materi...</div>;

  return (
    <section className="mx-auto max-w-4xl space-y-6 p-5 md:p-8">
      {error && <p className="rounded-lg border border-warning bg-warning-light p-3 font-semibold text-app-text">{error}</p>}
      <div className="rounded-lg bg-brand-light p-6">
        <p className="font-semibold text-brand-dark">{lesson.duration} menit</p>
        <h1 className="mt-2 text-3xl font-bold">{lesson.title}</h1>
        <p className="mt-2 text-app-muted">{lesson.description}</p>
        <div className="mt-5"><ProgressBar value={completed || saved ? 100 : 30} /></div>
      </div>
      <section className="rounded-lg border border-app-border bg-white p-5 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Materi</h2>
            <p className="mt-3 leading-8 text-app-text">{lesson.content}</p>
          </div>
          <Button variant="secondary" aria-label="Dengarkan materi" onClick={() => listen(lesson.content)}><Volume2 size={18} /></Button>
        </div>
        <div className="mt-5 rounded-lg bg-app-surface2 p-4">
          {lesson.videoUrl ? (
            <div className="flex flex-col items-center gap-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                  key={videoKey}
                  src={`${lesson.videoUrl}?autoplay=${videoKey > 0 ? 1 : 0}`}
                  title="Video Pembelajaran"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                ></iframe>
              </div>
              <Button onClick={() => setVideoKey(k => k + 1)} className="flex w-full max-w-sm items-center justify-center gap-2 py-4 text-lg font-bold" variant="secondary">
                <RotateCcw size={24} /> Putar Ulang Video
              </Button>
            </div>
          ) : (
            lesson.visual
          )}
        </div>
      </section>
      <section className="rounded-lg border border-app-border bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold">Aktivitas</h2>
        <p className="mt-2 text-app-muted">{lesson.activityPrompt}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {["Jawaban yang menunjukkan sikap baik dan aman.", "Berteriak agar cepat dibantu"].map((choice) => (
            <Button key={choice} type="button" variant={activity === choice ? "primary" : "secondary"} onClick={() => { setActivity(choice); setActivityDone(choice === lesson.activityAnswer); }}>{choice}</Button>
          ))}
        </div>
        {activity && <p className={`mt-4 rounded-lg p-3 ${activityDone ? "bg-success-light" : "bg-warning-light"}`}>{activityDone ? "Bagus. Pilihanmu sudah cocok." : "Belum cocok. Coba pilih jawaban yang lebih sopan dan aman."}</p>}
      </section>
      <form onSubmit={submitQuiz} className="rounded-lg border border-app-border bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold">Quiz</h2>
        {lesson.quizQuestions.map((question) => (
          <fieldset key={question.id} className="mt-5">
            <legend className="font-semibold">{question.question}</legend>
            <div className="mt-3 grid gap-2">
              {question.options.map((option) => (
                <label key={option} className="focus-within:outline-brand-dark flex items-center gap-3 rounded-lg border border-app-border p-3">
                  <input type="radio" name={question.id} value={option} onChange={() => setAnswers((items) => ({ ...items, [question.id]: option }))} required />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <Button className="mt-5">Simpan Jawaban</Button>
        {result && <p className="mt-4 rounded-lg bg-success-light p-3"><CheckCircle2 className="inline text-success" /> Skor {result.score}. Benar {result.correct} dari {result.total}.</p>}
      </form>
      {childId && <DisaAiBox childId={childId} lessonId={lesson.id} />}
      <section className="rounded-lg border border-app-border bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold">Voice tetap opsional. Bila mikrofon tidak didukung, gunakan teks.</p>
          <Button variant="secondary" type="button"><Mic size={18} /> Tap mikrofon</Button>
        </div>
      </section>
      <div className="flex flex-wrap gap-3">
        <Button onClick={completeLesson} disabled={!result && !completed}>Selesaikan Materi</Button>
        <Link href="/progress"><Button variant="secondary">Lihat Progress</Button></Link>
      </div>
      {saved && <p className="rounded-lg bg-success-light p-3">Menyimpan progress selesai. Materi sudah ditandai lengkap.</p>}
    </section>
  );
}
