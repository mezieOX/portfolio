import { CV_PATH, EMAIL } from "@/lib/data";
import { Reveal } from "./Reveal";

const cards = [
  {
    title: "Responsive Web Apps",
    icon: (
      <svg className="icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect
          x="8"
          y="10"
          width="32"
          height="28"
          rx="4"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M16 20h16M16 26h12M16 32h8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Mobile Development",
    icon: (
      <svg className="icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect
          x="16"
          y="8"
          width="16"
          height="32"
          rx="3"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M22 34h4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "API Integration",
    icon: (
      <svg className="icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M12 24h8l4-10 4 20 4-10h8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Performance & UX",
    icon: (
      <svg className="icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M24 16v8l5 3"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-grid">
          {cards.map((card, index) => (
            <Reveal key={card.title} className="about-card" delayMs={index * 80}>
              {card.icon}
              <h3>{card.title}</h3>
            </Reveal>
          ))}
        </div>
        <Reveal className="about-info" delayMs={100}>
          <h3 className="sub-heading">About me</h3>
          <h1 className="heading">
            User-focused apps,
            <br />
            clean engineering
          </h1>
          <p className="text">
            Skilled at optimizing performance and scalability while delivering
            clean, intuitive UI/UX. Comfortable owning features end-to-end and
            collaborating closely with cross-functional teams.
          </p>
          <div className="cta">
            <a href={`mailto:${EMAIL}`} className="btn">
              Contact me
            </a>
            <a href={CV_PATH} download className="btn secondary-btn">
              Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
