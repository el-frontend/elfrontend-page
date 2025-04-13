import MainLayout from "@/layout/main";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Titillium_Web } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { MainProvider } from "@/modules/home/store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const titillium = Titillium_Web<"--font-titillium-web">({
  variable: "--font-titillium-web",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "ElFrontend",
  description: "ElFrontend - Official Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${titillium.variable} antialiased dark overflow-x-hidden`}
      >
        <MainProvider>
          <MainLayout>{children}</MainLayout>
        </MainProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
