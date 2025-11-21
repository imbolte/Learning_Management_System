// import React,{ReactNode} from "react";
// import { Provider } from "react-redux";
// import {store} from "../redux/store" 

// interface ProviderProps {
//     children:ReactNode
// }

// export function Providers({children}: ProviderProps){
//     return <Provider store={store}>{children}</Provider>
// }

// app/providers.tsx (or wherever you're placing it)
// app/providers.tsx
"use client";

import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store"; // adjust path if different
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </ThemeProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}

