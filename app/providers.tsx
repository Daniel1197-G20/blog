"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { makeStore, AppStore } from "@/store";
import AuthSession from "@/components/auth/AuthSession";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthSession />
        {children}
      </ThemeProvider>
    </Provider>
  );
}

export default Providers;
