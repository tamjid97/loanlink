import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../Banner/Works/HowItWorks";
import Feedbac from "../Feedbac/Feedbac";
import Pic from "../Slider/Pic";
import Massage from "../Slider/Call/Massage";
import SeceletRole from "../lone/SeceletRole";

const Home = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      <Banner />
      <SeceletRole />
      <HowItWorks />
      <Feedbac />
      <Pic />
      <Massage />
    </div>
  );
};

export default Home;
