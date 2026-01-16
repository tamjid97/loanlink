import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../Banner/Works/HowItWorks';
import Feedbac from '../Feedbac/Feedbac';
import Pic from '../Slider/Pic';
import Massage from '../Slider/Call/Massage';

const Home = () => {
  return (
   <div className="bg-blue-50 min-h-screen">
      <Banner/>
      <HowItWorks/>
      <Feedbac/>
      <Pic/>
      <Massage/>
    </div>
  );
};

export default Home;