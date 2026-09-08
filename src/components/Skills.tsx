"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { EMAIL, SKILL_TAGS, SKILLS } from "@/lib/data";
import { Reveal } from "./Reveal";

const CIRCUMFERENCE = 427;

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);
  const [counts, setCounts] = useState(() => SKILLS.map(() => 0));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || played) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlayed(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [played]);

  useEffect(() => {
    if (!played) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    SKILLS.forEach((skill, index) => {
      let current = 0;
      const tick = () => {
        current += 1;
        setCounts((prev) => {
          const next = [...prev];
          next[index] = Math.min(current, skill.target);
          return next;
        });
        if (current < skill.target) {
          timers.push(setTimeout(tick, 12));
        }
      };
      timers.push(setTimeout(tick, 400));
    });

    return () => timers.forEach(clearTimeout);
  }, [played]);

  return (
    <section className="skills section">
      <div className="container">
        <Reveal className="skill-box">
          <div className="box-heading">
            <h3 className="sub-heading">My skills</h3>
            <h1 className="heading">Tools I ship with</h1>
            <div className="box-desc">
              <p className="text">
                Top skills across React.js, Next.js, React Native, TypeScript,
                API integration, and Vite—plus strong practice in state
                management and CI/CD.
              </p>
              <a href={`mailto:${EMAIL}`} className="btn">
                Hire me
              </a>
            </div>
          </div>
          <div className="skills-wrap" ref={sectionRef}>
            {SKILLS.map((skill, index) => {
              const stroke = CIRCUMFERENCE - CIRCUMFERENCE * (skill.target / 100);
              return (
                <div className="skill" key={skill.title}>
                  <div className="sk-progress">
                    <svg viewBox="0 0 150 150" aria-hidden="true">
                      <circle className="sk-track" cx="75" cy="75" r="68" />
                      <circle
                        className="sk-value"
                        cx="75"
                        cy="75"
                        r="68"
                        style={
                          played
                            ? ({
                                ["--target"]: stroke,
                                animation: "progress 2s ease-in-out forwards",
                              } as CSSProperties)
                            : undefined
                        }
                      />
                    </svg>
                    <p className="counter">
                      <span>{counts[index]}</span>%
                    </p>
                  </div>
                  <div className="sk-title">{skill.title}</div>
                </div>
              );
            })}
          </div>
          <ul className="skill-tags">
            {SKILL_TAGS.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
