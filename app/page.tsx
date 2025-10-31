"use client";
import Nav from "@/components/Nav";
import { TypeAnimation } from "react-type-animation";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black text-white text-center px-4">
      {/* logo */}
      <img
        src="/mylogowhite.webp"
        alt="logo"
        className="w-20 sm:w-24 md:w-32 lg:w-40 mb-4"
      />

      {/* heading */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
        Hi, I'm <span className="text-blue-500">Ahmed</span>
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
      <p className="text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg mb-4 leading-relaxed opacity-80">
        Passionate about creating beautiful and responsive web applications.
        I love turning ideas into interactive experiences.
      </p>

      {/* links */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-4">
        {["More About Me", "What I've Built", "Get In Touch"].map((text, i) => (
          <h1
            key={i}
            className={`${greatVibes.className} relative text-xl sm:text-2xl md:text-3xl opacity-70 cursor-pointer group transition-all duration-300`}
          >
            {text}
            <span className="absolute right-[-25px] sm:right-[-30px] top-1/2 transform -translate-y-1/2 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-white text-lg">
              →
            </span>
          </h1>
        ))}
      </div>

      {/* nav */}
      <div className="mt-6">
        <Nav />
      </div>
    </div>
  );
}
