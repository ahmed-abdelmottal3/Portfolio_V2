import { TypeAnimation } from "react-type-animation";
import whitelogo from "../assets/my logo1.png";
import Nav from "./Nav";
import "../index.css";

export default function Start() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-white px-4 md:px-8 lg:px-12">
        <img
          src={whitelogo}
          alt="logo"
          className="w-24 md:w-32 lg:w-40 max-h-full mb-6"
        />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
          Hi, I'm <span className="text-blue-500">Ahmed</span>
        </h1>

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
          className="text-xl sm:text-2xl md:text-3xl font-semibold inline-block mb-4 text-center"
          repeat={Infinity}
        />

        <p className="text-center text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-lg mb-6 leading-relaxed">
          passionate about creating beautiful and responsive web applications. I
          love turning ideas into interactive experiences.
        </p>

        <div className="flex gap-10">

        <h1 className="lets relative text-2xl sm:text-2xl md:text-4xl opacity-50 text-white text-center my-8 cursor-pointer hover:me-10 group inline-block transition-all duration-300">
          More about me
          <span className="absolute right-[-30px] sm:right-[-35px] top-1/2 transform -translate-y-1/2 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-white text-xl">
            →
          </span>
        </h1>

        <h1 className="lets relative text-2xl sm:text-2xl md:text-4xl opacity-50 text-white text-center my-8 cursor-pointer hover:me-10 group inline-block transition-all duration-300">
          What I'have built
          <span className="absolute right-[-30px] sm:right-[-35px] top-1/2 transform -translate-y-1/2 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-white text-xl">
            →
          </span>
        </h1>

        <h1 className="lets relative text-2xl sm:text-2xl md:text-4xl opacity-50 text-white text-center my-8 cursor-pointer hover:me-10 group inline-block transition-all duration-300">
          Get in touch
          <span className="absolute right-[-30px] sm:right-[-35px] top-1/2 transform -translate-y-1/2 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-white text-xl">
            →
          </span>
        </h1>
        </div>

        <Nav />
      </div>
    </>
  );
}
