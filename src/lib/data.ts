export const CAREER_START_YEAR = 2020;

export function getYearsOfExperience(now = new Date()) {
  return Math.max(1, now.getFullYear() - CAREER_START_YEAR);
}

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
] as const;

export const SKILLS = [
  { title: "React.js", target: 96 },
  { title: "Next.js", target: 99 },
  { title: "React Native", target: 89 },
  { title: "TypeScript", target: 100 },
  { title: "API Integration", target: 94 },
  { title: "Vite", target: 92 },
] as const;

export const SKILL_TAGS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "Redux Toolkit",
  "Tailwind CSS",
  "Chakra UI",
  "REST API",
  "GraphQL",
  "Firebase",
  "Supabase",
  "Appwrite",
  "CI/CD",
  "GitHub Actions",
] as const;

export const EXPERIENCE = [
  {
    role: "Senior Mobile Engineer",
    place: "Remote — India",
    date: "2025 – Present",
    points: [
      "Designed and developed user-focused, responsive mobile applications.",
      "Optimized the mobile codebase for peak performance and scalability.",
      "Created intuitive mobile UI/UX for seamless user experiences.",
      "Built, maintained, and enhanced core mobile app features.",
    ],
  },
  {
    role: "Senior Front-End Engineer",
    place: "Remote — Nigeria",
    date: "2024 – 2025",
    points: [
      "Designed and developed user-focused, responsive web and mobile interfaces.",
      "Implemented UI/UX best practices to deliver seamless user experiences.",
      "Optimized the front-end codebase for performance, scalability, and maintainability.",
    ],
  },
  {
    role: "Junior Front-End Engineer",
    place: "Remote — Nigeria",
    date: "2020 – 2024",
    points: [
      "Designed and developed user-focused, responsive web and mobile applications.",
      "Applied UI/UX best practices and optimized code for peak performance.",
      "Built intuitive interfaces and maintained a scalable front-end codebase.",
    ],
  },
] as const;

export const EDUCATION = [
  {
    title: "B.Sc. Computer Science",
    school: "Nnamdi Azikiwe University, Awka",
    date: "2022 – 2025",
  },
  {
    title: "HTML5 / CSS3 / JavaScript",
    school: "ApTech Computer Education",
    date: "2020 – 2022",
  },
] as const;

export const SERVICES = [
  {
    title: "Front-End Development",
    text: "Responsive web interfaces with React.js, Next.js, and TypeScript—built for performance and maintainability.",
  },
  {
    title: "Mobile App Development",
    text: "User-focused React Native apps with intuitive UI/UX and core features that scale.",
  },
  {
    title: "API Integration",
    text: "REST and GraphQL integrations with solid state management across web and mobile clients.",
  },
  {
    title: "Performance & CI/CD",
    text: "Codebase optimization, scalable architecture, and delivery pipelines with GitHub Actions.",
  },
] as const;

export type PortfolioFilter = "all" | "product" | "inter" | "web";

export const PORTFOLIO = [
  {
    title: "Ventlio Webapp",
    category: "inter" as const,
    image: "/assets/ventlio_mockup4.jpg",
    alt: "Ventlio webapp",
    href: "https://ventlio.com/",
  },
  {
    title: "Logistics Website",
    category: "inter" as const,
    image: "/assets/oltem-logistics.jpg",
    alt: "Oltem Logistics website",
    href: "https://oltemlogistics.com/",
  },
  {
    title: "Shippex Application",
    category: "web" as const,
    image: "/assets/shippex.jpg",
    alt: "Shippex application",
    href: "https://github.com/mezieOX/shippex/blob/main/README.md",
  },
  {
    title: "FMX Website",
    category: "product" as const,
    image: "/assets/fmx-website.jpg",
    alt: "FMX website",
    href: "https://fmx-website.vercel.app/",
  },
  {
    title: "Prime Homes",
    category: "product" as const,
    image: "/assets/primes-home-website.jpg",
    alt: "Prime Homes website",
    href: "https://primehomes.vercel.app/",
  },
  {
    title: "Trade-vu Webapp",
    category: "product" as const,
    image: "/assets/trade-vu-website.jpg",
    alt: "Trade-vu webapp",
    href: "https://trade-vu.vercel.app/",
  },
  {
    title: "One-way Webapp",
    category: "inter" as const,
    image: "/assets/one-way.jpg",
    alt: "One-way website",
    href: "https://website.oneway.ng/",
  },
  {
    title: "IBX Website",
    category: "inter" as const,
    image: "/assets/ibx.jpg",
    alt: "IBX website",
    href: "https://www.ibxp2p.com/",
  },
  {
    title: "Biltflow Application",
    category: "web" as const,
    image: "/assets/bilt-flow.jpg",
    alt: "Biltflow application",
    href: "#",
  },
  {
    title: "Rigzo Application",
    category: "web" as const,
    image: "/assets/rigzo.jpg",
    alt: "Rigzo application",
    href: "#",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Evelyn Granville",
    role: "Executive Officer",
    company: "@ABEnergy",
    image: "/assets/testi1.jpg",
    quote:
      "Oltem Logistics’ revamped web app transformed my experience. Finding and ordering is a breeze—user-friendly, with superb search features.",
  },
  {
    name: "Antonio Smith",
    role: "CEO of",
    company: "@Eco_Focus",
    image: "/assets/testi2.jpg",
    quote:
      "This app is amazing. The atmosphere is great and serene. Would recommend it—especially when travelling.",
  },
  {
    name: "Ben Dennis",
    role: "Software Engineer",
    company: "@Epic_Dev",
    image: "/assets/testi3.jpg",
    quote:
      "After the Android updates, I hardly use the computer to find and order what I need. Search is great, and the assistant makes returns and tracking quick.",
  },
] as const;

export const CV_PATH = "/assets/Ikemma_Augustine_Chimezie_CV.pdf";
export const EMAIL = "meziepage@gmail.com";
export const PHONE = "+2348070434720";
export const PHONE_DISPLAY = "+234 807 043 4720";
