"use client";

import Image from "next/image";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { TESTIMONIALS } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        <Reveal>
          <Swiper
            modules={[Pagination, Autoplay]}
            loop
            speed={600}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="swiper"
          >
            {TESTIMONIALS.map((item) => (
              <SwiperSlide key={item.name}>
                <div className="client">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="client-avatar"
                    sizes="64px"
                  />
                  <div className="client-info">
                    <h4>{item.name}</h4>
                    <h5>
                      {item.role} <a href="#">{item.company}</a>
                    </h5>
                  </div>
                </div>
                <q className="text">{item.quote}</q>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
        <Reveal className="testimonials-title" delayMs={80}>
          <h3 className="sub-heading">Testimonials</h3>
          <h1 className="heading">Hear from happy clients</h1>
        </Reveal>
      </div>
    </section>
  );
}
