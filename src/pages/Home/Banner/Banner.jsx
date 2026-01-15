import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


import imgb2 from "../../../assets/coins-8505363_1280.jpg";
import imgb3 from "../../../assets/money-2696229_1280.jpg";
import imgb4 from "../../../assets/Personal-Loan-1080x675.jpg";
import imgb5 from "../../../assets/The-Pros-and-Cons-of-a-Bank-Loan-Desktop.png";

const images = [imgb5,imgb2,imgb3, imgb4, ];

const Banner = () => {
  return (
    <section className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        transitionTime={700}
        showThumbs={false}
        showStatus={false}
        showIndicators
        stopOnHover={false}
        swipeable
        emulateTouch
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="
              relative w-full
              h-[220px]
              sm:h-[320px]
              md:h-[420px]
              lg:h-[520px]
              xl:h-[600px]
              overflow-hidden
            "
          >
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
