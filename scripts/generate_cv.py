#!/usr/bin/env python3
"""Generate Ikemma Augustine Chimezie CV — matches portfolio and CV source content."""

from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "Ikemma_Augustine_Chimezie_CV.pdf"

PAGE_W, PAGE_H = A4
LEFT = 14 * mm
RIGHT = PAGE_W - 14 * mm
WIDTH = RIGHT - LEFT
TOP = PAGE_H - 12 * mm
BOTTOM = 14 * mm


def new_page(c: canvas.Canvas) -> float:
    c.showPage()
    return TOP


def ensure_space(c: canvas.Canvas, y: float, needed: float = 18 * mm) -> float:
    if y < BOTTOM + needed:
        return new_page(c)
    return y


def draw_wrapped(
    c,
    text,
    x,
    y,
    max_width,
    font="Helvetica",
    size=9,
    leading=12,
    color=(0.15, 0.15, 0.15),
):
    c.setFont(font, size)
    c.setFillColorRGB(*color)
    words = text.split()
    lines = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if c.stringWidth(trial, font, size) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    for line in lines:
        y = ensure_space(c, y, leading)
        c.drawString(x, y, line)
        y -= leading
    return y


def section_title(c: canvas.Canvas, title: str, y: float) -> float:
    y = ensure_space(c, y, 28 * mm)
    c.setFont("Helvetica-Bold", 9.5)
    c.setFillColorRGB(0.1, 0.1, 0.1)
    c.drawString(LEFT, y, title)
    y -= 3
    c.setStrokeColorRGB(0.75, 0.75, 0.75)
    c.setLineWidth(0.6)
    c.line(LEFT, y, RIGHT, y)
    return y - 10


def job_header(c, role, dates, company, place, y):
    y = ensure_space(c, y, 22 * mm)
    c.setFont("Helvetica-Bold", 9)
    c.setFillColorRGB(0.1, 0.1, 0.1)
    c.drawString(LEFT, y, role)
    c.setFont("Helvetica", 8.5)
    c.drawRightString(RIGHT, y, dates)
    y -= 10
    c.setFillColorRGB(0.25, 0.25, 0.25)
    c.drawString(LEFT, y, f"{company}  ·  {place}")
    return y - 9


BULLET_X = LEFT + 2.5
BULLET_TEXT_X = LEFT + 11
BULLET_WIDTH = WIDTH - (BULLET_TEXT_X - LEFT)


def bullets(c, items, y, leading=10.2):
    for item in items:
        y = ensure_space(c, y, leading * 2)
        c.setFont("Helvetica", 8.2)
        c.setFillColorRGB(0.2, 0.2, 0.2)
        c.drawString(BULLET_X, y, "•")
        y = draw_wrapped(
            c,
            item,
            BULLET_TEXT_X,
            y,
            BULLET_WIDTH,
            font="Helvetica",
            size=8.2,
            leading=leading,
            color=(0.2, 0.2, 0.2),
        )
        y -= 3
    return y - 4


def draw_header(c: canvas.Canvas) -> float:
    cx = PAGE_W / 2
    y = TOP
    c.setFont("Helvetica-Bold", 13.5)
    c.setFillColorRGB(0.08, 0.08, 0.08)
    c.drawCentredString(cx, y, "IKEMMA AUGUSTINE CHIMEZIE")
    y -= 14
    c.setFont("Helvetica", 9.5)
    c.setFillColorRGB(0.2, 0.2, 0.2)
    c.drawCentredString(
        cx,
        y,
        "Senior Front-End / Mobile Engineer | AI-Assisted Development",
    )
    y -= 12
    c.setFont("Helvetica", 8.3)
    c.drawCentredString(
        cx, y, "meziepage@gmail.com | +234 807 043 4720 | Lagos, Nigeria"
    )
    y -= 10
    c.drawCentredString(
        cx,
        y,
        "Portfolio: augustine-ikemma.vercel.app | github.com/mezieOX | linkedin.com/in/mezie",
    )
    return y - 14


def main():
    c = canvas.Canvas(str(OUT), pagesize=A4)
    c.setAuthor("Ikemma Augustine Chimezie")
    c.setTitle("Ikemma Augustine Chimezie - CV")

    y = draw_header(c)

    y = section_title(c, "PROFILE", y)
    profile = (
        "Senior front-end and mobile engineer with 6+ years of experience "
        "building and shipping React, Next.js and React Native products, from "
        "SME operations platforms across Africa to iOS and Android apps released "
        "on the App Store and Google Play. Strong in TypeScript, API integration, "
        "state management, debugging and production delivery. Uses AI-assisted "
        "development daily (Cursor, prompt engineering) to build, refactor and "
        "test faster."
    )
    y = draw_wrapped(c, profile, LEFT, y, WIDTH, size=8.3, leading=10.8)
    y -= 10

    y = section_title(c, "WORK EXPERIENCE", y)

    jobs = [
        {
            "role": "Senior Mobile Engineer",
            "dates": "2025 – Present",
            "company": "August Techie / Kindrel",
            "place": "Remote, India · Full-time",
            "bullets": [
                "Lead React Native for Kindrel (family trees, chat, events, savings) on iOS and Android.",
                "App Store and Play releases with RN CLI/Expo, GraphQL, TanStack Query, Redux Toolkit.",
                "Day-to-day Cursor use for builds, refactors, and QA.",
                "React DevTools / Chrome DevTools; closer design-to-dev handoff.",
            ],
        },
        {
            "role": "Senior Front-End Engineer",
            "dates": "2025",
            "company": "BrandDrive",
            "place": "Remote, Nigeria · Full-time",
            "bullets": [
                "Next.js work on invoicing, POS, inventory, and payments for SMEs.",
                "REST APIs and Formik forms for core product flows.",
                "Shipped with product and design; fixed production issues on web.",
            ],
        },
        {
            "role": "Senior Front-End / Mobile Engineer",
            "dates": "2023 – 2025",
            "company": "Oneway",
            "place": "Remote, Nigeria · Full-time",
            "bullets": [
                "React Native and web UI for inventory, POS, and self-checkout retail.",
                "Owned storefront, inventory, and payment flows.",
                "App Store and Play releases; production debugging with React DevTools.",
            ],
        },
        {
            "role": "Senior Front-End Engineer",
            "dates": "2022 – 2024",
            "company": "IBX Exchange",
            "place": "Remote, Nigeria · Part-time / contract",
            "bullets": [
                "React and Bootstrap UI for web/mobile trading and wallet apps.",
                "Formik forms; performance and reliability fixes in production.",
            ],
        },
        {
            "role": "Junior Front-End Engineer",
            "dates": "2022",
            "company": "Osmaxin Developers",
            "place": "Remote, Nigeria",
            "bullets": [
                "Oltem Logistics site and ops UI in Next.js (orders and tracking).",
                "REST APIs and Formik forms; production-ready UI with the team.",
            ],
        },
        {
            "role": "Junior Front-End Engineer",
            "dates": "2020 – 2022",
            "company": "Ventlio",
            "place": "Hybrid / Remote, Nigeria",
            "bullets": [
                "Early React web and mobile UI; shared Formik and Axios patterns.",
                "Owned fixes, UX polish, and front-end maintenance in production.",
            ],
        },
    ]

    for job in jobs:
        y = job_header(c, job["role"], job["dates"], job["company"], job["place"], y)
        y = bullets(c, job["bullets"], y)

    y = section_title(c, "SELECTED PROJECTS", y)
    projects = [
        "Kindrel · React Native, GraphQL · kindrel.com",
        "ForgeDesk · Next.js work-order MVP · work-orders-rho.vercel.app",
        "BrandDrive · Next.js SME ops · branddrive.co",
        "Oneway · React Native retail suite · tryoneway.com",
        "IBX · React trading/wallet UI · ibxp2p.com",
        "Ventlio · React product UI · ventlio.com",
        "Oltem Logistics · Next.js client site · oltemll.com",
    ]
    for line in projects:
        y = draw_wrapped(c, line, LEFT, y, WIDTH, size=8.2, leading=10.5)
        y -= 2
    y -= 6

    y = section_title(c, "SKILLS", y)
    skill_lines = [
        ("Languages: ", "JavaScript (ES6+), TypeScript, HTML5, CSS3"),
        (
            "Frameworks & Runtimes: ",
            "React.js, Next.js, React Native (CLI & Expo), React Navigation, Electron, Vite, Node.js",
        ),
        (
            "State & Data: ",
            "Redux Toolkit, React Context, TanStack Query, Axios, REST, GraphQL, Firebase, Supabase",
        ),
        ("Forms & Validation: ", "Formik, Yup"),
        ("UI & Design: ", "Tailwind CSS, Bootstrap, Chakra UI, Figma"),
        (
            "Mobile Delivery: ",
            "Xcode, Android Studio, EAS Build & Submit, TestFlight, App Store Connect, Google Play Console",
        ),
        (
            "Testing & Code Quality: ",
            "Jest, React Testing Library, ESLint, Prettier, React DevTools, Chrome DevTools",
        ),
        (
            "Tooling & DevOps: ",
            "Git, GitHub, GitHub Actions, CI/CD, npm, Yarn, Postman, Vercel",
        ),
        (
            "AI-Assisted Development: ",
            "Cursor, prompt engineering, AI-assisted coding, refactoring and testing",
        ),
        (
            "Key Packages: ",
            "Axios, TanStack Query, Redux Toolkit, Formik, Yup, React Navigation, Expo SDK",
        ),
    ]
    for label, body in skill_lines:
        y = ensure_space(c, y, 14 * mm)
        c.setFont("Helvetica-Bold", 8.2)
        c.setFillColorRGB(0.15, 0.15, 0.15)
        label_w = c.stringWidth(label, "Helvetica-Bold", 8.2)
        c.drawString(LEFT, y, label)
        y = draw_wrapped(
            c,
            body,
            LEFT + label_w,
            y,
            WIDTH - label_w,
            font="Helvetica",
            size=8.2,
            leading=10.5,
        )
        y -= 3
    y -= 6

    y = section_title(c, "EDUCATION", y)
    education = [
        "B.Sc. Computer Science, Nnamdi Azikiwe University, Awka",
        "Osmaxin Developers, Web & mobile training",
        "ApTech Computer Education, HTML5 / CSS3 / JavaScript",
        "Udemy (React, Next.js, Vite) · freeCodeCamp projects",
        "Clever Programmer (React) · CodeWithMosh (React Native)",
    ]
    for item in education:
        y = draw_wrapped(c, item, LEFT, y, WIDTH, size=8.2, leading=10.5)
        y -= 2

    c.save()
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()