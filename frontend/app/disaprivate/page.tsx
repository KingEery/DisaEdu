"use client";

import { useEffect, useMemo, useState } from "react";
import { 
  Star, 
  Search, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Home, 
  Video, 
  X, 
  ArrowUpDown,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api/client";

type Expert = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  duration: number;
  image: string;
  slots: string[];
};

type Booking = {
  id: string;
  scheduledAt: string;
  price: number;
  status: string;
  notes?: string;
  expert: Expert;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);

const categoryFilters = [
  "Semua",
  "Guru PLB",
  "Inklusi & Calistung",
  "Motorik & Kemandirian"
];

export default function DisaPrivatePage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState<"rating" | "price" | "reviews">("rating");

  // Booking Modal State
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMode, setSelectedMode] = useState<"Home Visit" | "Online">("Home Visit");
  const [notes, setNotes] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const [expData, bookData] = await Promise.all([
        api<Expert[]>("/consultation/experts"),
        api<Booking[]>("/consultation/bookings")
      ]);
      // Filter for private tutors/teachers
      const tutors = expData.filter((e) => 
        e.id.startsWith("tutor-") || 
        e.role.includes("Guru") || 
        e.role.includes("Tutor") || 
        e.role.includes("PLB")
      );
      setExperts(tutors);

      // Filter bookings for private tutors
      const tutorBookings = bookData.filter((b) =>
        b.expert.id.startsWith("tutor-") || 
        b.expert.role.includes("Guru") || 
        b.expert.role.includes("Tutor") || 
        b.expert.role.includes("PLB")
      );
      setBookings(tutorBookings);
    } catch {
      setError("Silakan login untuk mencari guru privat dan menjadwalkan sesi belajar.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleBook() {
    if (!selectedExpert || !selectedDate) return;
    setError("");
    try {
      const combinedNotes = `[Moda: ${selectedMode}] ${notes ? notes.trim() : "Tidak ada catatan khusus."}`;
      await api("/consultation/bookings", {
        method: "POST",
        body: JSON.stringify({
          expertId: selectedExpert.id,
          scheduledAt: new Date(selectedDate).toISOString(),
          notes: combinedNotes
        })
      });
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedExpert(null);
        setSelectedDate("");
        setNotes("");
        loadData();
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "Pemesanan sesi belum berhasil disimpan.");
    }
  }

  async function handleCancel(id: string) {
    if (!confirm("Apakah Anda yakin ingin membatalkan jadwal belajar ini?")) return;
    try {
      await api(`/consultation/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "cancelled" })
      });
      loadData();
    } catch (err: any) {
      setError(err?.message || "Gagal membatalkan sesi belajar.");
    }
  }

  const filteredExperts = useMemo(() => {
    return experts
      .filter((expert) => {
        const matchSearch =
          searchQuery.trim() === "" ||
          expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expert.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expert.specialty.toLowerCase().includes(searchQuery.toLowerCase());

        let matchCat = true;
        if (selectedCategory === "Guru PLB") {
          matchCat = expert.role.includes("PLB") || expert.role.includes("Pendidikan Luar Biasa");
        } else if (selectedCategory === "Inklusi & Calistung") {
          matchCat = expert.role.includes("Inklusi") || expert.role.includes("Calistung");
        } else if (selectedCategory === "Motorik & Kemandirian") {
          matchCat = expert.role.includes("Motorik") || expert.role.includes("Kemandirian");
        }

        return matchSearch && matchCat;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "reviews") return b.reviews - a.reviews;
        return 0;
      });
  }, [experts, searchQuery, selectedCategory, sortBy]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="p-8 md:p-12 ai-gradient-bg rounded-[32px] shadow-glow-ai flex flex-col md:flex-row items-center justify-between gap-8 border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-black text-yellow uppercase tracking-widest drop-shadow-sm mb-2 flex items-center gap-2">
            <GraduationCap size={18} className="text-yellow" /> DisaPrivate · Guru Privat Inklusif
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-sm mb-4">
            Cari guru privat untuk anak disabilitas intelektual.
          </h1>
          <p className="text-base md:text-lg font-medium text-white/90">
            Temukan guru pendamping khusus, tutor Pendidikan Luar Biasa (PLB), dan pengajar inklusi yang sabar dan berpengalaman mendampingi anak tunagrahita, slow learner, dan kebutuhan khusus.
          </p>
        </div>
        <div className="w-48 h-48 flex-shrink-0 mascot-float pointer-events-none scale-[1.3] origin-bottom md:origin-bottom-right z-20 md:-mr-4 md:-mb-12">
          <img 
            src="/mascots/hero.png" 
            alt="Mascot DisaPrivate" 
            className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]" 
            onError={(e) => e.currentTarget.style.display = 'none'} 
          />
        </div>
      </div>



      {error && (
        <div className="rounded-2xl border border-warning bg-warning-light p-4 text-sm font-bold text-app-text">
          {error}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="space-y-4 rounded-3xl border border-app-border bg-white p-5 md:p-6 shadow-soft">
        {/* Search Input */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-app-border bg-app-surface2 px-4 py-3 focus-within:border-brand focus-within:bg-white transition-all">
          <Search size={20} className="text-brand shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama guru privat, mata pelajaran, atau keahlian (contoh: calistung, tunagrahita, tematik)..."
            className="w-full bg-transparent text-sm md:text-base font-semibold text-app-text outline-none placeholder:text-app-muted/60"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="rounded-full p-1 text-app-muted hover:bg-slate-200"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Categories & Sorting Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-brand text-white shadow-sm"
                    : "bg-app-surface2 text-app-muted hover:text-app-text hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto">
            <ArrowUpDown size={15} className="text-app-muted" />
            <span className="text-xs font-bold text-app-muted">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-app-border bg-app-surface2 px-3 py-1.5 text-xs font-bold text-app-text outline-none focus:border-brand"
            >
              <option value="rating">Rating Tertinggi ⭐</option>
              <option value="price">Biaya Terjangkau 🏷️</option>
              <option value="reviews">Ulasan Terbanyak 💬</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tutor Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl md:text-2xl font-black text-brand-dark">
            Guru Privat Tersedia ({filteredExperts.length})
          </h2>
          {searchQuery && (
            <span className="text-xs font-bold text-app-muted">
              Hasil untuk "{searchQuery}"
            </span>
          )}
        </div>

        {filteredExperts.length === 0 ? (
          <div className="rounded-3xl border border-app-border bg-white p-12 text-center shadow-soft">
            <GraduationCap size={44} className="mx-auto text-app-muted mb-3" />
            <h3 className="text-base font-bold text-app-text">Tidak ada guru privat yang sesuai kriteria</h3>
            <p className="mt-1 text-xs text-app-muted">Coba ubah kata kunci pencarian atau reset filter.</p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="mt-4 rounded-xl text-xs font-bold"
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredExperts.map((expert) => (
              <article
                key={expert.id}
                className="group flex flex-col justify-between rounded-3xl border border-app-border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-light"
              >
                <div>
                  {/* Top: Avatar & Rating */}
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="h-16 w-16 rounded-2xl border border-brand-light bg-app-surface2 object-cover shadow-sm"
                    />
                    <div className="flex flex-col items-end gap-1">
                      <span className="flex items-center gap-1 rounded-xl bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-200">
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                        {expert.rating.toFixed(1)}
                        <span className="text-app-muted font-normal text-[11px]">({expert.reviews})</span>
                      </span>
                      <span className="rounded-xl bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        ✓ Lulusan PLB / Inklusi
                      </span>
                    </div>
                  </div>

                  {/* Name and Role */}
                  <div className="mt-4">
                    <h3 className="font-display text-lg font-black text-brand-dark group-hover:text-brand transition-colors">
                      {expert.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-bold text-brand uppercase tracking-wider font-mono">
                      {expert.role}
                    </p>
                  </div>

                  {/* Specialty */}
                  <div className="mt-3 rounded-2xl bg-app-surface2 p-3 border border-slate-100">
                    <p className="text-xs font-medium text-app-text leading-relaxed">
                      🎯 <b className="font-bold">Pendampingan:</b> {expert.specialty}
                    </p>
                  </div>

                  {/* Slots */}
                  <div className="mt-4">
                    <span className="text-[11px] font-bold text-app-muted uppercase font-mono block mb-1">
                      Jadwal Tersedia:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {expert.slots.map((slot) => (
                        <span
                          key={slot}
                          className="rounded-lg bg-brand-light/60 px-2.5 py-0.5 text-[11px] font-bold text-brand-dark"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom: Price and CTA */}
                <div className="mt-6 pt-4 border-t border-app-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-bold text-app-muted block">Tarif per sesi:</span>
                      <span className="font-display text-base font-black text-brand-dark">
                        {formatCurrency(expert.price)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-app-muted">
                      ⏱️ {expert.duration} Menit
                    </span>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedExpert(expert);
                      setSelectedDate("");
                      setNotes("");
                    }}
                    className="tactile-btn w-full rounded-2xl bg-brand py-3 font-black text-sm text-white shadow-[0_4px_0_0_#005bb5] hover:bg-brand-hover"
                  >
                    Pesan Sesi Belajar
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Booking History Section */}
      <div className="rounded-3xl border border-app-border bg-white p-6 md:p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand shadow-sm">
            <Calendar size={22} />
          </div>
          <div>
            <h2 className="font-display text-xl md:text-2xl font-black text-brand-dark">Riwayat Jadwal Belajar Privat</h2>
            <p className="text-xs font-bold text-app-muted">Daftar jadwal bimbingan belajar anak yang telah dipesan</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-2xl bg-app-surface2 p-6 text-center text-sm font-semibold text-app-muted">
            Belum ada jadwal sesi belajar privat yang dipesan.
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-app-border bg-app-surface2/60 p-5 transition-all"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={booking.expert.image}
                    alt={booking.expert.name}
                    className="h-12 w-12 rounded-2xl bg-white p-1 border object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-display text-sm md:text-base font-black text-brand-dark">
                      {booking.expert.name}
                    </h4>
                    <p className="text-xs font-bold text-brand">{booking.expert.role}</p>
                    <p className="mt-1 text-xs text-app-muted flex items-center gap-2">
                      <Clock size={13} />
                      {new Date(booking.scheduledAt).toLocaleString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}{" "}
                      · <b>{formatCurrency(booking.price)}</b>
                    </p>
                    {booking.notes && (
                      <p className="mt-1 text-xs font-medium text-slate-600 bg-white px-2.5 py-0.5 rounded-lg border w-fit">
                        {booking.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-center">
                  <span
                    className={`rounded-xl px-3 py-1 text-xs font-black uppercase tracking-wider ${
                      booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {booking.status === "cancelled" ? "Dibatalkan" : "Terjadwal"}
                  </span>
                  {booking.status !== "cancelled" && (
                    <Button
                      variant="secondary"
                      onClick={() => handleCancel(booking.id)}
                      className="rounded-xl px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50"
                    >
                      Batalkan
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal Dialog */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 md:p-8 shadow-2xl border border-app-border space-y-5">
            <div className="flex items-start justify-between border-b border-app-border pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedExpert.image}
                  alt={selectedExpert.name}
                  className="h-12 w-12 rounded-2xl bg-brand-light p-1 border object-cover"
                />
                <div>
                  <h3 className="font-display text-lg font-black text-brand-dark">
                    Pesan Sesi Belajar Privat
                  </h3>
                  <p className="text-xs font-bold text-brand">{selectedExpert.name}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedExpert(null)}
                className="rounded-xl p-1.5 text-app-muted hover:bg-app-surface2"
              >
                <X size={20} />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="rounded-2xl bg-success-light p-6 text-center space-y-2">
                <CheckCircle2 size={36} className="mx-auto text-success" />
                <h4 className="text-base font-black text-emerald-900">Jadwal Berhasil Dipesan!</h4>
                <p className="text-xs text-emerald-800 font-medium">
                  Sesi bersama {selectedExpert.name} telah disimpan ke riwayat jadwal belajar Anda.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Learning Mode Selection */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-app-muted font-mono block mb-2">
                    Metode Sesi Belajar:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedMode("Home Visit")}
                      className={`flex items-center justify-center gap-2 rounded-2xl p-3 text-xs font-black border-2 transition-all ${
                        selectedMode === "Home Visit"
                          ? "bg-brand text-white border-brand-dark shadow-sm"
                          : "bg-app-surface2 border-app-border text-app-text hover:bg-white"
                      }`}
                    >
                      <Home size={15} /> Guru ke Rumah
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMode("Online")}
                      className={`flex items-center justify-center gap-2 rounded-2xl p-3 text-xs font-black border-2 transition-all ${
                        selectedMode === "Online"
                          ? "bg-brand text-white border-brand-dark shadow-sm"
                          : "bg-app-surface2 border-app-border text-app-text hover:bg-white"
                      }`}
                    >
                      <Video size={15} /> Video Call Online
                    </button>
                  </div>
                </div>

                {/* Date & Time Picker */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-app-muted font-mono block mb-1.5">
                    Pilih Tanggal & Waktu Belajar:
                  </label>
                  <input
                    type="datetime-local"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full rounded-2xl border-2 border-app-border bg-app-surface2 p-3 text-sm font-bold text-app-text outline-none focus:border-brand focus:bg-white"
                  />
                </div>

                {/* Notes Input */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-app-muted font-mono block mb-1.5">
                    Catatan Kebutuhan Belajar Anak:
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Contoh: Anak kelas 1 SD, bimbingan calistung dengan kartu bergambar..."
                    className="w-full rounded-2xl border-2 border-app-border bg-app-surface2 p-3 text-xs font-medium text-app-text outline-none focus:border-brand focus:bg-white placeholder:text-app-muted/60"
                  />
                </div>

                {/* Price Summary */}
                <div className="rounded-2xl bg-brand-light/60 p-4 border border-brand/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-brand-dark font-bold block">Biaya Sesi Belajar:</span>
                    <span className="font-display text-base font-black text-brand-dark">
                      {formatCurrency(selectedExpert.price)}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-brand">
                    ⏱️ {selectedExpert.duration} Menit
                  </span>
                </div>

                {/* Modal Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setSelectedExpert(null)}
                    className="w-1/3 rounded-2xl py-3 font-bold text-sm"
                  >
                    Batal
                  </Button>
                  <Button
                    type="button"
                    onClick={handleBook}
                    disabled={!selectedDate}
                    className="w-2/3 tactile-btn rounded-2xl bg-brand py-3 font-black text-sm text-white shadow-[0_4px_0_0_#005bb5] hover:bg-brand-hover disabled:opacity-50"
                  >
                    Konfirmasi Booking
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
