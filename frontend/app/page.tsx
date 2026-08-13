import Image from "next/image";
import Link from "next/link";
import { Sora, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ArrowRight, HeartHandshake, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Catatan: idealnya font di-load sekali di app/layout.tsx, tapi ditaruh di sini
// supaya file ini langsung bisa dipakai tanpa mengubah file lain.
const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" });

// Token warna - satu sumber kebenaran untuk seluruh halaman
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

const journeySteps = [
  {
    label: "Langkah 1",
    title: "Mengenal anak lebih dulu",
    body: "Pendamping mengisi profil singkat: kemampuan awal, gaya instruksi yang cocok, dan dukungan yang dibutuhkan. Materi menyesuaikan sebelum sesi pertama dimulai.",
  },
  {
    label: "Langkah 2",
    title: "Satu materi, satu fokus",
    body: "Setiap materi singkat dan visual, dekat dengan rutinitas harian anak. Tidak ada layar penuh teks - hanya satu konsep sebelum lanjut ke latihan berikutnya.",
  },
  {
    label: "Langkah 3",
    title: "Latihan yang tidak terasa seperti ujian",
    body: "Anak memilih respons, mencocokkan emosi, atau melengkapi kalimat sederhana. Semua dirancang rendah tekanan, dikerjakan bersama pendamping.",
  },
  {
    label: "Langkah 4",
    title: "DisaTalk untuk latihan bicara",
    body: "Satu situasi, satu pertanyaan, satu respons utama. Latihan komunikasi tetap fokus, tanpa obrolan panjang yang membingungkan.",
  },
  {
    label: "Langkah 5",
    title: "Progres yang mudah dibaca",
    body: "Pendamping melihat materi yang sudah selesai, yang perlu diulang, dan saran sesi berikutnya - ditulis dengan bahasa sehari-hari, bukan istilah teknis.",
  },
];

const principles = [
  {
    tag: "P.01",
    title: "Belajar dulu, baru data",
    body: "Halaman pertama yang dilihat anak adalah materi, bukan grafik atau statistik.",
  },
  {
    tag: "P.02",
    title: "AI di samping, bukan di depan",
    body: "DisaAI menjelaskan ulang saat dibutuhkan. Pendamping dan guru tetap memegang kendali penuh.",
  },
  {
    tag: "P.03",
    title: "Progres menunjukkan arah, bukan nilai",
    body: "Tidak ada peringkat atau skor yang membebani. Yang ditampilkan hanya langkah berikutnya yang masuk akal.",
  },
  {
    tag: "P.04",
    title: "Dirancang untuk yang mudah kewalahan",
    body: "Warna, tempo, dan bahasa dipilih supaya anak yang sensitif terhadap stimulasi tetap nyaman belajar.",
  },
];

export default function HomePage() {
  return (
    <main
      className={`${sora.variable} ${plexSans.variable} ${plexMono.variable} min-h-screen [font-family:var(--font-body)]`}
      style={{ backgroundColor: c.cloud, color: c.ink }}
    >
      {/* Header */}
      <header
        className="fixed inset-x-0 top-0 z-40 backdrop-blur-xl"
        style={{ backgroundColor: `${c.cloud}E0`, borderBottom: `1px solid ${c.mist}` }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="DisaEdu" width={200} height={64} className="h-10 w-auto object-contain" priority />
          </Link>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex" style={{ color: c.slate }}>
            <a href="#perjalanan" className="transition-colors hover:text-[var(--brand)]" style={{ "--brand": c.brand } as React.CSSProperties}>
              Perjalanan
            </a>
            <a href="#prinsip" className="transition-colors hover:text-[var(--brand)]" style={{ "--brand": c.brand } as React.CSSProperties}>
              Prinsip
            </a>
            <a href="#mulai" className="transition-colors hover:text-[var(--brand)]" style={{ "--brand": c.brand } as React.CSSProperties}>
              Mulai
            </a>
          </div>
          <Link href="/register">
            <Button
              className="min-h-11 rounded-lg px-5 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: c.brand, fontFamily: "var(--font-body)" }}
            >
              Mulai
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:px-6 md:pb-28 md:pt-40">
        {/* signature: calm breathing glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-20 h-[560px] w-[560px] rounded-full motion-safe:animate-[pulse_6s_ease-in-out_infinite] motion-reduce:animate-none"
          style={{ background: `radial-gradient(circle, ${c.brand}26 0%, transparent 70%)` }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="text-center lg:text-left">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide"
              style={{ backgroundColor: c.brandSoft, color: c.brandDark, fontFamily: "var(--font-mono)" }}
            >
              Ruang belajar yang tenang
            </span>

            <h1
              className="mx-auto mt-6 max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:mx-0"
              style={{ fontFamily: "var(--font-display)", color: c.ink }}
            >
              Belajar terasa lebih ringan, satu langkah kecil di satu waktu.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 lg:mx-0" style={{ color: c.slate }}>
              DisaEdu menemani anak dengan disabilitas intelektual belajar lewat materi
              sederhana, latihan yang tidak menekan, dan DisaAI yang menjelaskan ulang
              dengan cara yang lebih mudah dipahami.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/register">
                <Button
                  className="min-h-14 w-full gap-2 rounded-xl px-7 text-base font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 sm:w-auto"
                  style={{ backgroundColor: c.brand }}
                >
                  Mulai belajar 
                </Button>
              </Link>
              <a href="#perjalanan">
                <Button
                  variant="secondary"
                  className="min-h-14 w-full rounded-xl border px-7 text-base font-bold sm:w-auto"
                  style={{ borderColor: c.mist, color: c.ink, backgroundColor: "transparent" }}
                >
                  Lihat cara kerjanya
                </Button>
              </a>
            </div>

            <p className="mt-5 text-sm" style={{ color: c.slate }}>
              Dipakai berdampingan dengan pendamping - bukan menggantikan peran mereka.
            </p>
          </div>

          {/* Mascot focus */}
          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:mx-0 lg:justify-self-center">
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-8 h-28 rounded-full blur-3xl"
              style={{ backgroundColor: `${c.brand}33` }}
            />
            <div
              aria-hidden
              className="absolute left-4 top-8 h-28 w-28 rounded-full"
              style={{ backgroundColor: c.brandSoft }}
            />
            <div
              aria-hidden
              className="absolute bottom-12 right-0 h-24 w-24 rounded-full"
              style={{ backgroundColor: "#FFF0E8" }}
            />
            <div
              className="absolute right-4 top-4 z-10 rotate-3 rounded-xl bg-white px-4 py-3 text-xs font-medium shadow-md md:right-10"
              style={{ fontFamily: "var(--font-mono)", color: c.brandDark, border: `1px solid ${c.mist}` }}
            >
              DisaAI siap membantu
            </div>

            <div className="mascot-float relative z-0 w-full max-w-[34rem]">
              <Image
                src="/maskot2.png"
                alt="Maskot DisaEdu yang membawa buku"
                width={620}
                height={620}
                className="h-auto w-full drop-shadow-[0_24px_34px_rgba(10,25,48,0.16)]"
                priority
              />
            </div>

            <div
              className="absolute bottom-4 left-4 z-10 max-w-[15rem] rounded-2xl bg-white p-4 text-left shadow-md md:left-8"
              style={{ border: `1px solid ${c.mist}` }}
            >
              <p className="text-xs font-medium" style={{ fontFamily: "var(--font-mono)", color: c.slate }}>
                Materi hari ini
              </p>
              <p className="mt-2 text-lg font-bold leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                Mengenal Emosi
              </p>
              <p className="mt-2 text-sm leading-6" style={{ color: c.slate }}>
                Satu materi kecil, lalu latihan ringan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="perjalanan" className="px-4 py-24 md:px-6">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-medium tracking-wide" style={{ fontFamily: "var(--font-mono)", color: c.brand }}>
            Bagaimana anak belajar di DisaEdu
          </span>
          <h2
            className="mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lima langkah yang dilalui setiap anak - dari kenal profilnya sampai lihat progresnya.
          </h2>

          <div className="relative mt-16">
            <div
              aria-hidden
              className="absolute bottom-0 left-[15px] top-2 w-[2px] md:left-[19px]"
              style={{ background: `linear-gradient(180deg, ${c.brand} 0%, ${c.mist} 100%)` }}
            />
            <ol className="space-y-12">
              {journeySteps.map((step) => (
                <li key={step.label} className="relative pl-12 md:pl-16">
                  <span
                    className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-white text-xs font-bold md:h-10 md:w-10"
                    style={{ border: `2px solid ${c.brand}`, color: c.brand, fontFamily: "var(--font-mono)" }}
                  >
                    {step.label.replace("Langkah ", "")}
                  </span>
                  <p className="text-xs font-medium" style={{ fontFamily: "var(--font-mono)", color: c.slate }}>
                    {step.label}
                  </p>
                  <h3 className="mt-1 text-xl font-bold md:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-7" style={{ color: c.slate }}>
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="prinsip" className="px-4 py-24 md:px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="text-xs font-medium tracking-wide" style={{ fontFamily: "var(--font-mono)", color: c.brand }}>
                Cara kami membangun DisaEdu
              </span>
              <h2
                className="mt-4 text-3xl font-bold leading-tight md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Kami merancang pengalaman belajar, bukan dasbor administrasi.
              </h2>
              <p className="mt-6 max-w-md leading-7" style={{ color: c.slate }}>
                Spesifikasi produk menentukan fiturnya. Empat prinsip di sebelah kanan
                menentukan bagaimana setiap fitur itu terasa saat dipakai anak dan pendampingnya.
              </p>
            </div>

            <div className="grid gap-px sm:grid-cols-2" style={{ backgroundColor: c.mist }}>
              {principles.map((p) => (
                <div key={p.tag} className="bg-white p-7">
                  <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: c.brand }}>
                    {p.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: c.slate }}>
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="mulai" className="relative overflow-hidden px-4 py-24 md:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full motion-safe:animate-[pulse_7s_ease-in-out_infinite] motion-reduce:animate-none"
          style={{ background: `radial-gradient(circle, ${c.brand}1F 0%, transparent 70%)` }}
        />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 pt-4 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <div
              className="mb-5 flex items-center gap-2 text-xs font-medium tracking-wide"
              style={{ fontFamily: "var(--font-mono)", color: c.brand }}
            >
              <HeartHandshake size={18} />
              Dirancang bersama pendamping
            </div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Mulai dari satu materi kecil yang bisa dipahami hari ini.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button
                className="min-h-14 gap-2 rounded-xl px-7 text-base font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: c.brand }}
              >
                Mulai sekarang 
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="secondary"
                className="min-h-14 rounded-xl border px-7 text-base font-bold"
                style={{ borderColor: c.mist, color: c.ink, backgroundColor: "transparent" }}
              >
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-10 md:px-6" style={{ borderTop: `1px solid ${c.mist}` }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Image src="/logo.png" alt="DisaEdu" width={140} height={44} className="h-8 w-auto object-contain opacity-80" />
          <p className="text-sm" style={{ color: c.slate }}>
            Copyright {new Date().getFullYear()} DisaEdu. Dibuat untuk anak dan pendamping yang butuh ketenangan.
          </p>
        </div>
      </footer>
    </main>
  );
}
