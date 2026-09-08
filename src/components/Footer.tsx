import {
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { PHONE } from "@/lib/data";

const socials = [
  {
    href: "https://www.linkedin.com/in/mezie/",
    label: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    href: `https://api.whatsapp.com/send?phone=${PHONE.replace("+", "")}`,
    label: "WhatsApp",
    icon: <FaWhatsapp />,
  },
  {
    href: "https://github.com/mezieOX",
    label: "GitHub",
    icon: <FaGithub />,
  },
  {
    href: `tel:${PHONE}`,
    label: "Phone",
    icon: <FaPhone />,
  },
  {
    href: "https://twitter.com/MezieBeta",
    label: "Twitter",
    icon: <FaTwitter />,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <a href="#home" className="logo">
          Mezie<span>.</span>
        </a>
        <p className="text">
          &copy; Copyright <span>{year}</span>. All rights reserved
        </p>
        <ul className="social-media">
          {socials.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="social-link"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
