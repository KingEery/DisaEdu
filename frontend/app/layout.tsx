import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "DisaEdu",
  description: "Teman belajar untuk anak dengan disabilitas intelektual"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sora.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased text-app-text bg-app-bg">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
