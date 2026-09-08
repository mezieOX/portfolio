import Image from "next/image";
import { Reveal } from "./Reveal";

export function Newsletter() {
  return (
    <section className="subscription section">
      <div className="container">
        <Image
          src="/assets/map.jpg"
          alt=""
          width={1600}
          height={900}
          className="map map-image"
          sizes="100vw"
        />
        <Reveal className="sub-box" delayMs={80}>
          <div className="sub-info">
            <h3 className="sub-heading">Newsletter</h3>
            <h1 className="heading">News about my projects</h1>
            <p className="text">
              Occasional notes on design, development, and launches—no spam,
              just useful updates.
            </p>
          </div>
          <form action="#">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="form-input"
              required
            />
            <input type="submit" value="Subscribe" className="btn" />
          </form>
        </Reveal>
      </div>
    </section>
  );
}
