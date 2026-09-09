const header = document.querySelector("header");
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle.sk-value");
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
  const icon = toggle_btn.querySelector("i") || toggle_btn;
  if (isDark) {
    document.body.classList.add("dark");
    icon.classList.replace("fa-moon-o", "fa-sun-o");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    icon.classList.replace("fa-sun-o", "fa-moon-o");
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

zoom_icons.forEach((icn, i) =>
  icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
  }),
);

modal_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? imageCount - 1 : currentIndex - 1;
  changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
  currentIndex = currentIndex === imageCount - 1 ? 0 : currentIndex + 1;
  changeImage(currentIndex);
});

function changeImage(index) {
  images.forEach((img) => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}

window.addEventListener("scroll", () => {
  if (!skillsPlayed) skillsCounter();
  if (!mlPlayed) mlCounter();
  activeLink();
});

function stickyNavbar() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

stickyNavbar();
window.addEventListener("scroll", stickyNavbar, { passive: true });

let sr = null;

if (window.innerWidth > 768) {
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

/* Infinite tools marquee: clone list for seamless loop */
const toolsTrack = document.querySelector(".tools-track");
const toolsList = document.querySelector(".tools-list");
if (toolsTrack && toolsList) {
  const clone = toolsList.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  toolsTrack.appendChild(clone);
}

/* FAQ: keep only one item open at a time */
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-item").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

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

var skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill)) return;
  skillsPlayed = true;

  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);
    progress_bars[i].style.setProperty("--target", strokeValue);
    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });

  progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards"),
  );
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
});

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