"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Sora, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { api, getActiveChildId, setActiveChildId } from "@/lib/api/client";
import { Child } from "@/types/domain";
import { Plus, Check, HeartHandshake } from "lucide-react";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" });

const c = {
  brand: "#0071FF",
  brandDark: "#0058CC",
  brandSoft: "#E8F1FF",
  ink: "#0A1930",
  slate: "#56677A",
  cloud: "#F6F9FC",
  mist: "#DCE7F5",
  sunrise: "#FF7A45",
};

const interests = ["Menggambar", "Olahraga", "Game", "Musik", "Membaca"];
const preferences = ["Video", "Aktivitas", "Percakapan", "Teks sederhana"];

export default function ProfilePage() {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [selected, setSelected] = useState<string[]>(["Menggambar"]);
  const [pref, setPref] = useState<string[]>(["Aktivitas"]);
  const [error, setError] = useState("");
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
    const form = new FormData(event.currentTarget);
    const name = form.get("name") as string;
    try {
      const child = await api<Child>("/children", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          age: Number(form.get("age")),
          avatar: `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
          interests: selected,
          learningPreferences: pref
        })
      });
      setActiveChildId(child.id);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profil belum tersimpan.");
    }
  }

  function toggle(value: string, list: string[], setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  return (
    <main
      className={`${sora.variable} ${plexSans.variable} ${plexMono.variable} min-h-screen [font-family:var(--font-body)]`}
      style={{ backgroundColor: c.cloud, color: c.ink }}
    >
      {/* Header / Navbar */}
      <header
        className="sticky top-0 z-40 backdrop-blur-xl"
        style={{ backgroundColor: `${c.cloud}E0`, borderBottom: `1px solid ${c.mist}` }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="DisaEdu" width={200} height={64} className="h-10 w-auto object-contain" priority />
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium" style={{ color: c.slate }}>
            <span style={{ fontFamily: "var(--font-mono)" }}>Portal Belajar</span>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          
          {/* Left Column: Mascot & Welcome */}
          <div className="relative flex flex-col items-center text-center lg:sticky lg:top-32 lg:items-start lg:text-left">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 top-0 h-[400px] w-[400px] rounded-full motion-safe:animate-[pulse_6s_ease-in-out_infinite] motion-reduce:animate-none"
              style={{ background: `radial-gradient(circle, ${c.brand}26 0%, transparent 70%)`, zIndex: 0 }}
            />
            
            <div className="relative z-10 w-full max-w-[20rem] lg:max-w-md">
              <div
                className="absolute -right-4 top-10 z-10 rotate-6 rounded-xl bg-white px-4 py-3 text-xs font-medium shadow-md"
                style={{ fontFamily: "var(--font-mono)", color: c.brandDark, border: `1px solid ${c.mist}` }}
              >
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
            
            <div className="relative z-10 mt-8">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
                style={{ backgroundColor: c.brandSoft, color: c.brandDark, fontFamily: "var(--font-mono)" }}
              >
                <HeartHandshake size={14} />
                Langkah Pertama
              </span>
              <h1
                className="mt-4 text-4xl font-bold leading-tight md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Pilih atau buat profil anak.
              </h1>
              <p className="mt-4 max-w-md text-lg leading-8" style={{ color: c.slate }}>
                Semua materi dan aktivitas akan disesuaikan secara khusus dengan minat dan cara belajar favorit anak.
              </p>
            </div>
          </div>

          {/* Right Column: Profiles & Form */}
          <div className="relative z-10 flex flex-col gap-10">
            
            {/* Active Profiles */}
            {children.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Lanjutkan Belajar</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => {
                        setActiveChildId(child.id);
                        setActiveChildIdState(child.id);
                        router.push("/dashboard");
                      }}
                      className="group flex flex-col items-center justify-center rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                      style={{ 
                        backgroundColor: activeChildId === child.id ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                        border: `1px solid ${activeChildId === child.id ? c.brand : c.mist}`,
                        boxShadow: activeChildId === child.id ? `0 8px 24px rgba(0, 113, 255, 0.12)` : `0 4px 12px rgba(10, 25, 48, 0.04)`
                      }}
                    >
                      <div className="h-20 w-20 overflow-hidden rounded-full border-4 shadow-sm" style={{ borderColor: c.brandSoft, backgroundColor: c.cloud }}>
                        {child.avatar && child.avatar.startsWith("http") ? (
                          <img src={child.avatar} alt={child.name} className="h-full w-full object-cover" />
                        ) : (
                          <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(child.name)}&backgroundColor=E8F1FF,DCE7F5`} alt={child.name} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <h3 className="mt-4 text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{child.name}</h3>
                      <p className="mt-1 text-sm font-medium" style={{ color: c.slate }}>{child.age} Tahun</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Profile Form */}
            <div 
              className="rounded-3xl p-6 sm:p-10"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${c.mist}`, boxShadow: `0 12px 32px rgba(10, 25, 48, 0.04)` }}
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: c.brandSoft, color: c.brand }}>
                  <Plus size={24} strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Buat Profil Baru</h2>
              </div>
              
              <form onSubmit={submit} className="space-y-8">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-semibold" style={{ color: c.ink }}>Nama Panggilan</span>
                    <input 
                      name="name" 
                      placeholder="Contoh: Budi"
                      required 
                      className="w-full rounded-xl border px-4 py-3 text-base transition-all focus:outline-none focus:ring-2"
                      style={{ borderColor: c.mist, backgroundColor: c.cloud, color: c.ink }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = c.brand; e.currentTarget.style.boxShadow = `0 0 0 3px ${c.brandSoft}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = c.mist; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-semibold" style={{ color: c.ink }}>Usia (Tahun)</span>
                    <input 
                      name="age" 
                      type="number" 
                      min={3} 
                      max={18} 
                      placeholder="Contoh: 8"
                      required 
                      className="w-full rounded-xl border px-4 py-3 text-base transition-all focus:outline-none focus:ring-2"
                      style={{ borderColor: c.mist, backgroundColor: c.cloud, color: c.ink }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = c.brand; e.currentTarget.style.boxShadow = `0 0 0 3px ${c.brandSoft}`; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = c.mist; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </label>
                </div>

                <fieldset>
                  <legend className="mb-3 font-semibold" style={{ color: c.ink }}>Minat Utama</legend>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((item) => {
                      const isSelected = selected.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggle(item, selected, setSelected)}
                          className="rounded-lg px-5 py-2.5 text-sm font-medium transition-all active:scale-95"
                          style={{
                            backgroundColor: isSelected ? c.brand : c.cloud,
                            color: isSelected ? "#FFFFFF" : c.slate,
                            border: `1px solid ${isSelected ? c.brandDark : c.mist}`,
                            boxShadow: isSelected ? `0 4px 12px ${c.brand}40` : "none"
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-3 font-semibold" style={{ color: c.ink }}>Gaya Belajar Favorit</legend>
                  <div className="flex flex-wrap gap-2">
                    {preferences.map((item) => {
                      const isSelected = pref.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggle(item, pref, setPref)}
                          className="rounded-lg px-5 py-2.5 text-sm font-medium transition-all active:scale-95"
                          style={{
                            backgroundColor: isSelected ? c.sunrise : c.cloud,
                            color: isSelected ? "#FFFFFF" : c.slate,
                            border: `1px solid ${isSelected ? '#E06233' : c.mist}`,
                            boxShadow: isSelected ? `0 4px 12px ${c.sunrise}40` : "none"
                          }}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {error && (
                  <div className="rounded-xl p-4 text-sm font-medium" style={{ backgroundColor: '#FFF0EE', color: '#D94533', border: '1px solid #F3A69B' }}>
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full rounded-xl px-7 py-4 text-base font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: c.brand, fontFamily: "var(--font-body)" }}
                >
                  Simpan Profil & Mulai Belajar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

