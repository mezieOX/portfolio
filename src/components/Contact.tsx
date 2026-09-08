import { FaArrowRight } from "react-icons/fa";
import { EMAIL, PHONE, PHONE_DISPLAY } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container">
        <Reveal className="contact-info">
          <h3 className="sub-heading">Contact me</h3>
          <h1 className="heading">Let’s work together</h1>
          <p className="text">
            Based in Lagos, Nigeria. Reach me by email or phone—happy to discuss
            web and mobile projects.
          </p>
          <a href={`mailto:${EMAIL}`} className="mail">
            {EMAIL} <FaArrowRight aria-hidden />
          </a>
          <a href={`tel:${PHONE}`} className="mail phone-link">
            {PHONE_DISPLAY} <FaArrowRight aria-hidden />
          </a>
        </Reveal>
        <Reveal delayMs={80}>
          <form
            action="https://formspree.io/f/meqnnplk"
            method="POST"
            className="contact-form"
          >
            <h3>Send a message</h3>
            <input
              type="text"
              name="Name"
              className="form-input"
              placeholder="Your name"
              required
            />
            <input
              type="email"
              name="Email"
              className="form-input"
              placeholder="Your email"
              required
            />
            <textarea
              placeholder="Project details"
              name="message"
              className="form-input"
              required
              minLength={50}
              maxLength={900}
            />
            <input type="submit" value="Send message" className="btn" />
          </form>
        </Reveal>
      </div>
    </section>
  );
}
