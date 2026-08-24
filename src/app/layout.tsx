import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Smart Bar — Кава та чай",
  description:
    "Кав'ярня Smart Bar: кава, чай, кава на розваг. Доставка Новою поштою по Україні.",
  openGraph: {
    title: "Smart Bar",
    description: "Кава та чай з доставкою по Україні",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
