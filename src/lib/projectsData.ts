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
    images: string[];
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
        date: "October 2025",
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
        ],
        images: ["/ANTOJITOS.jpg"]
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
        date: "July 2025",
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
        ],
        images: ["/Gradient.png"]
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
        date: "October 2025",
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
        ],
        images: ["/QR.png"]
    },
    {
        id: "portfolio-website",
        title: "Modern Portfolio Website with Stunning UI/UX",
        subtitle: "Showcasing Skills with Style",
        desc: "A modern and responsive personal portfolio website built with React.js and Tailwind.CSS. The design highlights projects, skills, and experience with a clean layout and smooth animations.",
        longDesc: "This portfolio website represents a complete personal branding solution. Built with semantic HTML5 and modern CSS3 techniques, it features a clean and professional design that emphasizes content while maintaining visual interest through subtle animations and transitions. The site is fully responsive and optimized for all devices.",
        skills: ["React.js", "Tailwind CSS", "Responsive Design"],
        img: "/portfolio-1.png",
        liveUrl: "https://ahmed-saleh-two.vercel.app/",
        githubUrl: "https://github.com/ahmed-abdelmottal3/my-first-client-project",
        date: "November 2025",
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
        ],
        images: ["/portfolio-1.png"]
    },
    {
        id: "clarity-landing",
        title: "Clarity Landing Page",
        subtitle: "Minimalist & Responsive Landing Page",
        desc: "A minimalist and responsive landing page built with HTML, CSS, and JavaScript, focusing on clean design, interactivity, and smooth transitions.",
        longDesc: "Clarity is a lightweight, modern landing page designed to provide a visually appealing and engaging experience for visitors. It features a clean layout, smooth scrolling, interactive UI elements, and responsive design that works seamlessly across desktop, tablet, and mobile devices. The project emphasizes performance optimization and accessibility.",
        skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
        img: "/clarity1.png",
        liveUrl: "https://ahmed-abdelmottal3.github.io/Clarity/",
        githubUrl: "https://github.com/ahmed-abdelmottal3/Clarity",
        date: "July 2025",
        category: "Web Development",
        features: [
            "Minimalist and responsive layout for all devices",
            "Interactive UI elements with smooth transitions",
            "Fast-loading and performance optimized",
            "Accessible design following best practices",
            "Clean code structure for easy maintenance"
        ],
        challenges: [
            {
                title: "Responsive Design",
                desc: "Ensured the layout adapts beautifully across mobile, tablet, and desktop screens"
            },
            {
                title: "Performance Optimization",
                desc: "Optimized images, CSS, and JavaScript to ensure fast load times"
            },
            {
                title: "Cross-browser Compatibility",
                desc: "Tested and fixed UI issues across major browsers for a consistent experience"
            }
        ],
        images: ["/clarity1.png"]
    },
    {
        id: "lockscout-landing",
        title: "LockScout Landing Page",
        subtitle: "Modern Landing Page for Security Services",
        desc: "A responsive and clean landing page for LockScout, built with HTML, CSS, and JavaScript. Highlights security services with a professional, user-friendly design.",
        longDesc: "LockScout is a modern landing page designed to showcase security solutions in a professional and approachable way. The project features responsive design, clear navigation, smooth transitions, and interactive UI elements. It emphasizes usability, performance, and accessibility, making it suitable for desktop, tablet, and mobile users.",
        skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
        img: "/lockscout1.png",
        liveUrl: "https://ahmed-abdelmottal3.github.io/LockScout/",
        githubUrl: "https://github.com/ahmed-abdelmottal3/LockScout",
        date: "July 2025",
        category: "Web Development",
        features: [
            "Responsive layout for desktop, tablet, and mobile devices",
            "Clean and professional UI design",
            "Interactive navigation and smooth scrolling",
            "Optimized for performance and fast load times",
            "Accessible design following web best practices"
        ],
        challenges: [
            {
                title: "Cross-device Responsiveness",
                desc: "Ensured the page looks and functions perfectly across all screen sizes"
            },
            {
                title: "Performance Optimization",
                desc: "Minimized CSS and JS for faster load times without compromising UX"
            },
            {
                title: "Interactive Elements",
                desc: "Implemented smooth scrolling and hover effects without affecting performance"
            }
        ],
        images: ["/lockscout1.png"]
    },
    {
        id: "suknai-real-estate",
        title: "Suknai - Luxury Real Estate Platform",
        subtitle: "Luxury Living Redefined",
        desc: "A premium real estate platform showcasing luxury properties. Features high-quality visuals, brand integration, and an elegant user interface for property discovery.",
        longDesc: "Suknai is a high-end real estate platform designed to showcase luxury properties and high-profile brands. The project focuses on visual excellence, featuring massive, high-resolution imagery and smooth animations that reflect the premium nature of the real estate market. It includes detailed property views, brand showcases, and a seamless contact system for potential buyers.",
        skills: ["React", "Tailwind CSS", "Framer Motion", "UI/UX"],
        img: "/suknai/screencapture-suknai-vercel-app-2026-04-23-19_20_43.png",
        liveUrl: "https://suknai.vercel.app/",
        githubUrl: "https://github.com/ahmed-abdelmottal3/suknai",
        date: "April 2026",
        category: "Web Development",
        features: [
            "High-resolution property galleries",
            "Interactive brand showcases",
            "Smooth parallax and scroll animations",
            "Responsive design for all devices",
            "Lead generation and contact forms",
            "SEO optimized property listings"
        ],
        challenges: [
            {
                title: "Image Optimization",
                desc: "Handling very large, high-quality images while maintaining fast page load times."
            },
            {
                title: "Aesthetic Precision",
                desc: "Achieving a pixel-perfect, luxury feel using custom CSS and Framer Motion."
            }
        ],
        images: [
            "/suknai/screencapture-suknai-vercel-app-2026-04-23-19_20_43.png",
            "/suknai/screencapture-suknai-vercel-app-about-2026-04-23-19_21_49.png",
            "/suknai/screencapture-suknai-vercel-app-brands-2026-04-23-19_21_57.png",
            "/suknai/screencapture-suknai-vercel-app-contact-2026-04-23-19_22_06.png",
            "/suknai/screencapture-suknai-vercel-app-suknai-royal-2026-04-23-19_21_11.png"
        ]
    },
    {
        id: "quizium-platform",
        title: "Quizium - Interactive Quiz Platform",
        subtitle: "Empowering Learning Through Interaction",
        desc: "A powerful platform for creating and taking interactive quizzes. Features real-time results, subject-based filtering, and a user-friendly examination interface.",
        longDesc: "Quizium is a comprehensive online examination and quiz platform designed for educational institutions and individual learners. It provides a seamless interface for administrators to create complex quizzes and for students to take them in a timed, secure environment. The platform uses Firebase for real-time data synchronization and user authentication, ensuring a fast and reliable experience.",
        skills: ["React", "Firebase", "Tailwind CSS", "Redux"],
        img: "/quizium/screencapture-quizium-one-vercel-app-2026-04-23-19_07_48.png",
        liveUrl: "https://quizium-one.vercel.app/",
        githubUrl: "https://github.com/Lumix-projects/Quizium",
        date: "April 2026",
        category: "Web Development",
        features: [
            "Real-time quiz participation",
            "Automatic grading and instant results",
            "Subject-based quiz categorization",
            "Secure user authentication",
            "Responsive examination interface",
            "Analytics dashboard for performance tracking"
        ],
        challenges: [
            {
                title: "Real-time Sync",
                desc: "Using Firebase to sync quiz states across multiple users without lag."
            },
            {
                title: "Security",
                desc: "Implementing measures to prevent cheating during active examinations."
            }
        ],
        images: [
            "/quizium/screencapture-quizium-one-vercel-app-2026-04-23-19_07_48.png",
            "/quizium/screencapture-quizium-one-vercel-app-exam-jc7sdSb41VvttRzo6L1U-2026-04-23-19_09_02.png",
            "/quizium/screencapture-quizium-one-vercel-app-login-2026-04-23-19_07_21.png",
            "/quizium/screencapture-quizium-one-vercel-app-subjects-2026-04-23-19_08_19.png",
            "/quizium/screencapture-quizium-one-vercel-app-subjects-Kx0oghvxslvoDtIsaY1B-2026-04-23-19_08_29.png"
        ]
    },
    {
        id: "rawy-mobile-app",
        title: "Rawy - Storytelling Mobile App",
        subtitle: "Immersive Storytelling Experience",
        desc: "A premium mobile application designed for storytelling and narrative experiences. Features a clean, user-centric interface with smooth transitions and interactive elements to provide an immersive reading and listening experience.",
        longDesc: "Rawy is a state-of-the-art mobile application designed to bring stories to life. By combining a minimalist UI with powerful narrative features, Rawy allows users to explore, create, and share stories in a way that feels natural and immersive. The app focuses on user engagement through smooth transitions and a focus on typography and high-quality visuals.",
        skills: ["Flutter", "Dart", "Firebase", "UI/UX"],
        img: "/rawy/rawy.png",
        liveUrl: "",
        githubUrl: "https://github.com/Qubexia/rawyapp",
        date: "April 2026",
        category: "Mobile App",
        features: [
            "Cross-platform compatibility",
            "Offline reading mode",
            "Interactive storytelling elements",
            "User-friendly publishing tools",
            "Personalized recommendations"
        ],
        challenges: [
            {
                title: "Story Interaction",
                desc: "Implementing complex branching narratives while maintaining a simple user interface."
            },
            {
                title: "Performance",
                desc: "Optimizing media delivery for a smooth experience on all mobile devices."
            }
        ],
        images: [
            "/rawy/rawy.png",
            "/rawy/rawy2.png",
            "/rawy/rawy3.png",
            "/rawy/rawy4.png",
            "/rawy/rawy5.png",
            "/rawy/rawy6.png"
        ]
    },
    {
        id: "monlz-ui-ux-design",
        title: "Monlz - Modern UI/UX Design",
        subtitle: "Minimalist & Clean UI/UX Case Study",
        desc: "A comprehensive UI/UX case study for a modern platform. Focused on minimalist aesthetics, user flow optimization, and high-fidelity prototyping to ensure a seamless user journey.",
        longDesc: "Monlz is a comprehensive design project that explores the intersection of minimalism and usability. The project involved deep user research, wireframing, and high-fidelity prototyping to create a platform that feels both modern and accessible. The design system emphasizes clarity, consistency, and intuitive user flows.",
        skills: ["Figma", "Prototyping", "User Research", "Visual Design"],
        img: "/monlz/monlz1.png",
        liveUrl: "",
        githubUrl: "",
        date: "April 2026",
        category: "UI/UX Design",
        features: [
            "Comprehensive design system",
            "Interactive high-fidelity prototypes",
            "User flow optimization",
            "Accessibility-first design approach",
            "Responsive layout concepts"
        ],
        challenges: [
            {
                title: "Visual Balance",
                desc: "Achieving a minimalist look without sacrificing functionality or brand identity."
            },
            {
                title: "User Flow",
                desc: "Simplifying complex user actions into intuitive, single-step processes."
            }
        ],
        images: [
            "/monlz/monlz1.png",
            "/monlz/monlz2.png",
            "/monlz/monlz3.png",
            "/monlz/monlz4.png",
            "/monlz/monlz5.png",
            "/monlz/monlz6.png",
            "/monlz/monlz7.png",
            "/monlz/monlz8.png"
        ]
    },
    {
        id: "clothera-ecommerce",
        title: "Clothera - E-commerce Fashion Store",
        subtitle: "Modern E-commerce Solution",
        desc: "A full-featured e-commerce platform for fashion and apparel. Includes product browsing, wishlist, shopping cart, and a seamless checkout experience. Built with modern web technologies for high performance and scalability.",
        longDesc: "Clothera is a full-scale e-commerce platform built for the modern fashion industry. It provides a seamless shopping experience from product discovery to checkout. The platform is optimized for speed, SEO, and conversion, featuring a robust backend to handle large inventories and high traffic.",
        skills: ["Next.js", "Tailwind CSS", "Redux", "Node.js", "MongoDB"],
        img: "/clothera/screencapture-clothera-vercel-app-2026-04-23-18_57_21.png",
        liveUrl: "https://clothera.vercel.app/",
        githubUrl: "https://github.com/ahmed-abdelmottal3/Clothera",
        date: "April 2026",
        category: "Web Development",
        features: [
            "Product catalog with advanced filtering",
            "Secure checkout process",
            "User wishlist and account management",
            "Real-time inventory updates",
            "Responsive and mobile-first design"
        ],
        challenges: [
            {
                title: "Scalability",
                desc: "Designing a system that handles thousands of products and users simultaneously."
            },
            {
                title: "Conversion Optimization",
                desc: "A/B testing different checkout flows to maximize conversion rates."
            }
        ],
        images: [
            "/clothera/screencapture-clothera-vercel-app-2026-04-23-18_57_21.png",
            "/clothera/screencapture-clothera-vercel-app-about-2026-04-23-18_57_39.png",
            "/clothera/screencapture-clothera-vercel-app-cart-2026-04-23-18_59_06.png",
            "/clothera/screencapture-clothera-vercel-app-checkout-2026-04-23-19_00_02.png",
            "/clothera/screencapture-clothera-vercel-app-products-2026-04-23-18_57_50.png",
            "/clothera/screencapture-clothera-vercel-app-products-6428ead5dc1175abc65ca0ad-2026-04-23-18_59_43.png",
            "/clothera/screencapture-clothera-vercel-app-wishlist-2026-04-23-18_59_32.png"
        ]
    }
];
