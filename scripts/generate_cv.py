#!/usr/bin/env python3
"""Generate Ikemma Augustine Chimezie CV to match portfolio site content."""

from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "Ikemma_Augustine_Chimezie_CV.pdf"
PHOTO = ROOT / "assets" / "mezie2.jpg"

PAGE_W, PAGE_H = A4
LEFT = 14 * mm
RIGHT = PAGE_W - 14 * mm
WIDTH = RIGHT - LEFT
PHOTO_SIZE = 26 * mm


def draw_wrapped(c, text, x, y, max_width, font="Helvetica", size=9, leading=12, color=(0.15, 0.15, 0.15)):
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
        c.drawString(x, y, line)
        y -= leading
    return y


def section_title(c, title, y):
    c.setFont("Helvetica-Bold", 9.5)
    c.setFillColorRGB(0.1, 0.1, 0.1)
    c.drawString(LEFT, y, title)
    y -= 3
    c.setStrokeColorRGB(0.75, 0.75, 0.75)
    c.setLineWidth(0.6)
    c.line(LEFT, y, RIGHT, y)
    return y - 10


def job_header(c, role, dates, company, place, y):
    c.setFont("Helvetica-Bold", 9)
    c.setFillColorRGB(0.1, 0.1, 0.1)
    c.drawString(LEFT, y, role)
    c.setFont("Helvetica", 8.5)
    c.drawRightString(RIGHT, y, dates)
    y -= 10
    c.setFillColorRGB(0.25, 0.25, 0.25)
    c.drawString(LEFT, y, f"{company} - {place}")
    return y - 9


def bullets(c, items, y, leading=10.5):
    c.setFont("Helvetica", 8.2)
    c.setFillColorRGB(0.2, 0.2, 0.2)
    for item in items:
        c.drawString(LEFT + 2, y, "-")
        y = draw_wrapped(
            c,
            item,
            LEFT + 9,
            y,
            WIDTH - 9,
            font="Helvetica",
            size=8.2,
            leading=leading,
            color=(0.2, 0.2, 0.2),
        )
        y -= 2
    return y - 5.5


def draw_photo(c, path, x, y, size):
    img = ImageReader(str(path))
    iw, ih = img.getSize()
    cx = x + size / 2
    cy = y + size / 2
    scale = max(size / iw, size / ih)
    dw, dh = iw * scale, ih * scale
    c.saveState()
    clip = c.beginPath()
    clip.circle(cx, cy, size / 2)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(img, cx - dw / 2, cy - dh / 2, width=dw, height=dh, mask="auto")
    c.restoreState()
    c.setStrokeColorRGB(0.7, 0.7, 0.7)
    c.setLineWidth(0.8)
    c.circle(cx, cy, size / 2, stroke=1, fill=0)


def main():
    c = canvas.Canvas(str(OUT), pagesize=A4)
    y_top = PAGE_H - 10 * mm

    name = "IKEMMA AUGUSTINE CHIMEZIE"
    title = "Senior Front-End / Mobile Engineer"
    contact = "meziepage@gmail.com  |  +234 807 043 4720  |  Lagos, Nigeria"
    links = "github.com/mezieOX  |  linkedin.com/in/mezie"

    name_size = 14
    title_size = 10
    meta_size = 8.5
    gaps = (12, 11, 10)

    text_span = sum(gaps)
    text_block_h = text_span + name_size
    has_photo = PHOTO.exists()
    row_h = max(PHOTO_SIZE, text_block_h) if has_photo else text_block_h
    row_mid_y = y_top - row_h / 2
    row_bottom = y_top - row_h

    if has_photo:
        photo_x = RIGHT - PHOTO_SIZE
        photo_y = row_mid_y - PHOTO_SIZE / 2
        draw_photo(c, PHOTO, photo_x, photo_y, PHOTO_SIZE)

    text_first_y = row_mid_y + text_span / 2 - (name_size * 0.25)
    ty = text_first_y
    cx = PAGE_W / 2

    c.setFont("Helvetica-Bold", name_size)
    c.setFillColorRGB(0.08, 0.08, 0.08)
    c.drawCentredString(cx, ty, name)
    ty -= gaps[0]
    c.setFont("Helvetica", title_size)
    c.setFillColorRGB(0.2, 0.2, 0.2)
    c.drawCentredString(cx, ty, title)
    ty -= gaps[1]
    c.setFont("Helvetica", meta_size)
    c.drawCentredString(cx, ty, contact)
    ty -= gaps[2]
    c.drawCentredString(cx, ty, links)

    y = row_bottom - 12

    y = section_title(c, "PROFILE", y)
    profile = (
        "Front-end and mobile engineer with 6+ years shipping React, Next.js, "
        "and React Native products - from SME ops tools across Africa to App "
        "Store and Google Play releases. Strong in TypeScript, API integration, "
        "state management, debugging, and production delivery. Roles often ran "
        "concurrently (full-time, contract, and internship) while studying."
    )
    y = draw_wrapped(c, profile, LEFT, y, WIDTH, size=8.3, leading=10.8)
    y -= 10

    y = section_title(c, "WORK EXPERIENCE", y)

    jobs = [
        {
            "role": "Senior Mobile Engineer",
            "dates": "2026 - Present",
            "company": "August Techie / Kindrel",
            "place": "Remote - India - Full-time",
            "bullets": [
                "Leading React Native delivery for Kindrel - family tree, community spaces, chat, events, and shared savings on iOS and Android.",
                "Shipped App Store and Google Play releases using React Native CLI and Expo, with Axios, GraphQL, TanStack Query, and Redux Toolkit.",
                "Improved release quality through React DevTools / Chrome DevTools debugging and tighter design-to-dev handoff.",
            ],
        },
        {
            "role": "Senior Front-End Engineer",
            "dates": "2025 - 2026",
            "company": "BrandDrive",
            "place": "Remote - Nigeria - Full-time",
            "bullets": [
                "Part of the team building BrandDrive's SME operating system across Africa with Next.js - powering invoicing, POS, inventory, and payments workflows.",
                "Consumed REST APIs for product data and workflows, and built form-heavy flows with Formik for reliable user input.",
                "Partnered with product and design on production delivery and debugging across the web experience.",
            ],
        },
        {
            "role": "Junior Front-End / Mobile Engineer",
            "dates": "2023 - 2025",
            "company": "Oneway",
            "place": "Remote - Nigeria - Full-time (concurrent with other roles)",
            "bullets": [
                "Shipped React Native (Expo / CLI) and web UI for Oneway's AI-assisted inventory, POS, and self-checkout retail suite.",
                "Owned storefront, inventory, and payments flows with Axios, TanStack Query, Formik, and React Context.",
                "Supported App Store and Google Play releases and resolved production issues with React DevTools.",
            ],
        },
        {
            "role": "Front-End Engineering Intern",
            "dates": "2022 - 2025",
            "company": "IBX Exchange",
            "place": "Remote - Nigeria - Part-time / contract (concurrent)",
            "bullets": [
                "Part of the team building the IBX website plus web and mobile trading and wallet apps in React and Bootstrap, consuming REST APIs with React Context across the platform.",
                "Improved form UX with Formik and raised front-end reliability through ongoing debugging and performance cleanup.",
            ],
        },
        {
            "role": "Front-End Engineering Intern",
            "dates": "2020 - 2023",
            "company": "Ventlio",
            "place": "Hybrid / Remote - Nigeria - Internship",
            "bullets": [
                "Built early Ventlio web and mobile UI in React, establishing reusable patterns for forms (Formik) and API calls (Axios).",
                "Grew into production ownership - resolving issues, refining UX, and keeping the front-end codebase maintainable.",
            ],
        },
        {
            "role": "Front-End Engineering Intern",
            "dates": "2023 - 2023",
            "company": "Osmaxin Developers",
            "place": "Remote - Nigeria - Internship",
            "bullets": [
                "Delivered the Oltem Logistics site and client-facing logistics UI in Next.js for work orders and tracking.",
                "Consumed REST APIs for logistics workflows and built Formik forms, then polished production-ready Next.js UI with the Osmaxin team.",
            ],
        },
    ]

    for job in jobs:
        y = job_header(c, job["role"], job["dates"], job["company"], job["place"], y)
        y = bullets(c, job["bullets"], y)

    y = section_title(c, "SKILLS", y)
    skill_lines = [
        ("Languages: ", "JavaScript (ES6+), TypeScript, HTML5, CSS3"),
        (
            "Frameworks: ",
            "React.js, Next.js, React Native (CLI & Expo), React Navigation, Electron, Vite",
        ),
        (
            "State & Data: ",
            "Redux Toolkit, React Context, TanStack Query, Axios, Formik, Yup, REST, GraphQL, Firebase, Supabase",
        ),
        (
            "UI & Tooling: ",
            "Tailwind CSS, Bootstrap, Chakra UI, Git, GitHub Actions, CI/CD",
        ),
        (
            "Shipping & Debug: ",
            "App Store, Google Play, Debugging, React DevTools, Chrome DevTools",
        ),
    ]
    for label, body in skill_lines:
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
        "B.Sc. Computer Science - Nnamdi Azikiwe University, Awka (2021 - 2025, studied while working)",
        "Osmaxin Developers - Web & mobile internship / training (2021 - 2023)",
        "HTML5 / CSS3 / JavaScript - ApTech Computer Education (2020 - 2022)",
        "Udemy - React, Next.js, and Vite | freeCodeCamp - Hands-on projects",
        "Clever Programmer - React | CodeWithMosh - React Native",
    ]
    for item in education:
        y = draw_wrapped(c, item, LEFT, y, WIDTH, size=8.2, leading=10.5)
        y -= 2
    y -= 6

    y = section_title(c, "LANGUAGES", y)
    c.setFont("Helvetica", 8.5)
    c.setFillColorRGB(0.2, 0.2, 0.2)
    c.drawString(LEFT, y, "English, Igbo")

    c.save()
    print(f"Wrote {OUT} (content ends near y={y:.1f})")


if __name__ == "__main__":
    main()
