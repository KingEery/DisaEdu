"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { api, setToken } from "@/lib/api/client";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const result = await api<{ token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") })
      });
      setToken(result.token);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registrasi gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="grid min-h-screen place-items-center px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-app-border bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold">Daftar DisaEdu</h1>
        <p className="mt-2 text-app-muted">Buat akun orang tua atau pendamping.</p>
        <label className="mt-6 block font-semibold">Email</label>
        <input name="email" type="email" required className="focus-ring mt-2 w-full rounded-lg border border-app-border px-4 py-3" />
        <label className="mt-4 block font-semibold">Password</label>
        <input name="password" type="password" required minLength={6} className="focus-ring mt-2 w-full rounded-lg border border-app-border px-4 py-3" />
        {error && <p className="mt-4 rounded-lg bg-accent-light p-3 text-app-text">{error}</p>}
        <Button disabled={loading} className="mt-6 w-full">{loading ? "Membuat akun..." : "Daftar"}</Button>
        <p className="mt-4 text-center text-sm text-app-muted">Sudah punya akun? <Link className="font-semibold text-brand-dark" href="/login">Masuk</Link></p>
      </form>
    </section>
  );
}

