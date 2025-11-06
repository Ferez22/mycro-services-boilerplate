import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CONFIG } from "@/config-global";
import { ThemeProvider } from "@/components/context/theme-provider";
import { Container } from "@/components/container";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: CONFIG.appName,
  description: CONFIG.appDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <Container>{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
