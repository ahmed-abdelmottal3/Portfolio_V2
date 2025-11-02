interface Project {
    id: string;
    title: string;
    desc: string;
    skills: string[];
    img: string;
    liveUrl: string;
    githubUrl: string;
}

export const projects = [
    {
        id: "antijitos-restaurant",
        title: "Elegant Food & Restaurant Website",
        desc: "A modern, responsive restaurant landing page for Antijitos, designed with React and Tailwind CSS. It features elegant UI components, high-quality visuals, and smooth animations to deliver an engaging food-brand experience across all devices.",
        skills: ["React", "Tailwind CSS", "Redux"],
        img: "/Frame 1.png",
        liveUrl: "https://antojitos-one.vercel.app/",
        githubUrl: "https://github.com/ahmed-abdelmottal3/ANTOJITOS",
    },
    {
        id: "gradient-builder",
        title: "Interactive Gradient Builder",
        desc: "A lightweight Gradient Generator built with React and Tailwind CSS. Users can create, customize, and preview gradients in real time, choose directions, add color stops, and export CSS, PNG or SVG. Clean UI, responsive layout, and developer-friendly export options.",
        skills: ["React", "Tailwind CSS"],
        img: "/Graadient Generator.jpg",
        liveUrl: "https://github.com/ahmed-abdelmottal3/Gradient-Generator",
        githubUrl: "https://gradient-generator-bice-iota.vercel.app/",
    },
    {
        id: "qr-generator",
        title: "Smart QR Code Generator",
        desc: "A modern and elegant QR Code Generator built with React and Tailwind CSS. It allows users to instantly create, customize, and download QR codes for links, text, and contact information. Designed with simplicity and performance in mind, the interface is clean, responsive, and user-friendly.",
        skills: ["React", "Tailwind CSS"],
        img: "/QR-genertor.png",
        liveUrl: "https://github.com/ahmed-abdelmottal3/QR-generator",
        githubUrl: "https://ahmed-abdelmottal3.github.io/QR-generator/",
    },
    {
        id: "portfolio-website",
        title: "My First Freelance Project",
        desc: "A modern and responsive personal portfolio website built with HTML5 and CSS3. The design highlights projects, skills, and experience with a clean layout and smooth animations to provide an engaging user experience.",
        skills: ["React.js", "Tailwind CSS", "Framer Motion"],
        img: "/Portfolio.png",
        liveUrl: "https://github.com/ahmed-abdelmottal3/my-first-client-project",
        githubUrl: "https://ahmed-saleh-two.vercel.app/",
    },
];