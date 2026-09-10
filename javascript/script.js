const header = document.querySelector("header");
const first_skill = document.querySelector(".skill:first-child");
const skills_wrap = document.querySelector(".skills-wrap");
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");
const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");
const links = document.querySelectorAll(".nav-link");
const toggle_btn = document.querySelector(".toggle-btn");
const hamburger = document.querySelector(".hamburger");
const date = document.getElementById("date");

const yearsOfExperience = 6;

document.querySelectorAll(".exp-years").forEach((el) => {
  el.textContent = yearsOfExperience;
});

const yearsCounter = document.querySelector(".years-counter");
if (yearsCounter) {
  yearsCounter.dataset.target = String(yearsOfExperience);
}

date.innerText = new Date().getFullYear();

toggle_btn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
});

var firstTheme = localStorage.getItem("dark");
changeTheme(+firstTheme);

function changeTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("dark", 0);
  }
}

hamburger.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("open");
  document.body.classList.toggle("stopScrolling", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

links.forEach((link) =>
  link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
    hamburger.setAttribute("aria-expanded", "false");
  }),
);

document.querySelector(".overlay")?.addEventListener("click", () => {
  document.body.classList.remove("open");
  document.body.classList.remove("stopScrolling");
  hamburger.setAttribute("aria-expanded", "false");
});

var currentIndex = 0;
const imageCount = images.length;
let lastFocusedEl = null;
const portfolioModal = document.querySelector(".portfolio .modal");

function getModalFocusable() {
  if (!portfolioModal) return [];
  return Array.from(
    portfolioModal.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
}

function setModalOpenState(isOpen) {
  if (!portfolioModal) return;
  portfolioModal.setAttribute("aria-hidden", String(!isOpen));
  portfolioModal.setAttribute("aria-modal", String(isOpen));
  if (isOpen) {
    portfolioModal.removeAttribute("inert");
  } else {
    portfolioModal.setAttribute("inert", "");
  }
}

function changeImage(index) {
  images.forEach((img) => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}

function openPortfolioModal(index) {
  currentIndex = index;
  changeImage(currentIndex);
  prt_section.classList.add("open");
  document.body.classList.add("stopScrolling");
  lastFocusedEl = document.activeElement;
  setModalOpenState(true);
  modal_overlay.style.pointerEvents = "none";
  setTimeout(() => {
    if (prt_section.classList.contains("open")) {
      modal_overlay.style.pointerEvents = "";
      next_btn?.focus();
    }
  }, 350);
}

function closePortfolioModal() {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
  modal_overlay.style.pointerEvents = "";
  setModalOpenState(false);
  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
    lastFocusedEl.focus();
  }
}

setModalOpenState(false);

zoom_icons.forEach((icn, i) =>
  icn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPortfolioModal(i);
  }),
);

modal_overlay.addEventListener("click", (e) => {
  e.stopPropagation();
  closePortfolioModal();
});

document.addEventListener("keydown", (e) => {
  if (!prt_section.classList.contains("open")) return;
  if (e.key === "Escape") {
    e.preventDefault();
    closePortfolioModal();
    return;
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    currentIndex = currentIndex === 0 ? imageCount - 1 : currentIndex - 1;
    changeImage(currentIndex);
  }
  if (e.key === "ArrowRight") {
    e.preventDefault();
    currentIndex = currentIndex === imageCount - 1 ? 0 : currentIndex + 1;
    changeImage(currentIndex);
  }
  if (e.key === "Tab") {
    const focusable = getModalFocusable();
    if (!focusable.length) {
      e.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (!portfolioModal.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    }
  }
});

prev_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = currentIndex === 0 ? imageCount - 1 : currentIndex - 1;
  changeImage(currentIndex);
});

next_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = currentIndex === imageCount - 1 ? 0 : currentIndex + 1;
  changeImage(currentIndex);
});

function stickyNavbar() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

stickyNavbar();
window.addEventListener("scroll", stickyNavbar, { passive: true });

function hasReached(el) {
  if (!el) return false;
  let topPosition = el.getBoundingClientRect().top;
  return window.innerHeight >= topPosition + el.offsetHeight * 0.35;
}

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;
  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

var mlPlayed = false;

function mlCounter() {
  if (!hasReached(ml_section)) return;
  mlPlayed = true;
  ml_counters.forEach((ctr) => {
    let target = +ctr.dataset.target;
    setTimeout(() => {
      updateCount(ctr, target);
    }, 400);
  });
}

var skillsPlayed = false;

function skillsReveal() {
  if (!first_skill || !skills_wrap) return;
  if (!hasReached(first_skill)) return;
  skillsPlayed = true;
  skills_wrap.classList.add("is-in");
}

function activeLink() {
  const sections = document.querySelectorAll("section[id]");
  const offset = header.offsetHeight + 40;
  let currentId = null;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top - offset <= 0) {
      currentId = section.id;
    }
  });

  links.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const id = href.startsWith("#") ? href.slice(1) : "";
    link.classList.toggle("active", Boolean(currentId) && id === currentId);
  });
}

activeLink();

window.addEventListener(
  "scroll",
  () => {
    if (!skillsPlayed) skillsReveal();
    if (!mlPlayed) mlCounter();
    activeLink();
  },
  { passive: true },
);

let sr = null;

if (window.innerWidth > 768 && typeof ScrollReveal === "function") {
  sr = ScrollReveal({
    duration: 900,
    distance: "32px",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    reset: false,
    viewFactor: 0.15,
  });

  sr.reveal(".showcase-info", { delay: 80 });
  sr.reveal(".showcase-image", {
    origin: "bottom",
    delay: 160,
    afterReveal: (el) => el.classList.add("is-floating"),
  });
  sr.reveal(".about-card", { interval: 80 });
  sr.reveal(".about-info", { delay: 100 });
  sr.reveal(".skill-box", { delay: 80 });
  sr.reveal(".skills-wrap .skill", { interval: 60 });
  sr.reveal(".skill-tags li", { interval: 40 });
  sr.reveal(".exp-item", { interval: 100 });
  sr.reveal(".edu-item", { interval: 80 });
  sr.reveal(".services-info", { origin: "left" });
  sr.reveal(".srv-card", { interval: 80 });
  sr.reveal(".prt-card", { interval: 60 });
  sr.reveal(".testimonials-title", { delay: 80 });
  sr.reveal(".daily-tools-header", { delay: 80 });
  sr.reveal(".tools-marquee", { delay: 120, distance: "24px" });
  sr.reveal(".faq-header", { delay: 80 });
  sr.reveal(".faq-item", { interval: 60 });
  sr.reveal(".contact-info", { origin: "left" });
  sr.reveal(".contact-form", { origin: "right", delay: 80 });
  sr.reveal(".sub-box", { delay: 80 });
} else {
  document.querySelector(".showcase-image")?.classList.add("is-floating");
}

const toolsTrack = document.querySelector(".tools-track");
const toolsList = document.querySelector(".tools-list");
if (toolsTrack && toolsList) {
  const clone = toolsList.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  toolsTrack.appendChild(clone);
}

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-item").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 450,
  },
});

const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 600,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  watchOverflow: true,
  observer: true,
  observeParents: true,
  preventClicks: true,
  preventClicksPropagation: true,
});

const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector('input[name="email"]');
    const submitBtn = newsletterForm.querySelector('input[type="submit"]');
    const originalLabel = submitBtn?.value;
    const endpoint = newsletterForm.getAttribute("action");

    if (!endpoint || !emailInput) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.value = "Subscribing…";
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(newsletterForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Subscribe failed");

      newsletterForm.reset();
      emailInput.value = "";
      if (submitBtn) submitBtn.value = "Subscribed";
    } catch {
      if (submitBtn) submitBtn.value = "Try again";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        window.setTimeout(() => {
          submitBtn.value = originalLabel || "Subscribe";
        }, 2000);
      }
    }
  });
}
