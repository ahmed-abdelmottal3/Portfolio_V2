interface Challenge {
    title: string;
    desc: string;
}

interface Project {
    id: string;
    title: string;
    subtitle: string;
    desc: string;
    longDesc: string;
    skills: string[];
    img: string;
    liveUrl: string;
    githubUrl: string;
    date: string;
    category: string;
    features: string[];
    challenges: Challenge[];
}

export const projectsData: Project[] = [
        {
            id: "antijitos-restaurant",
            title: "Elegant Food & Restaurant Website",
            subtitle: "Antijitos — Modern Restaurant Experience",
            desc: "A modern, responsive restaurant landing page for Antijitos, designed with React and Tailwind CSS. It features elegant UI components, high-quality visuals, and smooth animations to deliver an engaging food-brand experience across all devices.",
            longDesc: "This project showcases a complete restaurant website solution built from the ground up. The design philosophy centers around creating an immersive dining experience online, featuring smooth scroll animations, interactive menu cards, and a responsive layout that adapts beautifully to any screen size. Special attention was given to loading performance and SEO optimization to ensure the best user experience.",
            skills: ["React", "Tailwind CSS", "Redux", "Framer Motion"],
            img: "/ANTOJITOS.jpg",
            liveUrl: "https://antojitos-one.vercel.app/",
            githubUrl: "https://github.com/ahmed-abdelmottal3/ANTOJITOS",
            date: "December 2024",
            category: "Web Development",
            features: [
                "Responsive design that works seamlessly across all devices",
                "Smooth animations and transitions for enhanced user experience",
                "Interactive menu with filtering and search functionality",
                "Online reservation system integration",
                "SEO optimized for better search engine visibility",
                "Fast loading times with optimized images and lazy loading"
            ],
            challenges: [
                {
                    title: "Performance Optimization",
                    desc: "Implemented code splitting and lazy loading to achieve 95+ Lighthouse score"
                },
                {
                    title: "Animation Complexity",
                    desc: "Created smooth scroll-triggered animations while maintaining 60fps performance"
                },
                {
                    title: "Cross-browser Compatibility",
                    desc: "Ensured consistent experience across all major browsers including legacy support"
                }
            ]
        },
        {
            id: "gradient-builder",
            title: "Interactive Gradient Builder",
            subtitle: "Create Beautiful Gradients with Ease",
            desc: "A lightweight Gradient Generator built with React and Tailwind CSS. Users can create, customize, and preview gradients in real time, choose directions, add color stops, and export CSS, PNG or SVG.",
            longDesc: "This interactive tool was designed to simplify the gradient creation process for developers and designers. It features a real-time preview system, intuitive color picker, and multiple export options. The application uses React hooks for state management and includes features like gradient presets, custom color stops, and angle adjustments.",
            skills: ["React", "Tailwind CSS", "Canvas API", "Color Theory"],
            img: "/Gradient.png",
            liveUrl: "https://github.com/ahmed-abdelmottal3/Gradient-Generator",
            githubUrl: "https://gradient-generator-bice-iota.vercel.app/",
            date: "November 2024",
            category: "Web Tool",
            features: [
                "Real-time gradient preview with instant updates",
                "Multiple export formats: CSS, PNG, and SVG",
                "Customizable color stops and gradient angles",
                "Pre-built gradient presets for quick start",
                "Responsive interface that works on mobile devices",
                "Copy-to-clipboard functionality for quick sharing"
            ],
            challenges: [
                {
                    title: "Canvas Rendering",
                    desc: "Optimized canvas rendering to handle real-time updates without performance issues"
                },
                {
                    title: "Color Management",
                    desc: "Implemented accurate color space conversions for consistent results"
                },
                {
                    title: "Export Functionality",
                    desc: "Created robust export system supporting multiple file formats"
                }
            ]
        },
        {
            id: "qr-generator",
            title: "Smart QR Code Generator",
            subtitle: "Generate Custom QR Codes Instantly",
            desc: "A modern and elegant QR Code Generator built with React and Tailwind CSS. It allows users to instantly create, customize, and download QR codes for links, text, and contact information.",
            longDesc: "This QR code generator provides a simple yet powerful interface for creating customized QR codes. Users can encode various types of data including URLs, plain text, contact information, and WiFi credentials. The tool includes styling options, error correction levels, and supports high-resolution exports suitable for print.",
            skills: ["React", "Tailwind CSS", "QR Library", "File APIs"],
            img: "/QR.png",
            liveUrl: "https://github.com/ahmed-abdelmottal3/QR-generator",
            githubUrl: "https://ahmed-abdelmottal3.github.io/QR-generator/",
            date: "October 2024",
            category: "Utility Tool",
            features: [
                "Support for multiple data types (URL, text, contact, WiFi)",
                "Customizable QR code colors and styles",
                "Adjustable error correction levels",
                "High-resolution export for print quality",
                "Instant generation with real-time preview",
                "Mobile-friendly interface for on-the-go generation"
            ],
            challenges: [
                {
                    title: "Data Encoding",
                    desc: "Implemented proper data encoding for different QR code types"
                },
                {
                    title: "Visual Customization",
                    desc: "Balanced aesthetic customization with QR code readability"
                },
                {
                    title: "Export Quality",
                    desc: "Ensured high-resolution exports suitable for various use cases"
                }
            ]
        },
        {
            id: "portfolio-website",
            title: "Modern Portfolio Website with Stunning UI/UX",
            subtitle: "Showcasing Skills with Style",
            desc: "A modern and responsive personal portfolio website built with HTML5 and CSS3. The design highlights projects, skills, and experience with a clean layout and smooth animations.",
            longDesc: "This portfolio website represents a complete personal branding solution. Built with semantic HTML5 and modern CSS3 techniques, it features a clean and professional design that emphasizes content while maintaining visual interest through subtle animations and transitions. The site is fully responsive and optimized for all devices.",
            skills: ["React.js", "Tailwind CSS", "Responsive Design"],
            img: "/portfolio-1.png",
            liveUrl: "https://github.com/ahmed-abdelmottal3/my-first-client-project",
            githubUrl: "https://ahmed-saleh-two.vercel.app/",
            date: "September 2024",
            category: "Portfolio",
            features: [
                "Clean and professional design aesthetic",
                "Smooth scroll animations and transitions",
                "Fully responsive layout for all screen sizes",
                "Project showcase with detailed descriptions",
                "Skills section with visual representations",
                "Contact form with form validation"
            ],
            challenges: [
                {
                    title: "Cross-Device Testing",
                    desc: "Ensured pixel-perfect rendering across various devices and screen sizes"
                },
                {
                    title: "Performance",
                    desc: "Optimized assets and code for fast loading times"
                },
                {
                    title: "Browser Support",
                    desc: "Maintained compatibility with older browsers while using modern CSS"
                }
            ]
        },
        
    ];
