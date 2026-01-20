"use client";

import { SessionProvider } from "next-auth/react";
import { DealsProvider } from "@/context/dealscontext";
import Provider from "@/components/provider";
import "./globals.css";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <SessionProvider>
          <DealsProvider>
            <Provider>{children}</Provider>
          </DealsProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}

// "use client";

// import Provider from "@/components/provider";
// import "./globals.css";
// import { Geist } from "next/font/google";
// import { Analytics } from "@vercel/analytics/react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${geistSans.variable} antialiased`}>
//         <Provider>{children}</Provider>
//         <Analytics />
//       </body>
//     </html>
//   );
// }
