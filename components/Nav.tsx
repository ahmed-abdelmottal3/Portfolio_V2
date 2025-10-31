
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope, FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";

export default function Nav() {
  const navItems = [
    { icon: <FaHome />, label: "Home", href: "#home" },
    { icon: <FaUser />, label: "About", href: "#about" },
    { icon: <FaProjectDiagram />, label: "Projects", href: "#projects" },
    { icon: <FaEnvelope />, label: "Contact", href: "#contact" },
  ];

  const socialItems = [
    { icon: <FaGithub />, label: "GitHub", href: "https://github.com/ahmed-abdelmottal3"},
    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/abdelmottalie" },
    { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/+201097175212" },
  ];

  interface NavItem {
    icon: React.ReactNode;
    label: string;
    href: string;
  }

    const renderItem = (item: NavItem)=> (
      <div className="relative flex group">
        <a
          href={item.href}
          className="text-white text-s transition-all duration-300 hover:-translate-y-1.5 "
          target={socialItems ? "_blank" : "_self"}
        >
          <div className=" rounded-full flex items-center justify-center hover:scale-125 transform transition-all duration-300  hover:bg-white/80 hover:text-black/80 hover:p-1.5">
            {item.icon}
          </div>
        </a>
        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {item.label}
        </span>
      </div>
    );

  return (
    <nav className="fixed flex  items-center bottom-5 left-1/2 transform -translate-x-1/2 bg-[#222121] backdrop-blur-md rounded-full px-6 py-3 shadow-lg z-5 ">
      
      <div className="flex items-center gap-5 border-r-2 pe-5 ">
        {navItems.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>

      <div className="flex items-center gap-5  ps-5">
        {socialItems.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>

    </nav>
  );
}
