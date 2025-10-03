import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SpinningText } from "@/components/ui/spinning-text";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ze-frontend",
  description: "frontend of the mycroservices boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="w-full h-[50px] flex items-center justify-center px-8 z-50">
          <div className=" px-8 mt-32 rounded">
            <SpinningText>zis iz ze best frontend</SpinningText>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
