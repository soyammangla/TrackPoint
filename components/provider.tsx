// "use client";
// import React, { ReactNode } from "react";
// import { SessionProvider } from "next-auth/react";
// // import { ThemeProvider } from "@/components/providers/theme-provider"
// import { Toaster } from "sonner";
// type Props = {
//   children: ReactNode;
// };

// const Provider = ({ children }: Props) => {
//   return (
//     // <ThemeProvider
//     //   attribute="class"
//     //   defaultTheme="Dark"
//     //   enableSystem
//     //   disableTransitionOnChange
//     // >
//     <SessionProvider>
//       {children}
//       <Toaster />
//     </SessionProvider>
//     // </ThemeProvider>
//   );
// };

// export default Provider;

"use client";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

type Props = {
  children: ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
