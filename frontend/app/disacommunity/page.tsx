"use client";

import { useMemo, useState } from "react";
import { 
  Users, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  MessageCircle, 
  X, 
  Check, 
  ExternalLink, 
  Sparkles,
  Calendar,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/Button";

type Community = {
  id: string;
  name: string;
  city: string;
  province: string;
  ageGroup: string;
  activityFocus: string;
  memberCount: number;
  moderator: string;
  description: string;
  schedule: string;
  whatsappLink: string;
  isVerified: boolean;
};

const INITIAL_COMMUNITIES: Community[] = [
  {
    id: "comm-1",
    name: "Sahabat Inklusif Jakarta Selatan",
    city: "Jakarta",
    province: "DKI Jakarta",
    ageGroup: "Anak (6-12 Tahun)",
    activityFocus: "Bermain & Rekreasi",
    memberCount: 48,
    moderator: "Bunda Rina & Komunitas Orang Tua Hebat",
    description: "Tempat berteman dan berbagi keceriaan sesama anak disabilitas intelektual di Jakarta. Kami rutin bermain di taman ramah inklusi dan latihan bersosialisasi.",
    schedule: "Kopdar ramah anak setiap Minggu ke-2 di Tebet Eco Park",
    whatsappLink: "https://chat.whatsapp.com/DisaJakartaInklusif",
    isVerified: true
  },
  {
    id: "comm-2",
    name: "Kawan Ceria Tunagrahita Bandung",
    city: "Bandung",
    province: "Jawa Barat",
    ageGroup: "Anak (6-12 Tahun)",
    activityFocus: "Seni & Menggambar",
    memberCount: 36,
    moderator: "Kak Farhan (Volunteer Guru PLB) & Ibu Maya",
    description: "Komunitas teman bermain di Bandung. Anak-anak saling bertukar gambar, mewarnai bersama via video call dan gathering santai di Kiara Artha Park.",
    schedule: "Sesi menggambar bareng setiap Sabtu pagi",
    whatsappLink: "https://chat.whatsapp.com/KawanCeriaBandung",
    isVerified: true
  },
  {
    id: "comm-3",
    name: "Arek Disa Inklusif Surabaya",
    city: "Surabaya",
    province: "Jawa Timur",
    ageGroup: "Remaja (13-18 Tahun)",
    activityFocus: "Olahraga Adaptif",
    memberCount: 42,
    moderator: "Pak Bambang (Persatuan Orang Tua Disabilitas Jatim)",
    description: "Grup ramah anak & remaja tunagrahita di Surabaya untuk saling menyapa, olahraga jalan santai, senam ceria, dan menjalin pertemanan erat.",
    schedule: "Jalan pagi santai sebulan 2 kali di Taman Bungkul",
    whatsappLink: "https://chat.whatsapp.com/ArekDisaSurabaya",
    isVerified: true
  },
  {
    id: "comm-4",
    name: "Sedulur Inklusi Yogyakarta",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    ageGroup: "Semua Usia",
    activityFocus: "Bermain & Rekreasi",
    memberCount: 55,
    moderator: "Ibu Endang, S.Pd. & Komunitas Inklusi Jogja",
    description: "Paguyuban pertemanan anak & orang tua di Jogja. Ruang hangat untuk anak bercerita, saling berkunjung, dan jalan-jalan santai di lingkungan aman.",
    schedule: "Piknik ceria sebulan sekali di Taman Pintar / Lembah UGM",
    whatsappLink: "https://chat.whatsapp.com/SedulurInklusiJogja",
    isVerified: true
  },
  {
    id: "comm-5",
    name: "Kawan Hebat Semarang",
    city: "Semarang",
    province: "Jawa Tengah",
    ageGroup: "Anak (6-12 Tahun)",
    activityFocus: "Belajar Bersama",
    memberCount: 29,
    moderator: "Bunda Dewi & Tim Terapis Semarang",
    description: "Grup pertemanan anak berkebutuhan khusus & slow learner di Semarang. Belajar calistung santai bersama dan bermain puzzle interaktif.",
    schedule: "Belajar bermain bersama tiap Minggu pagi di Simpang Lima",
    whatsappLink: "https://chat.whatsapp.com/KawanHebatSemarang",
    isVerified: true
  },
  {
    id: "comm-6",
    name: "Sahabat Ceria Medan",
    city: "Medan",
    province: "Sumatera Utara",
    ageGroup: "Semua Usia",
    activityFocus: "Bermain & Rekreasi",
    memberCount: 31,
    moderator: "Bunda Sarah & Komunitas Sahabat Peduli Medan",
    description: "Komunitas kawan berteman di Kota Medan untuk anak penyandang disabilitas intelektual. Saling sapa harian lewat audio suara & temu ramah anak.",
    schedule: "Kopdar di Lapangan Merdeka / Taman Cadika sebulan sekali",
    whatsappLink: "https://chat.whatsapp.com/SahabatCeriaMedan",
    isVerified: true
  },
  {
    id: "comm-7",
    name: "Sahabat Bintang Bali Inklusif",
    city: "Bali",
    province: "Bali",
    ageGroup: "Anak (6-12 Tahun)",
    activityFocus: "Seni & Menggambar",
    memberCount: 24,
    moderator: "Bli Wayan & Ibu Ketut (Yayasan Inklusi Denpasar)",
    description: "Grup berteman ceria anak-anak di Denpasar, Badung, dan sekitarnya. Aktivitas membuat prakarya, bermain pasir di pantai, dan bernyanyi bersama.",
    schedule: "Bermain di Pantai Sanur setiap akhir bulan",
    whatsappLink: "https://chat.whatsapp.com/SahabatBintangBali",
    isVerified: true
  },
  {
    id: "comm-8",
    name: "Klub Sahabat Disa Malang",
    city: "Malang",
    province: "Jawa Timur",
    ageGroup: "Remaja (13-18 Tahun)",
    activityFocus: "Bermain & Rekreasi",
    memberCount: 27,
    moderator: "Mas Dimas & Paguyuban Difabel Ramah Malang",
    description: "Wadah berteman dan sosialisasi anak & remaja tunagrahita di Malang Raya. Saling menyemangati, belajar mandiri, dan ngobrol santai.",
    schedule: "Temu santai di Hutan Kota Malabar setiap 3 minggu sekali",
    whatsappLink: "https://chat.whatsapp.com/SahabatDisaMalang",
    isVerified: true
  },
  {
    id: "comm-9",
    name: "Kawan Bersinar Solo Raya",
    city: "Solo",
    province: "Jawa Tengah",
    ageGroup: "Anak (6-12 Tahun)",
    activityFocus: "Belajar Bersama",
    memberCount: 33,
    moderator: "Pak Triyono & Forum Keluarga Inklusi Solo",
    description: "Grup WhatsApp pertemanan untuk anak-anak istimewa di Surakarta dan sekitarnya. Penuh canda tawa dan pendampingan positif dari sesama orang tua.",
    schedule: "Kumpul bermain di Taman Balekambang sebulan sekali",
    whatsappLink: "https://chat.whatsapp.com/KawanBersinarSolo",
    isVerified: true
  },
  {
    id: "comm-10",
    name: "Sahabat Inklusi Anging Mammiri Makassar",
    city: "Makassar",
    province: "Sulawesi Selatan",
    ageGroup: "Semua Usia",
    activityFocus: "Bermain & Rekreasi",
    memberCount: 22,
    moderator: "Ibu Nurul & Relawan Difabel Sulsel",
    description: "Grup hangat untuk anak disabilitas intelektual di Makassar dan Gowa. Berbagi kebahagiaan, janjian jalan sore di Losari, dan bernyanyi ceria.",
    schedule: "Temu ramah di Pantai Losari sebulan sekali",
    whatsappLink: "https://chat.whatsapp.com/SahabatMakassarInklusi",
    isVerified: true
  }
];

const CITIES = [
  "Semua Kota",
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Medan",
  "Bali",
  "Solo",
  "Malang",
  "Makassar"
];

const AGE_GROUPS = [
  "Semua Usia",
  "Anak (6-12 Tahun)",
  "Remaja (13-18 Tahun)"
];

export default function DisaCommunityPage() {
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Semua Kota");
  const [selectedAge, setSelectedAge] = useState("Semua Usia");

  // Join Modal State
  const [activeJoinGroup, setActiveJoinGroup] = useState<Community | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  // Add Group Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    city: "Jakarta",
    province: "",
    ageGroup: "Anak (6-12 Tahun)",
    activityFocus: "Bermain & Rekreasi",
    moderator: "",
    description: "",
    schedule: "",
    whatsappLink: ""
  });
  const [addSuccess, setAddSuccess] = useState(false);

  const filteredCommunities = useMemo(() => {
    return communities.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.province.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      const matchCity = selectedCity === "Semua Kota" || item.city === selectedCity;
      const matchAge = selectedAge === "Semua Usia" || item.ageGroup === selectedAge || item.ageGroup === "Semua Usia";

      return matchSearch && matchCity && matchAge;
    });
  }, [communities, searchQuery, selectedCity, selectedAge]);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroup.name || !newGroup.moderator || !newGroup.whatsappLink) return;

    const created: Community = {
      id: `comm-custom-${Date.now()}`,
      name: newGroup.name,
      city: newGroup.city,
      province: newGroup.province || newGroup.city,
      ageGroup: newGroup.ageGroup,
      activityFocus: newGroup.activityFocus,
      memberCount: 5,
      moderator: newGroup.moderator,
      description: newGroup.description || "Komunitas persahabatan anak disabilitas intelektual di kota ini.",
      schedule: newGroup.schedule || "Jadwal temu ramah disesuaikan kesepakatan grup.",
      whatsappLink: newGroup.whatsappLink.startsWith("http") ? newGroup.whatsappLink : `https://${newGroup.whatsappLink}`,
      isVerified: true
    };

    setCommunities([created, ...communities]);
    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
      setShowAddModal(false);
      setNewGroup({
        name: "",
        city: "Jakarta",
        province: "",
        ageGroup: "Anak (6-12 Tahun)",
        activityFocus: "Bermain & Rekreasi",
        moderator: "",
        description: "",
        schedule: "",
        whatsappLink: ""
      });
    }, 1500);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner (Same format as DisaCourse, DisaPrivate, DisaConsult) */}
      <div className="p-8 md:p-12 ai-gradient-bg rounded-[32px] shadow-glow-ai flex flex-col md:flex-row items-center justify-between gap-8 border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-black text-yellow uppercase tracking-widest drop-shadow-sm mb-2 flex items-center gap-2">
            <Users size={18} className="text-yellow" /> DisaCommunity · Komunitas & Teman Sebaya
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-sm mb-4">
            Cari teman dan komunitas WhatsApp di kotamu.
          </h1>
          <p className="text-base md:text-lg font-medium text-white/90">
            Temukan grup WhatsApp ramah anak disabilitas intelektual di kotamu untuk saling berteman, bermain bersama, dan menjalin persahabatan yang suportif dan aman.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 text-sm font-bold text-white border border-white/30 transition-all shadow-sm"
            >
              <Plus size={16} /> Daftarkan Grup Kotamu
            </button>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/20 backdrop-blur-md px-4 py-2 text-xs font-bold text-emerald-100 border border-emerald-400/30">
              <ShieldCheck size={15} /> Dimoderasi Relawan & Orang Tua
            </div>
          </div>
        </div>

        <div className="w-48 h-48 flex-shrink-0 mascot-float pointer-events-none scale-[1.3] origin-bottom md:origin-bottom-right z-20 md:-mr-4 md:-mb-12">
          <img 
            src="/mascots/talk.png" 
            alt="Mascot DisaCommunity" 
            className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]" 
            onError={(e) => e.currentTarget.style.display = 'none'} 
          />
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="space-y-4 rounded-3xl border border-app-border bg-white p-5 md:p-6 shadow-soft">
        {/* Search Bar */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-app-border bg-app-surface2 px-4 py-3 focus-within:border-brand focus-within:bg-white transition-all">
          <Search size={20} className="text-brand shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama kota, nama komunitas, atau kegiatan (contoh: Jakarta, bermain, melukis, jalan santai)..."
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

        {/* Filter Chips by City */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={15} className="text-brand" />
            <span className="text-xs font-bold text-app-muted font-mono uppercase tracking-wider">Pilih Kota:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  selectedCity === city
                    ? "bg-brand text-white shadow-sm"
                    : "bg-app-surface2 text-app-muted hover:bg-slate-200"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Filter by Age */}
        <div className="flex items-center gap-2 pt-2 border-t border-app-border">
          <span className="text-xs font-bold text-app-muted font-mono mr-1">Usia:</span>
          <div className="flex flex-wrap items-center gap-2">
            {AGE_GROUPS.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  selectedAge === age
                    ? "bg-brand-light text-brand-dark border border-brand/30"
                    : "text-app-muted hover:bg-app-surface2"
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Community Groups Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-black font-display text-brand-dark">
          Grup Komunitas Tersedia ({filteredCommunities.length})
        </h2>
        <span className="text-xs font-bold text-app-muted font-mono">
          Kota: {selectedCity}
        </span>
      </div>

      {/* Community Cards Grid */}
      {filteredCommunities.length === 0 ? (
        <div className="rounded-[32px] border border-app-border bg-white p-12 text-center shadow-soft space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-light text-brand">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-black text-brand-dark font-display">
            Belum Ada Grup di "{selectedCity}"
          </h3>
          <p className="max-w-md mx-auto text-sm text-app-muted">
            Belum menemukan grup untuk filter ini? Jadilah inisiator pertama dengan mendaftarkan grup WhatsApp di kotamu!
          </p>
          <Button onClick={() => setShowAddModal(true)} className="rounded-xl px-6 py-2.5 font-bold">
            <Plus size={16} className="mr-2" /> Daftarkan Grup Kotamu Sekarang
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCommunities.map((comm) => (
            <article
              key={comm.id}
              className="group flex flex-col justify-between rounded-[32px] border-2 border-white/60 bg-white/70 backdrop-blur-xl p-6 md:p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors pointer-events-none"></div>

              <div className="relative z-10 space-y-4">
                {/* Header row: City Badge & Member Count */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-bold text-emerald-800 font-mono">
                    <MapPin size={13} className="text-emerald-600" /> {comm.city}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 font-mono">
                    <Users size={12} className="text-slate-500" /> {comm.memberCount} Teman
                  </span>
                </div>

                {/* Title & Tags */}
                <div>
                  <h3 className="text-xl font-black text-brand-dark font-display leading-snug group-hover:text-brand transition-colors">
                    {comm.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-lg bg-brand-light px-2.5 py-0.5 text-[11px] font-bold text-brand-dark">
                      {comm.ageGroup}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-app-text/90 font-medium leading-relaxed min-h-[3.6rem]">
                  {comm.description}
                </p>

                {/* Schedule & Moderator */}
                <div className="space-y-2 pt-2 border-t border-app-border text-xs text-app-muted">
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-brand shrink-0 mt-0.5" />
                    <span className="font-semibold text-app-text">{comm.schedule}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{comm.moderator}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-2 relative z-10">
                <button
                  onClick={() => setActiveJoinGroup(comm)}
                  className="tactile-btn w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 py-3.5 px-4 font-black text-sm text-white shadow-[0_4px_0_0_#047857] transition-all"
                >
                  <MessageCircle size={18} />
                  Gabung Grup WhatsApp
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal: Join WhatsApp Group Confirmation & Rules */}
      {activeJoinGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-[32px] bg-white p-6 md:p-8 shadow-2xl border border-app-border space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                    Gabung Komunitas
                  </span>
                  <h3 className="text-xl font-black font-display text-brand-dark">
                    {activeJoinGroup.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveJoinGroup(null)}
                className="rounded-full p-1 text-app-muted hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-4 space-y-2 text-xs md:text-sm text-emerald-950">
              <p className="font-bold flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                Aturan & Panduan Komunitas Ramah Disa:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-emerald-900/90 leading-relaxed">
                <li>Grup ini ditujukan untuk anak penyandang disabilitas intelektual & didampingi orang tua/wali.</li>
                <li>Selalu gunakan bahasa yang santun, ramah, dan saling mendukung.</li>
                <li>Dilarang menyebarkan hoaks, iklan tidak relevan, atau konten yang menyinggung.</li>
                <li>Menjaga kerahasiaan data pribadi anak (alamat lengkap, nomor identitas).</li>
              </ul>
            </div>

            <div className="space-y-2 text-xs text-app-muted">
              <p>📍 <b>Lokasi:</b> {activeJoinGroup.city}, {activeJoinGroup.province}</p>
              <p>👥 <b>Moderator:</b> {activeJoinGroup.moderator}</p>
              <p>📅 <b>Agenda Temu Ramah:</b> {activeJoinGroup.schedule}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={activeJoinGroup.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex-1"
              >
                <button className="tactile-btn w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 py-3.5 px-6 font-black text-sm text-white shadow-[0_4px_0_0_#047857]">
                  <ExternalLink size={18} />
                  Buka Tautan WhatsApp
                </button>
              </a>

              <button
                onClick={() => handleCopyLink(activeJoinGroup.whatsappLink)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-app-border bg-app-surface2 hover:bg-slate-200 py-3.5 px-4 font-bold text-xs text-app-text"
              >
                {hasCopied ? (
                  <>
                    <Check size={16} className="text-emerald-600" /> Tersalin!
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="text-brand" /> Salin Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Register New Community */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-[32px] bg-white p-6 md:p-8 shadow-2xl border border-app-border space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-brand uppercase tracking-wider">
                  Komunitas Baru
                </span>
                <h3 className="text-2xl font-black font-display text-brand-dark">
                  Daftarkan Grup WhatsApp Kotamu
                </h3>
                <p className="text-xs text-app-muted mt-1">
                  Bantu anak-anak disabilitas intelektual di kotamu saling mengenal dan berteman.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-full p-1 text-app-muted hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {addSuccess ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-6 text-center space-y-2">
                <Check size={36} className="mx-auto text-emerald-600" />
                <h4 className="font-bold text-emerald-900 text-lg">Grup Berhasil Didaftarkan!</h4>
                <p className="text-xs text-emerald-800">
                  Grup kotamu kini sudah tampil dan siap menyambut teman-teman baru.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-app-text mb-1">
                    Nama Komunitas / Grup *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    placeholder="Contoh: Sahabat Hebat Ceria Solo"
                    className="w-full rounded-xl border border-app-border bg-app-surface2 px-4 py-2.5 text-sm font-semibold outline-none focus:border-brand focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-app-text mb-1">
                      Kota *
                    </label>
                    <select
                      value={newGroup.city}
                      onChange={(e) => setNewGroup({ ...newGroup, city: e.target.value })}
                      className="w-full rounded-xl border border-app-border bg-app-surface2 px-3 py-2.5 text-sm font-semibold outline-none focus:border-brand focus:bg-white"
                    >
                      {CITIES.filter((c) => c !== "Semua Kota").map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-app-text mb-1">
                      Kategori Usia
                    </label>
                    <select
                      value={newGroup.ageGroup}
                      onChange={(e) => setNewGroup({ ...newGroup, ageGroup: e.target.value })}
                      className="w-full rounded-xl border border-app-border bg-app-surface2 px-3 py-2.5 text-sm font-semibold outline-none focus:border-brand focus:bg-white"
                    >
                      {AGE_GROUPS.filter((a) => a !== "Semua Usia").map((age) => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                      <option value="Semua Usia">Semua Usia</option>
                    </select>
                  </div>
                </div>



                <div>
                  <label className="block text-xs font-bold text-app-text mb-1">
                    Tautan Undangan WhatsApp (Invite Link) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGroup.whatsappLink}
                    onChange={(e) => setNewGroup({ ...newGroup, whatsappLink: e.target.value })}
                    placeholder="https://chat.whatsapp.com/..."
                    className="w-full rounded-xl border border-app-border bg-app-surface2 px-4 py-2.5 text-sm font-semibold outline-none focus:border-brand focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-app-text mb-1">
                    Nama Moderator / Penanggung Jawab *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGroup.moderator}
                    onChange={(e) => setNewGroup({ ...newGroup, moderator: e.target.value })}
                    placeholder="Contoh: Bunda Maya (Orang Tua Relawan) & Bpk. Hendra"
                    className="w-full rounded-xl border border-app-border bg-app-surface2 px-4 py-2.5 text-sm font-semibold outline-none focus:border-brand focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-app-text mb-1">
                    Deskripsi Singkat & Kegiatan
                  </label>
                  <textarea
                    rows={3}
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    placeholder="Ceritakan tujuan grup, aktivitas yang sering diadakan, atau jadwal temu ramah anak..."
                    className="w-full rounded-xl border border-app-border bg-app-surface2 px-4 py-2.5 text-sm font-semibold outline-none focus:border-brand focus:bg-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl px-4 py-2.5 font-bold text-xs text-app-muted hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="tactile-btn rounded-xl bg-emerald-600 px-6 py-2.5 font-bold text-xs text-white shadow-[0_4px_0_0_#047857]"
                  >
                    Kirim & Daftarkan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
