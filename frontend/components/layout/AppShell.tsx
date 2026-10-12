"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Home, LogOut, MessageCircle, UserRound, BarChart3, GraduationCap, Stethoscope, Users } from "lucide-react";
import { clearToken } from "@/lib/api/client";
import logo from "@/assets/logo.png";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/disacourse", label: "DisaCourse", icon: BookOpen },
  { href: "/disaprivate", label: "DisaPrivate", icon: GraduationCap },
  { href: "/disaconsult", label: "DisaConsult", icon: Stethoscope },
  { href: "/disacommunity", label: "DisaCommunity", icon: Users },
  { href: "/simulation", label: "DisaTalk", icon: MessageCircle },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/profile", label: "Profil", icon: UserRound }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/";

  if (pathname.startsWith("/admin")) return <main className="min-h-screen bg-app-bg">{children}</main>;

  if (isAuthPage) return <main className="min-h-screen bg-app-bg">{children}</main>;

  return (
    <div className="min-h-screen bg-app-bg pb-28 md:pb-8 relative">
      <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-10"></div>
      
      <header className="sticky top-4 z-20 mx-4 md:mx-auto max-w-7xl glass-panel rounded-full mt-4 transition-all duration-300">
        <div className="flex items-center justify-between px-4 lg:px-6 py-2.5">
          <Link href="/dashboard" className="flex items-center shrink-0 mr-3">
            <Image src={logo} alt="DisaEdu" width={110} height={38} className="h-9 w-auto object-contain" priority />
          </Link>
          <div className="hidden items-center gap-1 lg:gap-1.5 md:flex shrink-0">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={`focus-ring flex items-center gap-1.5 rounded-full px-2.5 lg:px-3 py-1.5 text-xs lg:text-[13px] font-semibold transition-all whitespace-nowrap ${active ? "bg-brand-light text-brand-dark shadow-sm" : "text-app-muted hover:bg-app-surface2"}`}>
                  <Icon size={15} /> {item.label}
                </Link>
              );
            })}
            <button
              className="focus-ring flex items-center gap-1.5 rounded-full border border-app-border px-3.5 py-2 text-xs lg:text-sm font-semibold text-app-muted hover:bg-app-surface2"
              onClick={() => {
                clearToken();
                router.push("/login");
              }}
            >
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto pt-8 px-4 md:px-6">{children}</main>
      
      {/* Mobile Floating Dock */}
      <nav className="fixed bottom-4 left-3 right-3 z-30 flex justify-between items-center glass-panel rounded-full py-1.5 px-3 md:hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-x-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className="focus-ring group relative flex flex-col items-center justify-center gap-0.5 p-2 rounded-2xl transition-all duration-200 active:scale-90"
            >
              <div className={`absolute inset-0 rounded-2xl transition-opacity ${active ? "bg-brand-light opacity-100" : "opacity-0 group-hover:bg-app-surface2 group-hover:opacity-100"}`}></div>
              <Icon size={20} className={`relative z-10 transition-colors ${active ? "text-brand-dark" : "text-app-muted"}`} />
              <span className={`relative z-10 text-[9px] font-bold ${active ? "text-brand-dark" : "text-app-muted"}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
