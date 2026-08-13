"use client";

import { useEffect, useMemo, useState } from "react";
import { Bot, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

type StoryStep = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  visualTitle: string;
  visualBody: string;
  prompt: string;
  options: string[];
  aiHint: string;
};

export function LearningStory({ steps }: { steps: StoryStep[] }) {
  const [activeKey, setActiveKey] = useState(steps[0]?.key ?? "");

  useEffect(() => {
    const observers = steps.map((step) => {
      const element = document.getElementById(step.key);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveKey(step.key);
        },
        { rootMargin: "-38% 0px -42% 0px", threshold: 0.01 }
      );

      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [steps]);

  const activeStep = useMemo(
    () => steps.find((step) => step.key === activeKey) ?? steps[0],
    [activeKey, steps]
  );

  const activeIndex = steps.findIndex((step) => step.key === activeStep.key);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="space-y-24 lg:space-y-40">
        {steps.map((step, index) => (
          <section
            id={step.key}
            key={step.key}
            className="flex min-h-[72vh] scroll-mt-28 flex-col justify-center border-l border-app-border pl-6"
          >
            <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-dark">{step.eyebrow}</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight text-app-text md:text-6xl">
              {step.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-app-muted">{step.body}</p>
            <div className="mt-8 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-brand text-sm font-black text-app-text">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-bold text-app-muted">{step.visualTitle}</span>
            </div>
          </section>
        ))}
      </div>

      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <div className="overflow-hidden rounded-[24px] border border-app-border bg-white shadow-soft">
          <div className="bg-brand-light px-5 py-5 md:px-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-dark">Learning moment</p>
                <h3 className="mt-2 text-2xl font-black leading-tight text-app-text">{activeStep.visualTitle}</h3>
              </div>
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-dark">
                <Sparkles size={22} />
              </div>
            </div>
          </div>

          <div className="p-5 md:p-7">
            <div className="grid min-h-72 place-items-center rounded-[24px] bg-surface-secondary p-6 text-center">
              <div>
                <div className="mx-auto grid h-28 w-28 place-items-center rounded-[32px] bg-white text-5xl shadow-soft">
                  {activeIndex === 0 && "🙂"}
                  {activeIndex === 1 && "😟"}
                  {activeIndex === 2 && "🤝"}
                  {activeIndex === 3 && "💬"}
                  {activeIndex >= 4 && "🌱"}
                </div>
                <p className="mt-7 text-3xl font-black leading-tight text-app-text">{activeStep.visualBody}</p>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-lg font-black text-app-text">{activeStep.prompt}</p>
              <div className="mt-4 grid gap-3">
                {activeStep.options.map((option, index) => (
                  <button
                    key={option}
                    className={`focus-ring flex min-h-14 items-center justify-between rounded-2xl border px-4 text-left text-sm font-black transition ${
                      index === 0
                        ? "border-brand-dark bg-brand-light text-app-text"
                        : "border-app-border bg-white text-app-muted hover:bg-surface-secondary"
                    }`}
                  >
                    {option}
                    {index === 0 && <CheckCircle2 className="text-success" size={20} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 border-t border-app-border pt-6">
              <div className="flex items-start gap-4 rounded-[16px] border border-ai-border bg-ai-light p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-white text-ai">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-app-text">DisaAI</p>
                  <p className="mt-1 text-sm leading-6 text-app-muted">{activeStep.aiHint}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Jelaskan lebih sederhana", "Beri contoh", "Aku belum mengerti"].map((action) => (
                      <span key={action} className="rounded-[10px] border border-ai-border bg-white px-3 py-2 text-xs font-bold text-app-text">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between text-sm font-bold text-app-muted">
                <span>Perjalanan belajar</span>
                <span>{activeIndex + 1} dari {steps.length}</span>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {steps.map((step, index) => (
                  <div
                    key={step.key}
                    className={`h-2 rounded-full ${index <= activeIndex ? "bg-brand-dark" : "bg-app-border"}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3 text-sm font-bold text-app-muted">
              <MessageCircle className="text-brand-dark" size={19} />
              <span>DisaTalk tersedia setelah latihan ini.</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
