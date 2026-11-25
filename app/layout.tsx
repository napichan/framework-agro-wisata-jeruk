import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agro Jeruk Selorejo — Wisata Petik Jeruk & Edukasi Kebun",
  description:
    "Nikmati pengalaman edukasi & rekreasi keluarga memetik jeruk segar pilihan di Kebun Jeruk Selorejo, Malang. Reservasi digital, tiket bebas antre, dan AI Ripeness Scanner.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-neutral-900">
        {children}
      </body>
    </html>
  );
}
