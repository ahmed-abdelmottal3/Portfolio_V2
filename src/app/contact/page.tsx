"use client"
import Header from "@/src/components/ui/header";
import { MagicCard } from "@/src/components/ui/magic-card";
import { useState } from "react";
import { FaLinkedin, FaGithub, FaPaperPlane, FaFacebook } from "react-icons/fa";
export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });

            setTimeout(() => {
                setSubmitStatus("idle");
            }, 3000);
        }, 1500);
    };
    const socialLinks = [
        {
            icon: <FaGithub size={24} />,
            name: "GitHub",
            url: "https://github.com/ahmed-abdelmottal3",
            color: "hover:text-gray-400"
        },
        {
            icon: <FaLinkedin size={24} />,
            name: "LinkedIn",
            url: "www.linkedin.com/in/abdelmottalie",
            color: "hover:text-blue-500"
        },
        {
            icon: <FaFacebook size={24} />,
            name: "Facebook",
            url: "https://www.facebook.com/ahmed.abdelmottalie.33",
            color: "hover:text-blue-400"
        }
    ];

    return (
        <section className='container mx-auto pt-10 px-4 pb-20'>
            <Header title="Get In Touch" />
            <p className="max-w-2xl text-background/60 font-light">
                Have a project in mind or just want to say hi? I'd love to hear from you.
                Send me a message and I'll get back to you as soon as possible.
            </p>


            <div className="grid md:grid-cols-5 gap-8 mt-12">
                {/* Contact Form */}
                <div className="md:col-span-3">
                    <MagicCard className="p-8">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-background mb-6">
                                Send Me a Message
                            </h2>

                            {submitStatus === "success" && (
                                <div className="mb-6 p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
                                    <p className="text-green-400 text-center">
                                        ✓ Message sent successfully! I'll get back to you soon.
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-background/60 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-background/5 border border-background/10 rounded-lg text-background placeholder-background/60 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                                            placeholder="Type Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-background/60 mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-background/5 border border-background/10 rounded-lg text-background placeholder-background/60 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                                            placeholder="Enter Your Name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-background/5 border border-background/10 rounded-lg text-background placeholder-background/60 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 bg-background/5 border border-background/10 rounded-lg text-background placeholder-background/60 focus:outline-none focus:border-blue-400 transition-colors duration-300 resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-foreground/90 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </MagicCard>
                </div>

                {/* Sidebar */}
                <div className="md:col-span-2 space-y-6">
                    {/* Social Links */}
                    <MagicCard className="p-6">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-background mb-6">
                                Connect With Me
                            </h3>
                            <div className="space-y-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-lg bg-background/5 hover:bg-background/10 transition-all duration-300 group"
                                    >
                                        <div className={`text-background/60 ${social.color} transition-colors duration-300`}>
                                            {social.icon}
                                        </div>
                                        <span className="text-background/60 group-hover:text-background transition-colors duration-300">
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </MagicCard>

                    {/* Availability */}
                    <Availability />

                </div>
            </div>

            {/* FAQ Section */}
        </section>
    );
}


function Availability() {
    return (
        <MagicCard className="p-6">
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-background mb-4">
                    Availability
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-green-400 font-medium">
                            Available for Freelance
                        </span>
                    </div>

                    <p className="text-background/60 text-sm leading-relaxed">
                        Currently accepting new projects and collaborations.
                        Response time: Usually within 24 hours.
                    </p>

                    <div className="flex gap-4 pt-4">
                        {/* نفّذلي */}
                        <a
                            href="https://nafezly.com/u/ahmed_abdelmottalie"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-background/80 hover:text-green-400 transition-colors"
                        >
                            <span className="text-sm font-medium">Nafezly</span>
                        </a>

                        {/* مستقل */}
                        <a
                            href="https://mostaql.com/u/Ahmed_Abdo1712"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-background/80 hover:text-green-400 transition-colors"
                        >
                            <span className="text-sm font-medium">Mostaql</span>
                        </a>
                    </div>
                </div>
            </div>
        </MagicCard>
    );
}
