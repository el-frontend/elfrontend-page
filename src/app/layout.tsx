import MainLayout from "@/layout/main";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Titillium_Web } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { generateMetadata } from "@/lib/metadata";
import { MainProvider } from "@/modules/home/store";
import { ThemeProvider } from "next-themes";
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

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${titillium.variable} antialiased overflow-x-hidden scroll-behavior-smooth`}
      >
        <MainProvider>
          <ThemeProvider
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            attribute="class"
          >
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </MainProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
        {/* Add Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID &&
          process.env.NODE_ENV === "production" && (
            <GoogleTagManager
              gtmId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
            />
          )}
      </body>
    </html>
  );
}
