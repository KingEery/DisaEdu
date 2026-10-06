import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import HowItWorks from "@/components/ui/how-it-works";
import { TiltCard } from "@/components/ui/tilt-card";
import logo from "@/assets/logo.png";

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
    <main className="min-h-screen bg-app-bg text-app-text">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-app-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3 focus-ring rounded-xl">
            <Image src={logo} alt="DisaEdu" width={180} height={48} className="h-10 w-auto object-contain" priority />
          </Link>
          <div className="hidden items-center gap-8 text-sm font-bold md:flex text-app-muted">
            <a href="#perjalanan" className="transition-colors hover:text-brand">Perjalanan</a>
            <a href="#prinsip" className="transition-colors hover:text-brand">Prinsip</a>
            <a href="#komunitas" className="transition-colors hover:text-brand">Komunitas</a>
            <a href="#mulai" className="transition-colors hover:text-brand">Mulai</a>
          </div>
          <Link href="/register">
            <button className="tactile-btn rounded-xl bg-brand px-6 py-3 text-sm font-black text-white shadow-[0_4px_0_0_#005bb5] hover:bg-brand-hover">
              MULAI SEKARANG
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-32 md:px-6 md:pb-28 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-20 h-[560px] w-[560px] rounded-full motion-safe:animate-[pulse_6s_ease-in-out_infinite] motion-reduce:animate-none bg-[radial-gradient(circle,rgba(0,113,255,0.15)_0%,transparent_70%)]"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wide bg-brand-light text-brand-dark font-mono">
              Ruang belajar yang tenang
            </span>

            <h1 className="mx-auto mt-6 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl lg:mx-0 font-display text-brand-dark">
              Belajar terasa lebih ringan, satu langkah kecil di satu waktu.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 lg:mx-0 text-app-muted font-medium">
              DisaEdu menemani anak dengan disabilitas intelektual belajar lewat materi
              sederhana, latihan yang tidak menekan, dan DisaAI yang menjelaskan ulang
              dengan cara yang lebih mudah dipahami.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/register">
                <button className="tactile-btn min-h-14 w-full gap-2 rounded-xl px-8 text-base font-black text-white shadow-[0_4px_0_0_#005bb5] hover:bg-brand-hover bg-brand sm:w-auto">
                  MULAI BELAJAR 
                </button>
              </Link>
              <a href="#perjalanan">
                <button className="tactile-btn min-h-14 w-full rounded-xl border-2 px-8 text-base font-bold sm:w-auto border-app-border text-app-text bg-white hover:bg-app-surface2">
                  LIHAT CARA KERJANYA
                </button>
              </a>
            </div>

            <p className="mt-5 text-sm text-app-muted font-medium">
              Dipakai berdampingan dengan pendamping - bukan menggantikan peran mereka.
            </p>
          </div>

          {/* Mascot focus */}
          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center lg:mx-0 lg:justify-self-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div aria-hidden className="absolute inset-x-6 bottom-8 h-28 rounded-full blur-3xl bg-brand/20" />
            <div aria-hidden className="absolute left-4 top-8 h-28 w-28 rounded-full bg-brand-light" />
            <div aria-hidden className="absolute bottom-12 right-0 h-24 w-24 rounded-full bg-warning-light" />
            
            <div className="absolute right-4 top-4 z-10 rotate-3 rounded-xl bg-white px-4 py-3 text-xs font-bold shadow-soft md:right-10 border border-app-border text-brand-dark font-mono">
              DisaAI siap membantu
            </div>

            <div className="mascot-float relative z-0 w-full max-w-[34rem] scale-125 origin-bottom md:origin-bottom-right mt-10 md:mt-0">
              <img
                src="/mascots/hero.png"
                alt="Maskot DisaEdu yang ceria"
                className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,113,255,0.25)]"
              />
            </div>

            <div className="absolute bottom-4 left-4 z-10 max-w-[15rem] rounded-2xl bg-white/90 backdrop-blur-md p-5 text-left shadow-glow border border-white/50 md:left-8">
              <p className="text-xs font-bold text-app-muted font-mono uppercase tracking-wider">
                Materi hari ini
              </p>
              <p className="mt-2 text-xl font-black leading-snug font-display text-brand-dark">
                Mengenal Emosi
              </p>
              <p className="mt-2 text-sm leading-6 text-app-text font-medium">
                Satu materi kecil, lalu latihan ringan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="perjalanan" className="px-4 py-24 md:px-6 relative overflow-hidden bg-white">
        <div className="mx-auto max-w-5xl text-center mb-16 relative z-10">
          <span className="text-xs font-bold tracking-wider rounded-full px-4 py-2 bg-brand-light text-brand-dark font-mono uppercase">
            Bagaimana anak belajar di DisaEdu
          </span>
          <h2 className="mt-6 mx-auto max-w-2xl text-4xl font-black leading-tight md:text-5xl font-display text-brand-dark">
            Lima langkah perjalanan belajar anak.
          </h2>
        </div>
        <HowItWorks 
          className="!bg-transparent relative z-10"
          features={[
            {
              title: "Mengenal anak lebih dulu",
              description: "Pendamping mengisi profil singkat: kemampuan awal, gaya instruksi yang cocok, dan dukungan yang dibutuhkan.",
              colorTheme: "blue"
            },
            {
              title: "Satu materi, satu fokus",
              description: "Setiap materi singkat dan visual, dekat dengan rutinitas harian anak. Tidak ada layar penuh teks.",
              colorTheme: "orange"
            },
            {
              title: "Latihan tanpa tekanan",
              description: "Anak memilih respons, mencocokkan emosi, atau melengkapi kalimat sederhana bersama pendamping.",
              colorTheme: "purple"
            },
            {
              title: "DisaTalk AI Voice",
              description: "Satu situasi, satu pertanyaan, satu respons utama. Latihan komunikasi tetap fokus.",
              colorTheme: "blue"
            },
            {
              title: "Progres yang mudah dibaca",
              description: "Pendamping melihat materi yang sudah selesai, dan saran sesi berikutnya dengan bahasa sehari-hari.",
              colorTheme: "orange"
            }
          ]}
        />
      </section>

      {/* Principles */}
      <section id="prinsip" className="px-4 py-24 md:px-6 bg-app-surface2">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="text-xs font-bold tracking-wider font-mono text-brand uppercase">
                Cara kami membangun DisaEdu
              </span>
              <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl font-display text-brand-dark">
                Kami merancang pengalaman belajar, bukan dasbor administrasi.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-app-muted font-medium text-lg">
                Spesifikasi produk menentukan fiturnya. Empat prinsip di sebelah kanan
                menentukan bagaimana setiap fitur itu terasa saat dipakai anak dan pendampingnya.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {principles.map((p) => (
                <div key={p.tag} className="bg-white p-8 rounded-3xl shadow-sm border border-app-border transition-transform hover:-translate-y-1 hover:shadow-soft">
                  <span className="text-xs font-bold font-mono text-brand px-3 py-1 bg-brand-light rounded-full">
                    {p.tag}
                  </span>
                  <h3 className="mt-5 text-xl font-black font-display text-app-text">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-app-muted font-medium">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Events */}
      <section id="komunitas" className="px-4 py-24 md:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-wider font-mono text-brand uppercase bg-brand-light px-4 py-2 rounded-full">
              Komunitas Pendamping
            </span>
            <h2 className="mt-6 text-4xl font-black leading-tight md:text-5xl font-display text-brand-dark">
              Anda tidak berjuang sendirian.
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-app-muted font-medium">
              Bergabung dengan orang tua dan pendamping lainnya. Ikuti event, webinar, dan sesi berbagi pengalaman bersama ahli setiap minggunya.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Webinar: Menghadapi Tantrum",
                date: "24 Agustus 2026",
                speaker: "Dr. Amanda Sari",
                tag: "Online",
              },
              {
                title: "Sesi Berbagi: Kemandirian Anak",
                date: "28 Agustus 2026",
                speaker: "Komunitas DisaEdu",
                tag: "Zoom",
              },
              {
                title: "Workshop: Visual Schedule",
                date: "02 September 2026",
                speaker: "Budi Santoso, M.Pd",
                tag: "Interaktif",
              }
            ].map((event, i) => (
              <TiltCard key={i} className="group rounded-[32px] border border-app-border bg-app-surface2 p-8 hover:bg-white flex flex-col justify-between min-h-[320px]">
                <div className="relative z-20">
                  <span className="inline-block rounded-full bg-warning-light px-3 py-1 text-xs font-bold text-yellow-700">
                    {event.tag}
                  </span>
                  <h3 className="mt-5 text-2xl font-black font-display text-app-text group-hover:text-brand transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-3 font-semibold text-brand-dark">
                    Bersama {event.speaker}
                  </p>
                </div>
                <div className="relative z-20 mt-8 flex items-center justify-between border-t border-app-border pt-6">
                  <span className="text-sm font-bold text-app-muted flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {event.date}
                  </span>
                  <button className="text-sm font-black text-brand uppercase hover:text-brand-dark transition-colors tracking-wide">
                    Daftar
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="mulai" className="relative overflow-hidden px-4 py-24 md:px-6 bg-app-surface2">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full motion-safe:animate-[pulse_7s_ease-in-out_infinite] motion-reduce:animate-none bg-[radial-gradient(circle,rgba(0,113,255,0.1)_0%,transparent_70%)]"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 pt-4 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-2 text-xs font-bold tracking-wider font-mono text-brand uppercase">
              <HeartHandshake size={18} />
              Dirancang bersama pendamping
            </div>
            <h2 className="text-4xl font-black leading-tight md:text-5xl font-display text-brand-dark">
              Mulai dari satu materi kecil yang bisa dipahami hari ini.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <button className="tactile-btn min-h-14 gap-2 rounded-xl px-8 text-base font-black text-white shadow-[0_4px_0_0_#005bb5] bg-brand hover:bg-brand-hover">
                MULAI SEKARANG 
              </button>
            </Link>
            <Link href="/login">
              <button className="tactile-btn min-h-14 rounded-xl border-2 px-8 text-base font-bold border-app-border text-app-text bg-white hover:bg-app-surface2">
                MASUK
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-10 md:px-6 border-t border-app-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Image src={logo} alt="DisaEdu" width={140} height={44} className="h-10 w-auto object-contain opacity-80" />
          <p className="text-sm font-medium text-app-muted">
            Copyright {new Date().getFullYear()} DisaEdu. Dibuat untuk anak dan pendamping yang butuh ketenangan.
          </p>
        </div>
      </footer>
    </main>
  );
}
