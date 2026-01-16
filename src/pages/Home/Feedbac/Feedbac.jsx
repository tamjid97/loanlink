// src/components/Feedback/Feedbac.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import RvCard from "./RvCard";
import { feedbackData } from "./data";

const Feedbac = () => {
  return (
    <div className=" py-20 px-6 flex flex-col items-center">
      {/* Section Heading */}
      <h1 className="text-xl sm:text-5xl font-bold  mb-16 text-center leading-tight">
        What Our Clients Say
      </h1>

      {/* Swiper Carousel */}
      <Swiper
        loop
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-full max-w-6xl"
      >
        {feedbackData.map((fb) => (
          <SwiperSlide key={fb.id} className="flex justify-center">
            <RvCard fidbac={fb} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Footer Text */}
      <p className="mt-12 text-yellow-500 text-center max-w-2xl text-sm sm:text-base">
      Our customers share their experiences and insights with our services here.
      </p>
    </div>
  );
};

export default Feedbac;
