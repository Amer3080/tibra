"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/* ── Arabic font options ── */
export type ArabicFont = "el-messiri" | "marhey" | "amiri";

interface ThemeCtxType {
  dark: boolean;
  toggleDark: () => void;
  arabicFont: ArabicFont;
  setArabicFont: (f: ArabicFont) => void;
}

const ThemeCtx = createContext<ThemeCtxType>({
  dark: false,
  toggleDark: () => {},
  arabicFont: "el-messiri",
  setArabicFont: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [arabicFont, setArabicFontState] = useState<ArabicFont>("el-messiri");

  useEffect(() => {
    const stored = localStorage.getItem("tibra-theme");
    const storedFont = localStorage.getItem("tibra-arabic-font") as ArabicFont | null;
    if (stored === "dark") {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
    if (storedFont) {
      setArabicFontState(storedFont);
      applyArabicFont(storedFont);
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("tibra-theme", next ? "dark" : "light");
  };

  const setArabicFont = (f: ArabicFont) => {
    setArabicFontState(f);
    applyArabicFont(f);
    localStorage.setItem("tibra-arabic-font", f);
  };

  return (
    <ThemeCtx.Provider value={{ dark, toggleDark, arabicFont, setArabicFont }}>
      {children}
    </ThemeCtx.Provider>
  );
}

function applyArabicFont(font: ArabicFont) {
  const fontMap: Record<ArabicFont, string> = {
    "el-messiri": "'El Messiri', sans-serif",
    "marhey": "'Marhey', sans-serif",
    "amiri": "'Amiri', serif",
  };
  document.documentElement.style.setProperty("--ar-heading-font", fontMap[font]);
}

export const useTheme = () => useContext(ThemeCtx);
