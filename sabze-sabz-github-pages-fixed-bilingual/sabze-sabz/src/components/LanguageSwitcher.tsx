"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string,
        ) => void;
      };
    };
  }
}

const STORAGE_KEY = "sabze-language";

function setGoogleLanguage(language: "fa" | "en") {
  const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (!select) return false;

  select.value = language;
  select.dispatchEvent(new Event("change"));
  return true;
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<"fa" | "en">("fa");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fa") {
      setLanguage(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "en" ? "ltr" : "rtl";
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "fa",
          includedLanguages: "fa,en",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    if (!document.querySelector('script[data-sabze-google-translate="true"]')) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.dataset.sabzeGoogleTranslate = "true";
      document.body.appendChild(script);
    }

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  const changeLanguage = (next: "fa" | "en") => {
    setLanguage(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === "en" ? "ltr" : "rtl";

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (setGoogleLanguage(next) || tries >= 30) {
        window.clearInterval(timer);
      }
    }, 150);
  };

  return (
    <>
      <div id="google_translate_element" className="pointer-events-none fixed -left-[9999px] top-0 h-0 w-0 overflow-hidden" />
      <div
        className="flex items-center rounded-full border border-ink/10 bg-white/60 p-0.5"
        aria-label="انتخاب زبان"
      >
        <button
          type="button"
          onClick={() => changeLanguage("fa")}
          aria-pressed={language === "fa"}
          className={`min-h-9 rounded-full px-2.5 text-xs font-bold transition-colors ${
            language === "fa" ? "bg-primary text-cream" : "text-sage hover:text-primary"
          }`}
        >
          فارسی
        </button>
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          aria-pressed={language === "en"}
          className={`min-h-9 rounded-full px-2.5 text-xs font-bold transition-colors ${
            language === "en" ? "bg-primary text-cream" : "text-sage hover:text-primary"
          }`}
        >
          EN
        </button>
        <Languages className="mx-1 h-4 w-4 text-sage" aria-hidden="true" />
      </div>
    </>
  );
}
