"use client";

import { useTheme } from "./context/theme-provider";
import { Button } from "./ui/button";
import { Moon, Sun, Palette } from "lucide-react";

const themeIcons = {
  light: Sun,
  dark: Moon,
  purple: Palette,
};

export function ThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();

  const getNextTheme = () => {
    const currentIndex = availableThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    return availableThemes[nextIndex];
  };

  const handleThemeChange = () => {
    setTheme(getNextTheme());
  };

  const Icon = themeIcons[theme] || Sun;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeChange}
      aria-label={`Switch to ${getNextTheme()} theme`}
      className="relative"
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">Current theme: {theme}</span>
    </Button>
  );
}
