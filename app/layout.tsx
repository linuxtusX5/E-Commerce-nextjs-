import type { Metadata } from "next";
import { AuthSessionProvider } from "@/components/providers/SessionProvider";
import { I18nProvider } from "@/lib/i18n/context";
import { getLocale, getMessages } from "@/lib/i18n/server";
import { CartInitializer } from "@/components/cart/CartInitializer";

export const metadata: Metadata = {
  title: "MyStore — Shop the Latest",
  description: "Discover curated collections of fashion, accessories and more.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <AuthSessionProvider>
          <I18nProvider locale={locale} messages={messages}>
            {children}
          </I18nProvider>
          <CartInitializer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
