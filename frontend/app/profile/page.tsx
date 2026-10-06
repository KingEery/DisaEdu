"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api, getActiveChildId, setActiveChildId } from "@/lib/api/client";
import { Child } from "@/types/domain";
import { Plus, HeartHandshake } from "lucide-react";
import logo from "@/assets/logo.png";

const interests = ["Menggambar", "Olahraga", "Game", "Musik", "Membaca"];
const preferences = ["Video", "Aktivitas", "Percakapan", "Teks sederhana"];

export default function ProfilePage() {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [selected, setSelected] = useState<string[]>(["Menggambar"]);
  const [pref, setPref] = useState<string[]>(["Aktivitas"]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeChildId, setActiveChildIdState] = useState<string | null>(null);

  useEffect(() => {
    setActiveChildIdState(getActiveChildId());
    api<Child[]>("/children").then((data) => {
      setChildren(data);
      if (data[0] && !getActiveChildId()) {
        setActiveChildId(data[0].id);
        setActiveChildIdState(data[0].id);
      }
    }).catch(() => router.push("/login"));
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    
    const form = new FormData(event.currentTarget);
    const name = form.get("name") as string;
    const age = Number(form.get("age"));
    
    if (!name.trim()) {
      setError("Nama tidak boleh kosong.");
      setIsLoading(false);
      return;
    }
    if (age < 3 || age > 18) {
      setError("Usia harus antara 3 hingga 18 tahun.");
      setIsLoading(false);
      return;
    }

    try {
      const child = await api<Child>("/children", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          age: age,
          avatar: `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
          interests: selected,
          learningPreferences: pref
        })
      });
      setActiveChildId(child.id);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Profil gagal disimpan. Periksa koneksi Anda.");
      setIsLoading(false);
    }
  }

  function toggle(value: string, list: string[], setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  return (
    <main className="min-h-screen bg-app-bg text-app-text">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-app-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3 focus-ring rounded-xl">
            <Image src={logo} alt="DisaEdu" width={300} height={96} className="h-16 w-auto object-contain" priority />
          </Link>
          <div className="flex items-center gap-4 text-sm font-bold text-app-muted">
            <span className="font-mono text-brand uppercase tracking-widest">Portal Belajar</span>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          
          {/* Left Column: Mascot & Welcome */}
          <div className="relative flex flex-col items-center text-center lg:sticky lg:top-32 lg:items-start lg:text-left">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 top-0 h-[400px] w-[400px] rounded-full motion-safe:animate-[pulse_6s_ease-in-out_infinite] motion-reduce:animate-none bg-[radial-gradient(circle,rgba(0,113,255,0.15)_0%,transparent_70%)]"
              style={{ zIndex: 0 }}
            />
            
            <div className="relative z-10 w-full max-w-[20rem] lg:max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="absolute -right-4 top-10 z-10 rotate-6 rounded-xl bg-white px-4 py-3 text-xs font-bold shadow-soft border border-app-border text-brand-dark font-mono">
                Siap belajar hari ini?
              </div>
              <Image
                src="/maskot2.png"
                alt="Maskot DisaEdu"
                width={500}
                height={500}
                className="mascot-float h-auto w-full drop-shadow-[0_24px_34px_rgba(10,25,48,0.16)]"
                priority
              />
            </div>
            
            <div className="relative z-10 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-wider bg-brand-light text-brand-dark font-mono uppercase">
                <HeartHandshake size={16} />
                Langkah Pertama
              </span>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl font-display text-brand-dark">
                Pilih atau buat profil anak.
              </h1>
              <p className="mt-4 max-w-md text-lg leading-8 text-app-muted font-medium">
                Semua materi dan aktivitas akan disesuaikan secara khusus dengan minat dan cara belajar favorit anak.
              </p>
            </div>
          </div>

          {/* Right Column: Profiles & Form */}
          <div className="relative z-10 flex flex-col gap-10">
            
            {/* Active Profiles */}
            {children.length > 0 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="mb-4 text-2xl font-black font-display text-brand-dark">Lanjutkan Belajar</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {children.map((child) => {
                    const isActive = activeChildId === child.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => {
                          setActiveChildId(child.id);
                          setActiveChildIdState(child.id);
                          router.push("/dashboard");
                        }}
                        className={`group flex flex-col items-center justify-center rounded-[32px] p-6 transition-all duration-300 focus-ring ${isActive ? "bg-white border-2 border-brand shadow-glow-ai scale-[1.02]" : "bg-white/60 backdrop-blur-md border border-white/60 shadow-soft hover:-translate-y-1 hover:shadow-lg hover:border-brand-light"}`}
                      >
                        <div className={`h-24 w-24 overflow-hidden rounded-[28px] border-4 shadow-sm transition-all duration-300 ${isActive ? "border-brand-light bg-brand-light scale-110" : "border-white bg-app-surface2 group-hover:scale-105"}`}>
                          {child.avatar && child.avatar.startsWith("http") ? (
                            <img src={child.avatar} alt={child.name} className="h-full w-full object-cover" />
                          ) : (
                            <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(child.name)}&backgroundColor=E8F1FF,DCE7F5`} alt={child.name} className="h-full w-full object-cover" />
                          )}
                        </div>
                        <h3 className="mt-5 text-2xl font-black font-display text-brand-dark">{child.name}</h3>
                        <p className="mt-1 text-sm font-bold text-app-muted">{child.age} Tahun</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add New Profile Form */}
            <div className="rounded-[40px] p-8 sm:p-10 bg-white/80 backdrop-blur-2xl border-2 border-white shadow-[0_20px_40px_-15px_rgba(0,113,255,0.1)] animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-brand-light text-brand shadow-sm">
                  <Plus size={28} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-black font-display text-brand-dark">Buat Profil Baru</h2>
              </div>
              
              <form onSubmit={submit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-bold text-app-text">Nama Panggilan</span>
                    <input 
                      name="name" 
                      placeholder="Contoh: Budi"
                      required 
                      className="w-full rounded-2xl border-2 border-app-border bg-app-surface2 px-5 py-4 text-lg font-bold text-brand-dark transition-all focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 placeholder:text-app-muted/50 placeholder:font-medium"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-bold text-app-text">Usia (Tahun)</span>
                    <input 
                      name="age" 
                      type="number" 
                      min={3} 
                      max={18} 
                      placeholder="Contoh: 8"
                      required 
                      className="w-full rounded-2xl border-2 border-app-border bg-app-surface2 px-5 py-4 text-lg font-bold text-brand-dark transition-all focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 placeholder:text-app-muted/50 placeholder:font-medium"
                    />
                  </label>
                </div>

                <fieldset>
                  <legend className="mb-4 font-bold text-app-text">Minat Utama</legend>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((item) => {
                      const isSelected = selected.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggle(item, selected, setSelected)}
                          className={`rounded-[16px] px-6 py-3 text-sm font-bold transition-all active:scale-95 ${isSelected ? "bg-brand text-white border-2 border-brand-dark shadow-[0_4px_0_0_#005bb5]" : "bg-white text-app-muted border-2 border-app-border hover:bg-app-surface2 shadow-[0_2px_0_0_rgba(0,0,0,0.05)]"}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-4 font-bold text-app-text">Gaya Belajar Favorit</legend>
                  <div className="flex flex-wrap gap-3">
                    {preferences.map((item) => {
                      const isSelected = pref.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggle(item, pref, setPref)}
                          className={`rounded-[16px] px-6 py-3 text-sm font-bold transition-all active:scale-95 ${isSelected ? "bg-sunrise text-white border-2 border-[#E06233] shadow-[0_4px_0_0_#E06233]" : "bg-white text-app-muted border-2 border-app-border hover:bg-app-surface2 shadow-[0_2px_0_0_rgba(0,0,0,0.05)]"}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {error && (
                  <div className="rounded-2xl p-4 text-sm font-bold bg-[#FFF0EE] text-[#D94533] border border-[#F3A69B] flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="tactile-btn w-full rounded-[24px] px-8 py-5 text-xl font-black text-white shadow-[0_6px_0_0_#005bb5] bg-brand hover:bg-brand-hover active:shadow-[0_0px_0_0_#005bb5] active:translate-y-[6px] disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-4"
                >
                  {isLoading ? "Menyimpan..." : "SIMPAN PROFIL & MULAI BELAJAR"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
