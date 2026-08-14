"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Home, LogOut, MessageCircle, UserRound, BarChart3 } from "lucide-react";
import { clearToken } from "@/lib/api/client";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/courses", label: "Belajar", icon: BookOpen },
  { href: "/simulation", label: "DisaTalk", icon: MessageCircle },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/consultation", label: "Konsultasi", icon: UserRound },
  { href: "/profile", label: "Profil", icon: UserRound }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/";

  if (isAuthPage) return <main className="min-h-screen bg-app-bg">{children}</main>;

  return (
    <div className="min-h-screen bg-app-bg pb-28 md:pb-8 relative">
      <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-10"></div>
      
      <header className="sticky top-4 z-20 mx-4 md:mx-auto max-w-7xl glass-panel rounded-full mt-4 transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-light text-lg font-bold text-brand-dark">D</span>
            <div>
              <p className="text-sm font-semibold tracking-wide text-app-muted">DisaEdu</p>
              <p className="text-lg font-bold text-app-text">Teman belajar harian</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={`focus-ring flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${active ? "bg-brand-light text-brand-dark" : "text-app-muted hover:bg-app-surface2"}`}>
                  <Icon size={18} /> {item.label}
                </Link>
              );
            })}
            <button
              className="focus-ring flex items-center gap-2 rounded-full border border-app-border px-4 py-2 text-sm font-semibold text-app-muted hover:bg-app-surface2"
              onClick={() => {
                clearToken();
                router.push("/login");
              }}
            >
              <LogOut size={18} /> Keluar
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto pt-8 px-4 md:px-6">{children}</main>
      
      {/* Mobile Floating Dock */}
      <nav className="fixed bottom-6 left-4 right-4 z-30 flex justify-around items-center glass-panel rounded-full py-2 px-2 md:hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
        {nav.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className="focus-ring group relative flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-all duration-200 active:scale-90"
            >
              <div className={`absolute inset-0 rounded-2xl transition-opacity ${active ? "bg-brand-light opacity-100" : "opacity-0 group-hover:bg-app-surface2 group-hover:opacity-100"}`}></div>
              <Icon size={24} className={`relative z-10 transition-colors ${active ? "text-brand-dark" : "text-app-muted"}`} />
              {active && <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-brand-dark"></div>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
