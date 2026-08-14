"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Search, Star, Video, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

const experts = [
  {
    id: "1",
    name: "Dr. Amanda Sari",
    role: "Psikolog Anak & Remaja",
    specialty: "Autisme, ADHD, Perilaku",
    rating: 4.9,
    reviews: 124,
    price: "Rp 350.000",
    time: "45 Menit",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Amanda",
    available: ["Hari ini 15:00", "Besok 10:00"]
  },
  {
    id: "2",
    name: "Budi Santoso, M.Pd",
    role: "Tutor Pendidikan Khusus",
    specialty: "Kesulitan Belajar, Disleksia",
    rating: 4.8,
    reviews: 89,
    price: "Rp 200.000",
    time: "60 Menit",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Budi",
    available: ["Besok 14:00", "Lusa 16:00"]
  },
  {
    id: "3",
    name: "Siti Rahma, S.Psi",
    role: "Terapis Wicara",
    specialty: "Keterlambatan Bicara (Speech Delay)",
    rating: 5.0,
    reviews: 210,
    price: "Rp 300.000",
    time: "45 Menit",
    image: "https://api.dicebear.com/9.x/notionists/svg?seed=Siti",
    available: ["Hari ini 18:00"]
  }
];

export default function ConsultationPage() {
  const [filter, setFilter] = useState("Semua");
  const [booking, setBooking] = useState<string | null>(null);

  const filters = ["Semua", "Psikolog", "Tutor", "Terapis Wicara"];

  if (booking) {
    const expert = experts.find(e => e.id === booking);
    return (
      <section className="mx-auto max-w-3xl p-4 py-8 md:p-8">
        <div className="rounded-3xl border border-app-border bg-white p-8 shadow-soft text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-success-light text-success">
            <CheckIcon size={48} />
          </div>
          <h1 className="text-3xl font-black text-app-text">Booking Berhasil!</h1>
          <p className="mt-4 text-lg text-app-muted">Jadwal konsultasi Anda dengan <strong>{expert?.name}</strong> telah dikonfirmasi.</p>
          <div className="mt-8 rounded-2xl bg-app-surface2 p-6 text-left">
            <p className="font-semibold text-app-text">Detail Sesi:</p>
            <ul className="mt-3 space-y-3 text-app-muted">
              <li className="flex gap-3"><Calendar className="text-brand-dark" /> {expert?.available[0]}</li>
              <li className="flex gap-3"><Video className="text-brand-dark" /> Google Meet (Link akan dikirim via email)</li>
              <li className="flex gap-3"><Clock className="text-brand-dark" /> Durasi {expert?.time}</li>
            </ul>
          </div>
          <Button onClick={() => setBooking(null)} className="mt-8 w-full px-8 py-4">Kembali ke Direktori</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl p-4 py-8 md:p-8">
      <div className="mb-8 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-dark">Phase 3 MVP Preview</span>
        <h1 className="mt-4 text-3xl font-black text-app-text md:text-5xl">Konsultasi & Private Teaching</h1>
        <p className="mt-4 text-lg leading-relaxed text-app-muted">
          Dapatkan panduan langsung dari ahli. Jadwalkan sesi video call dengan psikolog atau tutor khusus yang mengerti kebutuhan anak Anda.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-app-border bg-white px-4 py-3 shadow-sm md:w-auto">
          <Search size={20} className="text-app-muted" />
          <input type="text" placeholder="Cari nama atau keahlian..." className="w-full bg-transparent outline-none" />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${filter === f ? "bg-brand text-brand-dark" : "bg-white text-app-muted hover:bg-app-surface2"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {experts.filter(e => filter === "Semua" || e.role.includes(filter)).map((expert) => (
          <div key={expert.id} className="flex flex-col justify-between rounded-3xl border border-app-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
            <div>
              <div className="flex items-start justify-between">
                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-brand-light">
                  <img src={expert.image} alt={expert.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-warning-light px-2 py-1 text-xs font-bold text-yellow-700">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" /> {expert.rating}
                </div>
              </div>
              <h2 className="mt-5 text-xl font-bold text-app-text">{expert.name}</h2>
              <p className="font-semibold text-brand-dark">{expert.role}</p>
              <p className="mt-2 text-sm text-app-muted">{expert.specialty}</p>
            </div>
            
            <div className="mt-6 border-t border-app-border pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-app-text">{expert.price}</span>
                <span className="text-app-muted">/ {expert.time}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {expert.available.map((time, idx) => (
                  <span key={idx} className="rounded-lg bg-app-surface2 px-3 py-1 text-xs font-medium text-app-muted">
                    {time}
                  </span>
                ))}
              </div>
              <Button onClick={() => setBooking(expert.id)} className="mt-6 w-full py-3">Buat Jadwal</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );
}
