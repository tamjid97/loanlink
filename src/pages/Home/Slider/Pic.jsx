// src/components/Pic.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import img1 from "../../../assets/b1.jpg";
import img2 from "../../../assets/b2.webp";
import img3 from "../../../assets/b3.jpg";
import img4 from "../../../assets/b4.jpg";


const images = [img1, img2, img3, img4, ];

const Pic = () => {
  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 leading-snug">
        Our Services in Action
      </h2>

      {/* Top Row - Right to Left */}
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        speed={4000} // scroll speed
        autoplay={{
          delay: 0, // continuous scroll
          disableOnInteraction: false,
          reverseDirection: true, // scroll right to left
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay]}
        className="mb-10"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={img}
                alt={`slide-${idx}`}
                className="w-full h-48 sm:h-60 md:h-72 object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Row - Left to Right */}
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        speed={4000} // scroll speed
        autoplay={{
          delay: 0, // continuous scroll
          disableOnInteraction: false,
          reverseDirection: false, // scroll left to right
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay]}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={img}
                alt={`slide-${idx}`}
                className="w-full h-48 sm:h-60 md:h-72 object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="mt-12 text-center text-yellow-500 max-w-2xl mx-auto">
        We pride ourselves on delivering trusted banking solutions and personalized services to our clients.
      </p>
    </section>
  );
};

export default Pic;
