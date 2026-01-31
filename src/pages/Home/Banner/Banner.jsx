// src/components/Banner/Banner.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import imgb2 from "../../../assets/coins-8505363_1280.jpg";
import imgb3 from "../../../assets/money-2696229_1280.jpg";
import imgb4 from "../../../assets/Personal-Loan-1080x675.jpg";
import imgb5 from "../../../assets/The-Pros-and-Cons-of-a-Bank-Loan-Desktop.png";
import { Link } from "react-router";

const slides = [
  {
    img: imgb5,
    title: "Smart Banking Loan Solutions",
    desc: "Empowering individuals and businesses with reliable, transparent, and flexible loan services.",
    btn: "Apply for Loan",
  },
  {
    img: imgb2,
    title: "Secure Your Financial Growth",
    desc: "Low interest rates, fast approval, and tailored repayment plans designed for you.",
    btn: "Get Started",
  },
  {
    img: imgb3,
    title: "Trusted Financial Partner",
    desc: "Building trust through modern banking solutions and customer-first services.",
    btn: "Learn More",
  },
  {
    img: imgb4,
    title: "Personal & Business Loans",
    desc: "Simple process, minimal paperwork, and dependable financial support.",
    btn: "Check Eligibility",
  },
];

const Banner = () => {
  return (
    <section className="w-full bg-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Carousel
          autoPlay
          infiniteLoop
          interval={4500}
          transitionTime={800}
          showThumbs={false}
          showStatus={false}
          showIndicators
          stopOnHover={false}
          swipeable
          emulateTouch
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="
                relative w-full
                h-[260px] sm:h-[360px] md:h-[460px] lg:h-[540px] xl:h-[600px]
                overflow-hidden rounded-2xl
              "
            >
              {/* Background Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>

              {/* Centered Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                <div className="max-w-2xl">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200">
                    {slide.desc}
                  </p>

                  <div className="mt-8 flex justify-center">
                    <Link
                      to="apply-loan"
                      className="
                        px-8 py-3
                        rounded-full
                        text-sm sm:text-base
                        font-semibold
                        text-white
                        bg-gradient-to-r from-yellow-400 to-yellow-500
                        shadow-lg shadow-yellow-500/30
                        hover:from-yellow-500 hover:to-yellow-600
                        hover:shadow-yellow-500/50
                        transition-all duration-300
                      "
                    >
                      {slide.btn}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;
