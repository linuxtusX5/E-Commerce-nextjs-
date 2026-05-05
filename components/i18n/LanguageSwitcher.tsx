"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export type Locale = "en" | "ja" | "ko";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  ko: "한국어",
};

const FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  ja: "🇯🇵",
  ko: "🇰🇷",
};

type Props = {
  currentLocale: Locale;
  variant?: "light" | "dark";
};

export function LanguageSwitcher({ currentLocale, variant = "light" }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isDark = variant === "dark";

  //   const handleSelect = async (locale: Locale) => {
  //     setOpen(false);
  //     await fetch("/api/locale", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ locale }),
  //     });
  //     startTransition(() => router.refresh());
  //   };
  const handleSelect = async (locale: Locale) => {
    setOpen(false);
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    });
    window.location.reload();
  };

  return (
    <>
      <style>{`
        .ls-root { position: relative; font-family: 'Sora', sans-serif; }
        .ls-trigger {
          display: flex; align-items: center; gap: 5px;
          height: 34px; padding: 0 10px; border-radius: 9px;
          cursor: pointer; background: none; font-family: 'Sora', sans-serif;
          font-size: 12px; font-weight: 600; transition: all 0.2s;
          border: 1.5px solid ${isDark ? "rgba(255,255,255,0.12)" : "#e2e8f0"};
          color: ${isDark ? "rgba(255,255,255,0.6)" : "#374151"};
        }
        .ls-trigger:hover {
          border-color: ${isDark ? "rgba(255,255,255,0.25)" : "#0ea5e9"};
          color: ${isDark ? "#fff" : "#0ea5e9"};
        }
        .ls-flag { font-size: 14px; line-height: 1; }
        .ls-chevron { transition: transform 0.2s; }
        .ls-chevron-open { transform: rotate(180deg); }
        .ls-dropdown {
          position: absolute; top: calc(100% + 6px); right: 0; z-index: 200;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
          padding: 6px; min-width: 150px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
          animation: lsFade 0.15s ease;
        }
        .ls-option {
          display: flex; align-items: center; gap: 8px; padding: 8px 12px;
          border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500;
          color: #374151; font-family: 'Sora', sans-serif; transition: background 0.1s;
          border: none; background: none; width: 100%; text-align: left;
        }
        .ls-option:hover { background: #f8fafc; }
        .ls-option-active { background: #f0f9ff; color: #0284c7; font-weight: 600; }
        .ls-check { color: #0ea5e9; font-size: 12px; }
        @keyframes lsFade {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="ls-root">
        <button
          className="ls-trigger"
          onClick={() => setOpen((o) => !o)}
          disabled={isPending}
        >
          <span className="ls-flag">{FLAGS[currentLocale]}</span>
          <span>{currentLocale.toUpperCase()}</span>
          <ChevronDown
            size={12}
            className={`ls-chevron ${open ? "ls-chevron-open" : ""}`}
          />
        </button>

        {open && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 199 }}
              onClick={() => setOpen(false)}
            />
            <div className="ls-dropdown">
              {(Object.entries(localeNames) as [Locale, string][]).map(
                ([locale, name]) => (
                  <button
                    key={locale}
                    className={`ls-option ${currentLocale === locale ? "ls-option-active" : ""}`}
                    onClick={() => handleSelect(locale)}
                  >
                    <span className="ls-flag">{FLAGS[locale]}</span>
                    <span style={{ flex: 1 }}>{name}</span>
                    {currentLocale === locale && (
                      <span className="ls-check">✓</span>
                    )}
                  </button>
                ),
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
