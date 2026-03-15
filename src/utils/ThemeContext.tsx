"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { baselightTheme, basedarkTheme } from "./theme/DefaultColors";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme preference from localStorage
    const savedMode = localStorage.getItem("themeMode") as ThemeMode;
    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = mode === "light" ? baselightTheme : basedarkTheme;

  // Prevent hydration mismatch by using default theme until mounted

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ mode: "light", toggleColorMode }}>
        <MUIThemeProvider theme={baselightTheme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
