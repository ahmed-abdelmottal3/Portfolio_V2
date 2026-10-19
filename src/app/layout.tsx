import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashScreen from "../components/wrapper/Splashscreen";
import Dock from "../components/shared/Dock";
import ScrollPager from "../components/shared/ScrollPager";
import ParticleField from "../components/shared/ParticleField";
import PageTransition from "../components/shared/PageTransition";
import ParticleRevealer from "../components/shared/ParticleRevealer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Abdelmottalie | React Native Developer",
  description: "React Native developer building production iOS and Android apps with Expo and TypeScript. Five apps live on the App Store and Google Play, most of them Arabic-first.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Decide on the intro before first paint, so the site never flashes under it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");try{if(sessionStorage.getItem("intro-seen")!=="1"&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-pending");sessionStorage.setItem("intro-seen","1")}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ParticleField />
        <SplashScreen>
          {children}
          <Dock />
          <ScrollPager />
          <PageTransition />
          <ParticleRevealer />
        </SplashScreen>

      </body>
    </html>
  );
}
