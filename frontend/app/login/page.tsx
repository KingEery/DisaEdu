"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { api, setActiveChildId, setToken } from "@/lib/api/client";
import { Child } from "@/types/domain";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const result = await api<{ token: string; user?: { role?: string } }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") })
      });
      setToken(result.token);
      if (result.user?.role === "ADMIN") {
        router.push("/admin");
        return;
      }
      const children = await api<Child[]>("/children");
      if (children[0]) {
        setActiveChildId(children[0].id);
        router.push("/dashboard");
      } else {
        router.push("/profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="grid min-h-screen place-items-center px-4 mesh-bg relative overflow-hidden">
      {/* Decorative AI Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ai/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Mascot */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-40 h-40 mascot-float pointer-events-none z-20">
          <img src="/mascots/hero.png" alt="Maskot" className="w-full h-full object-contain drop-shadow-xl" onError={(e) => e.currentTarget.style.display = 'none'} />
        </div>

        <form onSubmit={submit} className="w-full rounded-[32px] border-2 border-white/50 bg-white/70 backdrop-blur-2xl p-8 md:p-10 shadow-glow relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 ai-gradient-bg"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-brand-dark">Masuk DisaEdu</h1>
            <p className="mt-2 text-app-muted font-medium text-lg">Lanjutkan petualangan belajarmu.</p>
          </div>

          <label className="block font-bold text-app-text mb-2">Email</label>
          <input name="email" type="email" required className="focus-ring mb-5 w-full rounded-2xl border-2 border-white/80 bg-white/50 px-5 py-4 text-app-text font-medium shadow-sm transition-colors focus:bg-white" placeholder="contoh@email.com" />
          
          <label className="block font-bold text-app-text mb-2">Password</label>
          <input name="password" type="password" required minLength={6} className="focus-ring mb-2 w-full rounded-2xl border-2 border-white/80 bg-white/50 px-5 py-4 text-app-text font-medium shadow-sm transition-colors focus:bg-white" placeholder="••••••••" />
          <p className="text-xs font-semibold text-app-muted">Login admin: admin@disaedu.id / admin123</p>
          
          {error && <p className="mt-4 rounded-xl bg-yellow/20 border border-yellow/50 p-4 text-app-text font-bold text-sm text-center">{error}</p>}
          
          <button disabled={loading} className="tactile-btn mt-8 w-full bg-brand text-white text-xl font-black px-8 py-5 rounded-[20px] shadow-[0_8px_0_0_#005bb5] hover:bg-brand-hover">
            {loading ? "MEMPROSES..." : "MASUK SEKARANG"}
          </button>
          
          <p className="mt-8 text-center font-medium text-app-muted">
            Belum punya akun? <Link className="font-black text-brand hover:text-brand-hover underline decoration-2 underline-offset-4" href="/register">Daftar Di Sini</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
