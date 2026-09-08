import Image from "next/image";
import { CV_PATH, EMAIL, getYearsOfExperience } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Hero() {
  const years = getYearsOfExperience();

  return (
    <section className="showcase-area" id="home">
      <div className="container">
        <Reveal className="showcase-info">
          <h3 className="sub-heading">Senior Front-End / Mobile Engineer</h3>
          <h1 className="heading">Ikemma Augustine Chimezie</h1>
          <p className="text">
            Front-end and mobile engineer with{" "}
            <span className="exp-years">{years}</span> years of experience
            building user-focused, responsive web and mobile applications.
            Specializes in React.js, React Native, Next.js, and TypeScript.
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
        <Reveal className="showcase-image is-floating" delayMs={120}>
          <Image
            src="/assets/mezie2.jpg"
            alt="Ikemma Augustine Chimezie"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 40vw"
            className="person"
          />
        </Reveal>
      </div>
    </section>
  );
}
