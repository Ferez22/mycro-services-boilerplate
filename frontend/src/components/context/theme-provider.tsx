'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, themes } from '@/config/themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Save theme to localStorage
    localStorage.setItem('theme', theme);

    // Apply theme to document
    const root = document.documentElement;
    
    // Remove all theme classes dynamically
    Object.keys(themes).forEach((themeKey) => {
      root.classList.remove(themeKey);
    });
    
    // Add current theme class
    root.classList.add(theme);

    // Apply CSS variables
    const themeColors = themes[theme];
    Object.entries(themeColors).forEach(([key, value]) => {
      // Convert camelCase to kebab-case
      // First, add dash before capital letters
      let cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      // Then, add dash before numbers (but not if already preceded by dash)
      cssVar = cssVar.replace(/([a-z])(\d)/g, '$1-$2');
      // Remove any double dashes
      cssVar = cssVar.replace(/--+/g, '-');
      cssVar = `--${cssVar}`;
      root.style.setProperty(cssVar, value);
    });
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Always provide the context, even during SSR/hydration
  // This prevents the "useTheme must be used within a ThemeProvider" error
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        availableThemes: Object.keys(themes) as Theme[],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

