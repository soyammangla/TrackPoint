"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { DealsProvider } from "@/context/dealscontext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <DealsProvider>{children}</DealsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

// "use client";

// import { ThemeProvider } from "next-themes";
// import { SessionProvider } from "next-auth/react";
// import { DealsProvider } from "@/context/dealscontext";

// export default function Provider({ children }: { children: React.ReactNode }) {
//   return (
//     <SessionProvider>
//       <ThemeProvider
//         attribute="class"
//         defaultTheme="system"
//         enableSystem
//         disableTransitionOnChange
//       >
//         <DealsProvider>{children}</DealsProvider>
//       </ThemeProvider>
//     </SessionProvider>
//   );
// }
