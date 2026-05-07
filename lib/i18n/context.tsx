"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Locale } from "@/i18n";

type Messages = Record<string, any>;

const I18nContext = createContext<{ messages: Messages; locale: Locale }>({
  messages: {},
  locale: "en",
});

export function I18nProvider({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: Messages;
  locale: Locale;
}) {
  return (
    <I18nContext.Provider value={{ messages, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  const { messages } = useContext(I18nContext);

  return function t(
    key: string,
    params?: Record<string, string | number>,
  ): string {
    const keys = key.split(".");
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value !== "string") return key;
    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(`{${k}}`, String(v)),
        value,
      );
    }
    return value;
  };
}

export function useLocale() {
  return useContext(I18nContext).locale;
}
