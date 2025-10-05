import "@/lib/dev/fetch-log";

import "@/lib/dev/fetch-log";

import { Suspense } from "react";
import React from "react";
import FloatingAssistant from '@/components/assistant/FloatingAssistant';
import AiButtonBinder from "@/components/AiButtonBinder";
import AiAssistantModal from "@/components/AiAssistantModal";
import WidgetMount from "@/components/assistant/WidgetMount";
import { I18nProvider } from "@/lib/i18n";
import HideBack from "@/components/HideBack";
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DarkModeProvider } from "@/context/DarkModeContext";
import FloatingAiWidget from "@/components/FloatingAiWidget";

/**
 * RootLayout
 * - Server component wrapper that hosts client DarkModeProvider
 * - We don't read theme on the server; the provider sets "dark" on <html> on mount
 * - suppressHydrationWarning avoids mismatch for class on <html>
 */

export const metadata: Metadata = {
  title: "BioMath Core",
  description:
    "BioMath Core — predictive insights and personalized wellness powered by biomathematical modeling and AI.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  metadataBase: new URL("https://biomathcore.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* "dark" class will be toggled by DarkModeProvider (client) */}
      <body className="min-h-screen bg-slate-950 text-slate-200">
      <I18nProvider>
        <DarkModeProvider>
          {/* Skip link for a11y */}
          

          {/* Global header (fixed) */}
          <Header />
            
            
            <AiButtonBinder />
            <AiAssistantModal />
<HideBack />
{/* Main content (offset for fixed header height) */}
          <main id="main-content" className="pt-16">
            {children}
          </main>

          {/* Floating AI assistant on all pages */}
          <FloatingAiWidget />

          {/* Global footer */}
          <Footer />
        </DarkModeProvider>
            </I18nProvider>
      <WidgetMount />
    <WidgetMount />
    <FloatingAssistant />
</body>
    </html>
  );
}
