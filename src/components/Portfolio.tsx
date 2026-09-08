"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaLink,
  FaSearchPlus,
} from "react-icons/fa";
import { PORTFOLIO, type PortfolioFilter } from "@/lib/data";
import { Reveal } from "./Reveal";

const FILTERS: { label: string; value: PortfolioFilter }[] = [
  { label: "All", value: "all" },
  { label: "Ongoing", value: "product" },
  { label: "Interesting", value: "inter" },
  { label: "Apps", value: "web" },
];

export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = useMemo(
    () =>
      filter === "all"
        ? [...PORTFOLIO]
        : PORTFOLIO.filter((item) => item.category === filter),
    [filter],
  );

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
    document.body.classList.add("stopScrolling");
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.classList.remove("stopScrolling");
  };

  const showPrev = () => {
    setCurrentIndex((i) => (i === 0 ? PORTFOLIO.length - 1 : i - 1));
  };

  const showNext = () => {
    setCurrentIndex((i) => (i === PORTFOLIO.length - 1 ? 0 : i + 1));
  };

  return (
    <section
      className={`portfolio section${modalOpen ? " open" : ""}`}
      id="portfolio"
    >
      <div className="modal" aria-hidden={!modalOpen}>
        <div className="modal-overlay" onClick={closeModal} />
        <div className="slider-wrap">
          <button
            type="button"
            className="prev-btn navigation"
            onClick={showPrev}
            aria-label="Previous project"
          >
            <FaArrowLeft />
          </button>
          <div className="images">
            {PORTFOLIO.map((item, index) => (
              <Image
                key={item.title}
                src={item.image}
                alt={item.alt}
                width={1200}
                height={800}
                className={index === currentIndex ? "showImage" : undefined}
                sizes="(max-width: 768px) 90vw, 70vw"
              />
            ))}
          </div>
          <button
            type="button"
            className="next-btn navigation"
            onClick={showNext}
            aria-label="Next project"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="container">
        <div className="portfolio-header">
          <Reveal className="portfolio-title">
            <h3 className="sub-heading">Portfolio</h3>
            <h1 className="heading">Selected work</h1>
          </Reveal>
          <div className="portfolio-btns">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`filter-btn${filter === item.value ? " active" : ""}`}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-gallery">
          {items.map((item, index) => {
            const absoluteIndex = PORTFOLIO.findIndex(
              (project) => project.title === item.title,
            );
            return (
              <Reveal
                key={item.title}
                className={`mix prt-card ${item.category}`}
                delayMs={index * 60}
              >
                <div className="prt-image">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="prt-overlay">
                    <button
                      type="button"
                      className="prt-icon zoom-icon"
                      aria-label={`Preview ${item.title}`}
                      onClick={() => openModal(absoluteIndex)}
                    >
                      <FaSearchPlus aria-hidden />
                    </button>
                    <a
                      href={item.href}
                      target={item.href === "#" ? undefined : "_blank"}
                      rel={item.href === "#" ? undefined : "noopener noreferrer"}
                      className="prt-icon"
                      aria-label={`Open ${item.title}`}
                    >
                      <FaLink aria-hidden />
                    </a>
                  </div>
                </div>
                <div className="prt-desc">
                  <h3>{item.title}</h3>
                  <a
                    href={item.href}
                    target={item.href === "#" ? undefined : "_blank"}
                    rel={item.href === "#" ? undefined : "noopener noreferrer"}
                    className="btn secondary-btn sm"
                  >
                    View
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
