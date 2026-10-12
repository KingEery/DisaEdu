"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  BookOpen, 
  MessageCircle, 
  GraduationCap, 
  Stethoscope, 
  Users, 
  ArrowRight,
  Check
} from "lucide-react";
import logo from "@/assets/logo.png";

const ecosystemFeatures = [
  {
    id: "course",
    tag: "DisaCourse",
    icon: BookOpen,
    iconColor: "text-brand",
    iconBg: "bg-brand/10",
    title: "Modul Belajar Inklusif",
    description: "Materi visual terarah dengan tempo mandiri, durasi singkat, dan penjelasan ramah sensori tanpa rasa takut salah.",
    highlights: ["Materi Bahasa, Angka & Karakter", "Visual konkret ramah kognitif", "Apresiasi bintang tanpa ranking"],
    href: "/disacourse",
    cta: "Jelajahi DisaCourse"
  },
  {
    id: "talk",
    tag: "DisaTalk AI",
    icon: MessageCircle,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    title: "Simulasi Percakapan Sosial",
    description: "Latihan berbicara dua arah dengan suara ramah dan situasi sehari-hari untuk melatih kemandirian serta rasa percaya diri.",
    highlights: ["Text-to-speech lembut & tenang", "Simulasi menyapa & meminjam barang", "Respons selalu apresiatif"],
    href: "/simulation",
    cta: "Coba DisaTalk AI"
  },
  {
    id: "private",
    tag: "DisaPrivate",
    icon: GraduationCap,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    title: "Guru Privat & Tutor PLB",
    description: "Temukan guru Pendidikan Luar Biasa (PLB) dan tutor calistung inklusi berpengalaman untuk sesi belajar tatap muka atau daring.",
    highlights: ["Guru terverifikasi lulusan PLB", "Pilihan sesi ke rumah atau daring", "Jadwal fleksibel & tarif transparan"],
    href: "/disaprivate",
    cta: "Cari Guru Privat"
  },
  {
    id: "consult",
    tag: "DisaConsult",
    icon: Stethoscope,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    title: "Konsultasi Dokter & Psikolog",
    description: "Konsultasi tumbuh kembang anak disabilitas intelektual bersama dokter spesialis anak (Sp.A) dan psikolog klinis berlisensi SIP.",
    highlights: ["Dokter spesialis anak & Sp.KJ", "Psikolog klinis berlisensi SIP", "Telemedisin & jadwal temu klinis"],
    href: "/disaconsult",
    cta: "Jadwalkan Konsultasi"
  },
  {
    id: "community",
    tag: "DisaCommunity",
    icon: Users,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
    title: "Komunitas WhatsApp Kota",
    description: "Grup WhatsApp sesama keluarga dan anak disabilitas intelektual di kotamu untuk saling menyapa, bermain bersama, dan berbagi kasih.",
    highlights: ["Tersedia di 30+ kota di Indonesia", "Dimoderasi relawan & orang tua", "Agenda temu ramah akhir pekan"],
    href: "/disacommunity",
    cta: "Temukan Komunitas Kotamu"
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-app-bg text-app-text selection:bg-brand-light selection:text-brand-dark">
      {/* Minimal Header */}
      <header className="fixed inset-x-0 top-0 z-40 bg-white/90 backdrop-blur-md border-b border-app-border/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-6">
          <Link href="/" className="flex items-center gap-2 focus-ring rounded-xl">
            <Image src={logo} alt="DisaEdu" width={130} height={38} className="h-8 w-auto object-contain" priority />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-bold text-app-muted hover:text-brand px-3 py-2 transition-colors">
              Masuk
            </Link>
            <Link href="/register">
              <button className="tactile-btn rounded-xl bg-brand px-4 py-2.5 text-xs md:text-sm font-black text-white shadow-[0_3px_0_0_#005bb5] hover:bg-brand-hover">
                MULAI SEKARANG
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Clean Minimal Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32 md:px-6 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-black leading-[1.12] tracking-tight md:text-6xl font-display text-brand-dark">
                Belajar lebih tenang, tumbuh lebih percaya diri.
              </h1>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-app-muted font-medium max-w-xl mx-auto lg:mx-0">
                DisaEdu adalah platform ramah anak disabilitas intelektual yang menghadirkan materi visual adaptif, simulasi percakapan AI, tutor privat PLB, telemedisin dokter, dan pertemanan komunitas di kotamu.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/register">
                  <button className="tactile-btn min-h-12 w-full rounded-2xl px-8 text-sm md:text-base font-black text-white shadow-[0_4px_0_0_#005bb5] hover:bg-brand-hover bg-brand sm:w-auto">
                    MULAI BELAJAR GRATIS
                  </button>
                </Link>
                <a href="#fitur">
                  <button className="tactile-btn min-h-12 w-full rounded-2xl border-2 px-7 text-sm md:text-base font-bold sm:w-auto border-app-border text-app-text bg-white hover:bg-app-surface2 shadow-sm">
                    LIHAT 5 FITUR UTAMA
                  </button>
                </a>
              </div>
            </div>

            {/* Mascot Visual - Clean Presentation */}
            <div className="relative flex items-center justify-center">
              <div aria-hidden className="absolute h-72 w-72 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
              <div className="mascot-float relative z-10 w-full max-w-[22rem] md:max-w-[26rem]">
                <img
                  src="/mascots/hero.png"
                  alt="Maskot Ramah DisaEdu"
                  className="h-auto w-full drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Fitur Utama - The Core Platform */}
      <section id="fitur" className="px-4 py-20 md:px-6 bg-white border-t border-app-border/60">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-black leading-tight font-display text-brand-dark">
              Satu platform untuk seluruh kebutuhan buah hati.
            </h2>
            <p className="mt-3 text-base text-app-muted font-medium">
              DisaEdu memadukan lima fitur unggulan untuk mendampingi perkembangan kognitif, sosial, serta kesehatan anak secara menyeluruh.
            </p>
          </div>

          {/* Top 3 Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ecosystemFeatures.slice(0, 3).map((feat) => {
              const Icon = feat.icon;
              return (
                <article
                  key={feat.id}
                  className="rounded-3xl border border-app-border bg-app-surface2/40 p-6 md:p-7 flex flex-col justify-between transition-all duration-200 hover:border-brand/40 hover:bg-white hover:shadow-soft"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feat.iconBg} ${feat.iconColor}`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-bold font-mono text-app-muted uppercase">
                        {feat.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black font-display text-brand-dark">
                        {feat.title}
                      </h3>
                      <p className="mt-2 text-sm text-app-muted font-medium leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-3 border-t border-app-border/60">
                      {feat.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-app-text">
                          <Check size={14} className="text-emerald-600 shrink-0" /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link href={feat.href} className="inline-flex items-center gap-1.5 text-xs font-black text-brand hover:underline">
                      {feat.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom 2 Cards Centered */}
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mt-6">
            {ecosystemFeatures.slice(3).map((feat) => {
              const Icon = feat.icon;
              return (
                <article
                  key={feat.id}
                  className="rounded-3xl border border-app-border bg-app-surface2/40 p-6 md:p-7 flex flex-col justify-between transition-all duration-200 hover:border-brand/40 hover:bg-white hover:shadow-soft"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feat.iconBg} ${feat.iconColor}`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-xs font-bold font-mono text-app-muted uppercase">
                        {feat.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black font-display text-brand-dark">
                        {feat.title}
                      </h3>
                      <p className="mt-2 text-sm text-app-muted font-medium leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-3 border-t border-app-border/60">
                      {feat.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-app-text">
                          <Check size={14} className="text-emerald-600 shrink-0" /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link href={feat.href} className="inline-flex items-center gap-1.5 text-xs font-black text-brand hover:underline">
                      {feat.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer */}
      <footer className="px-4 py-8 md:px-6 border-t border-app-border bg-white text-xs">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image src={logo} alt="DisaEdu" width={120} height={35} className="h-7 w-auto object-contain" />
          <p className="text-app-muted font-medium">
            © {new Date().getFullYear()} DisaEdu · Platform Inklusif untuk Anak Disabilitas Intelektual.
          </p>
        </div>
      </footer>
    </main>
  );
}
