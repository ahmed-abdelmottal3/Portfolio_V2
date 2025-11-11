import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import SplashScreen from "../components/wrapper/Splashscreen";
import Dock from "../components/shared/Dock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Ahmed Abd El-mottalie",
  description: "My portfolio website, showcasing my projects and skills, built with Next.js and TypeScript and using shadcn/ui for the UI components.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable}  antialiased`}
      >
        <SplashScreen>
          {children}
          <Dock />
        </SplashScreen>

      </body>
    </html>
  );
}
