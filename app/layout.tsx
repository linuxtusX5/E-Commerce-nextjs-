import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthSessionProvider } from "@/components/providers/SessionProvider";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartInitializer } from "@/components/cart/CartInitializer";

export const metadata: Metadata = {
  title: "MyStore — Shop the Latest",
  description: "Discover curated collections of fashion, accessories and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <main>{children}</main>
          <CartInitializer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
