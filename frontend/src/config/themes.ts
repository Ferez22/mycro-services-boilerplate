export type Theme = 'light' | 'dark' | 'purple';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

export const themes: Record<Theme, ThemeColors> = {
  light: {
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.145 0 0)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.145 0 0)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.145 0 0)',
    primary: 'oklch(0.205 0 0)',
    primaryForeground: 'oklch(0.985 0 0)',
    secondary: 'oklch(0.97 0 0)',
    secondaryForeground: 'oklch(0.205 0 0)',
    muted: 'oklch(0.97 0 0)',
    mutedForeground: 'oklch(0.556 0 0)',
    accent: 'oklch(0.97 0 0)',
    accentForeground: 'oklch(0.205 0 0)',
    destructive: 'oklch(0.577 0.245 27.325)',
    border: 'oklch(0.922 0 0)',
    input: 'oklch(0.922 0 0)',
    ring: 'oklch(0.708 0 0)',
    chart1: 'oklch(0.646 0.222 41.116)',
    chart2: 'oklch(0.6 0.118 184.704)',
    chart3: 'oklch(0.398 0.07 227.392)',
    chart4: 'oklch(0.828 0.189 84.429)',
    chart5: 'oklch(0.769 0.188 70.08)',
    sidebar: 'oklch(0.985 0 0)',
    sidebarForeground: 'oklch(0.145 0 0)',
    sidebarPrimary: 'oklch(0.205 0 0)',
    sidebarPrimaryForeground: 'oklch(0.985 0 0)',
    sidebarAccent: 'oklch(0.97 0 0)',
    sidebarAccentForeground: 'oklch(0.205 0 0)',
    sidebarBorder: 'oklch(0.922 0 0)',
    sidebarRing: 'oklch(0.708 0 0)',
  },
  dark: {
    background: 'oklch(0.145 0 0)',
    foreground: 'oklch(0.985 0 0)',
    card: 'oklch(0.205 0 0)',
    cardForeground: 'oklch(0.985 0 0)',
    popover: 'oklch(0.205 0 0)',
    popoverForeground: 'oklch(0.985 0 0)',
    primary: 'oklch(0.922 0 0)',
    primaryForeground: 'oklch(0.205 0 0)',
    secondary: 'oklch(0.269 0 0)',
    secondaryForeground: 'oklch(0.985 0 0)',
    muted: 'oklch(0.269 0 0)',
    mutedForeground: 'oklch(0.708 0 0)',
    accent: 'oklch(0.269 0 0)',
    accentForeground: 'oklch(0.985 0 0)',
    destructive: 'oklch(0.704 0.191 22.216)',
    border: 'oklch(1 0 0 / 10%)',
    input: 'oklch(1 0 0 / 15%)',
    ring: 'oklch(0.556 0 0)',
    chart1: 'oklch(0.488 0.243 264.376)',
    chart2: 'oklch(0.696 0.17 162.48)',
    chart3: 'oklch(0.769 0.188 70.08)',
    chart4: 'oklch(0.627 0.265 303.9)',
    chart5: 'oklch(0.645 0.246 16.439)',
    sidebar: 'oklch(0.205 0 0)',
    sidebarForeground: 'oklch(0.985 0 0)',
    sidebarPrimary: 'oklch(0.488 0.243 264.376)',
    sidebarPrimaryForeground: 'oklch(0.985 0 0)',
    sidebarAccent: 'oklch(0.269 0 0)',
    sidebarAccentForeground: 'oklch(0.985 0 0)',
    sidebarBorder: 'oklch(1 0 0 / 10%)',
    sidebarRing: 'oklch(0.556 0 0)',
  },
  purple: {
    background: 'oklch(0.98 0.02 300)',
    foreground: 'oklch(0.15 0.05 280)',
    card: 'oklch(0.99 0.01 300)',
    cardForeground: 'oklch(0.15 0.05 280)',
    popover: 'oklch(0.99 0.01 300)',
    popoverForeground: 'oklch(0.15 0.05 280)',
    primary: 'oklch(0.55 0.25 280)',
    primaryForeground: 'oklch(0.98 0.02 300)',
    secondary: 'oklch(0.95 0.05 300)',
    secondaryForeground: 'oklch(0.25 0.08 280)',
    muted: 'oklch(0.94 0.03 300)',
    mutedForeground: 'oklch(0.5 0.1 280)',
    accent: 'oklch(0.7 0.2 290)',
    accentForeground: 'oklch(0.15 0.05 280)',
    destructive: 'oklch(0.577 0.245 27.325)',
    border: 'oklch(0.9 0.05 300)',
    input: 'oklch(0.9 0.05 300)',
    ring: 'oklch(0.6 0.2 280)',
    chart1: 'oklch(0.6 0.25 280)',
    chart2: 'oklch(0.65 0.22 300)',
    chart3: 'oklch(0.7 0.2 320)',
    chart4: 'oklch(0.55 0.25 270)',
    chart5: 'oklch(0.6 0.23 290)',
    sidebar: 'oklch(0.96 0.03 300)',
    sidebarForeground: 'oklch(0.15 0.05 280)',
    sidebarPrimary: 'oklch(0.55 0.25 280)',
    sidebarPrimaryForeground: 'oklch(0.98 0.02 300)',
    sidebarAccent: 'oklch(0.92 0.04 300)',
    sidebarAccentForeground: 'oklch(0.25 0.08 280)',
    sidebarBorder: 'oklch(0.88 0.06 300)',
    sidebarRing: 'oklch(0.6 0.2 280)',
  },
};

export const themeNames: Theme[] = Object.keys(themes) as Theme[];

