import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";
import { Nunito, Tajawal } from "next/font/google";


const nunito = Nunito({ subsets: ["latin"] });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "MenuMaster - Digital Menu Platform",
  description: "Create and manage digital menus for your restaurant",
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: string;
  };
}>) {
  const translations = {
    en: enTranslations,
    ar: arTranslations,
  };

  return (
    <html lang="en" dir="ltr">
      <body className={params.lang === "ar" ? tajawal.className : nunito.className}>
        <LanguageProvider translations={translations}>{children}</LanguageProvider>
      </body>
    </html>
  );
}