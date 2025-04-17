/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { setCookie, getCookie } from "cookies-next"
// import { Tajawal, Nunito } from "next/font/google";

type Language = "en" | "ar"
type Direction = "ltr" | "rtl"

interface LanguageContextType {
  language: Language
  direction: Direction
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  tArray: (key: string) => any[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// const nunito = Nunito({ subsets: ["latin"] });
// const tajawal = Tajawal({ weight: "500", subsets: ["latin"] });

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
  translations: {
    en: Record<string, any>
    ar: Record<string, any>
  }
}

export function LanguageProvider({ children, translations }: LanguageProviderProps) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>("en");
  const [direction, setDirection] = useState<Direction>("ltr");

  useEffect(() => {
    const savedLanguage = getCookie("language") as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
      setDirection(savedLanguage === "ar" ? "rtl" : "ltr");
      document.documentElement.lang = savedLanguage;
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
      // document.body.className = savedLanguage === "ar" ? tajawal.className : nunito.className;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setDirection(lang === "ar" ? "rtl" : "ltr");
    setCookie("language", lang, { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    // document.body.className = lang === "ar" ? tajawal.className : nunito.className;

    // Update the URL with the new language parameter
    const currentPath = window.location.pathname; // Get the current path without query params
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("lang", lang) // Set the 'lang' parameter
    router.push(`${currentPath}?${searchParams.toString()}`) // Update the URL

    // Refresh the page to apply RTL/LTR changes
    router.refresh();
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }

    return typeof value === "string" ? value : key;
  };

  const tArray = (key: string) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return []; // Return an empty array if translation not found
      }
    }

    return Array.isArray(value) ? value : [];
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}
