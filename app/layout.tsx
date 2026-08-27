import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { event } from "@/lib/data";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://frontier.headstart.co.in";

export const metadata: Metadata = {
  title: `Headstart ${event.fullName} — India's Startup Ecosystem, Together`,
  description: event.description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: `Headstart ${event.fullName} — India's Startup Ecosystem, Together`,
    description: event.description,
    type: "website",
    locale: "en_IN",
    siteName: `Headstart ${event.fullName}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Headstart ${event.fullName} — India's Startup Ecosystem, Together`,
    description: event.description,
  },
  keywords: [
    "Headstart",
    "Frontier Tech Week",
    "startup ecosystem India",
    "founders",
    "investors",
    "December 2026",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
