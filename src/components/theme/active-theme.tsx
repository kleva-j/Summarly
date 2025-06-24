"use client";

import { COOKIE_NAME, DEFAULT_THEME } from "@/lib/constants";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return;

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; samesite=Lax; ${
    window.location.protocol === "https:" ? "secure;" : ""
  }`;
}

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ActiveThemeProviderProps {
  children: ReactNode;
  initialTheme?: string;
}

export function ActiveThemeProvider(props: ActiveThemeProviderProps) {
  const { children, initialTheme } = props;

  const [activeTheme, setActiveTheme] = useState<string>(
    () => initialTheme || DEFAULT_THEME
  );

  useEffect(() => {
    setThemeCookie(activeTheme);

    for (const className of Array.from(document.body.classList)) {
      if (className.startsWith("theme-")) {
        document.body.classList.remove(className);
      }
    }
    document.body.classList.add(`theme-${activeTheme}`);
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled");
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider"
    );
  }
  return context;
}
