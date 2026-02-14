import "./globals.css";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Provider from "@/components/provider";
import Navbar from "@/components/navbar";
import React from "react";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const metadata = {
  title: "TrackPoint CRM",
  description: "Lead management and sales tracking for growing teams.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <Provider>
          <Navbar />

          <main className="bg-white dark:bg-black ">{children}</main>
        </Provider>

        <Analytics />
        <SpeedInsights />
        <Analytics />
        <SpeedInsights />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HHBW2Z5YQN"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-HHBW2Z5YQN');
  `}
        </Script>
      </body>
    </html>
  );
}
