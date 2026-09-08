import { EDUCATION, EXPERIENCE } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <Reveal className="experience-header">
          <h3 className="sub-heading">Experience</h3>
          <h1 className="heading">Where I’ve worked</h1>
          <p className="text">
            From junior front-end roles to senior mobile engineering—building
            responsive products, improving performance, and shipping features
            end-to-end.
          </p>
        </Reveal>
        <div className="experience-list">
          {EXPERIENCE.map((job, index) => (
            <Reveal key={job.role} className="exp-item" delayMs={index * 100}>
              <div className="exp-meta">
                <p className="exp-role">{job.role}</p>
                <p className="exp-place">{job.place}</p>
                <p className="exp-date">{job.date}</p>
              </div>
              <ul className="exp-points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div className="education">
          <h3 className="sub-heading">Education</h3>
          <div className="education-grid">
            {EDUCATION.map((item, index) => (
              <Reveal key={item.title} className="edu-item" delayMs={index * 80}>
                <h4>{item.title}</h4>
                <p>{item.school}</p>
                <span>{item.date}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
