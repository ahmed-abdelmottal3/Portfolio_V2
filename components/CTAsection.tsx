import React from 'react';
import { FaUser, FaRocket, FaPaperPlane } from 'react-icons/fa';
import { Great_Vibes } from 'next/font/google';
import Link from 'next/link';

const greatVibes = Great_Vibes({
    weight: '400',
    subsets: ['latin']
});

export default function CTASection() {
    const items = [
        { text: "More About Me", icon: <FaUser />, gradient: "from-blue-400 via-blue-500 to-purple-500", iconColor: "#8B5CF6", href: "/about" },
        { text: "What I've Built", icon: <FaRocket />, gradient: "from-purple-400 via-purple-500 to-pink-500", iconColor: "#EC4899", href: "/projects" },
        { text: "Get In Touch", icon: <FaPaperPlane />, gradient: "from-pink-400 via-pink-500 to-orange-400", iconColor: "#FB923C", href: "/contact" },
    ];

    return (
        <div className="flex flex-wrap items-center justify-center mx-auto gap-3 sm:gap-5 md:gap-7 lg:gap-10 mt-8 px-4 sm:px-6 md:px-10">
            {items.map((item, i) => (
                <Link
                    key={i}
                    href={item.href}
                    className="relative group cursor-pointer w-fit flex justify-center no-underline"
                >
                    {/* Gradient Glow Background */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 pointer-events-none`}
                    />

                    {/* Main Content */}
                    <div className='flex'>

                        {/* Text with Gradient on Hover */}
                        <h1
                            className={`${greatVibes.className} xs:text-2xl sm:text-3xl md:text-4xl text-white/70 text-center group-hover:bg-gradient-to-r ${item.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 group-hover:scale-110 transform whitespace-nowrap`}
                        >
                            {item.text}
                        </h1>

                        {/* Animated Icon */}
                        <span
                            className="text-lg sm:text-xl md:text-2xl opacity-0 translate-x-[-20px] group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100 filter drop-shadow-lg"
                            style={{ color: item.iconColor }}
                        >
                            <div className="group-hover:animate-bounce ps-2">
                                {item.icon}
                            </div>
                        </span>
                    </div>

                    {/* Decorative Moving Dots */}
                    <div className="absolute -bottom-3 sm:-bottom-3 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                        {[0, 1, 2].map((dot) => (
                            <div
                                key={dot}
                                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r ${item.gradient} animate-pulse`}
                                style={{ animationDelay: `${dot * 150}ms` }}
                            />
                        ))}
                    </div>

                    {/* Animated Underline */}
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r ${item.gradient} w-0 group-hover:w-full transition-all duration-700 shadow-lg pointer-events-none`} />

                    {/* Floating Sparkles */}
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r ${item.gradient} rounded-full blur-sm animate-ping`} />
                    </div>
                    <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 pointer-events-none">
                        <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r ${item.gradient} rounded-full blur-sm animate-ping`} />
                    </div>
                </Link>
            ))}
        </div>
    );
}