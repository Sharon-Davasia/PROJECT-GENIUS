import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import HudShell from "@/components/hud-shell";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["500", "600", "700", "800", "900"],
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PROJECT GENIUS — Stark-Grade Career Operating System",
  description:
    "A JARVIS-style command center for mastering ML, deep learning, full-stack shipping, and launching a startup — in 14-day sprints.",
};

export const viewport: Viewport = {
  themeColor: "#04070d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${grotesk.variable} ${jbmono.variable}`}>
      <body className="bg-abyss text-ink font-sans antialiased min-h-screen">
        <div className="bg-hud-grid fixed inset-0 -z-10" aria-hidden="true" />
        <div className="scan-fx" aria-hidden="true" />
        <div className="scan-beam" aria-hidden="true" />
        <div className="noise-fx" aria-hidden="true" />
        <div className="vignette-fx" aria-hidden="true" />
        <HudShell>{children}</HudShell>
      </body>
    </html>
  );
}
