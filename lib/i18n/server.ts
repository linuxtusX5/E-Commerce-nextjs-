import { cookies } from "next/headers";
import { locales, defaultLocale, type Locale } from "@/i18n";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}

export async function getMessages(locale: Locale) {
  return (await import(`@/messages/${locale}.json`)).default;
}

export async function getT(locale?: Locale) {
  const l = locale ?? (await getLocale());
  const messages = await getMessages(l);

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
