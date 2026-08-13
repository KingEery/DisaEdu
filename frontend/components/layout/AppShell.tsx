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
  { href: "/profile", label: "Profil", icon: UserRound }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/";

  if (isAuthPage) return <main className="min-h-screen bg-app-bg">{children}</main>;

  return (
    <div className="min-h-screen bg-app-bg pb-20 md:pb-0">
      <header className="sticky top-0 z-20 border-b border-app-border bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
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
      <main>{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 grid grid-cols-4 border-t border-app-border bg-white md:hidden">
        {nav.slice(0, 4).map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="focus-ring flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold text-app-muted">
              <Icon size={20} /> {item.label === "Dashboard" ? "Home" : item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
