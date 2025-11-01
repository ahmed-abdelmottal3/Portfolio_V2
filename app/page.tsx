"use client";
import { TypeAnimation } from "react-type-animation";
import { Great_Vibes } from "next/font/google";
import "./globals.css";
import CTASection from "@/components/shared/CTAsection";
import { AuroraText } from "@/components/ui/aurora-text"



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden text-center px-4">
      {/* logo */}
      <img
        src="/mylogowhite.webp"
        alt="logo"
        className="w-20 sm:w-24 md:w-32 lg:w-40 mb-4"
      />

      {/* heading */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
        Hi, I'm <AuroraText>Ahmed</AuroraText>
      </h1>

      {/* type animation */}
      <TypeAnimation
        sequence={[
          "Front-end Developer",
          2000,
          "UI/UX Enthusiast",
          2000,
          "React Specialist",
          2000,
        ]}
        wrapper="span"
        speed={50}
        className="text-lg sm:text-xl md:text-2xl font-semibold mb-3"
        repeat={Infinity}
      />

      {/* description */}
      <p className="text-background/50 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg mb-4 opacity-80">
        Passionate about creating beautiful and responsive web applications.
        I love turning ideas into interactive experiences.
      </p>

      {/* links */}
        <CTASection />

     
    </div>
  );
}
