"use client";

import { useEffect, useRef, useState } from "react";
import { CV_PATH, EMAIL, SERVICES, getYearsOfExperience } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Services() {
  const years = getYearsOfExperience();
  const milestonesRef = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);
  const [yearsCount, setYearsCount] = useState(0);
  const [rolesCount, setRolesCount] = useState(0);

  useEffect(() => {
    const el = milestonesRef.current;
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

    const animate = (
      target: number,
      setter: (value: number) => void,
    ) => {
      let current = 0;
      const tick = () => {
        current += 1;
        setter(Math.min(current, target));
        if (current < target) timers.push(setTimeout(tick, 12));
      };
      timers.push(setTimeout(tick, 400));
    };

    animate(years, setYearsCount);
    animate(3, setRolesCount);

    return () => timers.forEach(clearTimeout);
  }, [played, years]);

  return (
    <section className="services section" id="services">
      <div className="container">
        <Reveal className="services-info">
          <h3 className="sub-heading">My services</h3>
          <h1 className="heading">What I can do for you</h1>
          <p className="text">
            Front-end and mobile engineering focused on responsive interfaces,
            clean UI/UX, API integration, and performant codebases.
          </p>
          <div className="milestones" ref={milestonesRef}>
            <div className="ml">
              <h2 className="number">
                <span>{yearsCount}</span>+
              </h2>
              <h5>Years</h5>
            </div>
            <div className="ml">
              <h2 className="number">
                <span>{rolesCount}</span>
              </h2>
              <h5>Roles</h5>
            </div>
            <div className="ml">
              <h2 className="number">Web + Mobile</h2>
              <h5>Focus</h5>
            </div>
          </div>
          <div className="cta">
            <a href={`mailto:${EMAIL}`} className="btn">
              Hire me
            </a>
            <a href={CV_PATH} download className="btn secondary-btn">
              Download CV
            </a>
          </div>
        </Reveal>
        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} className="srv-card" delayMs={index * 80}>
              <div className="card-desc">
                <h3>{service.title}</h3>
                <p className="text">{service.text}</p>
              </div>
              <a href={`mailto:${EMAIL}`} className="btn secondary-btn">
                Hire me
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
