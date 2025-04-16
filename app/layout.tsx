import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";


export const metadata: Metadata = {
  title: "MenuMaster - Digital Menu Platform",
  description: "Create and manage digital menus for your restaurant",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang?: string };
}>) {
  const lang = params.lang || "ar";
  const translations = {
    en: enTranslations,
    ar: arTranslations,
  };
  const isArabic = lang === "ar";
  const direction = isArabic ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={direction}>
      <body>
        <LanguageProvider translations={translations}>{children}</LanguageProvider>
      </body>
    </html>
  );
}