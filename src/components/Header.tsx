"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { NAV_LINKS } from "@/lib/data";

function readDarkPreference() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("dark") === "1";
  } catch {
    return false;
  }
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(readDarkPreference);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);

      const headerOffset = 80;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[id]"),
      );
      const passed = sections.filter(
        (section) => section.getBoundingClientRect().top - headerOffset <= 0,
      );
      const current = passed.at(-1);
      if (current) setActive(`#${current.id}`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("open", menuOpen);
    document.body.classList.toggle("stopScrolling", menuOpen);
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.body.classList.toggle("dark", next);
    localStorage.setItem("dark", next ? "1" : "0");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="overlay" onClick={closeMenu} aria-hidden="true" />
      <header className={scrolled ? "scrolled" : undefined}>
        <nav className="container">
          <a href="#home" className="logo" onClick={closeMenu}>
            Mezie<span>.</span>
          </a>
          <div className="links">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link${active === link.href ? " active" : ""}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-actions">
            <button
              type="button"
              className="toggle-btn"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {dark ? <FaSun aria-hidden /> : <FaMoon aria-hidden />}
            </button>
            <button
              type="button"
              className="hamburger"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
