import React from "react";
import { motion } from "framer-motion";

import Banner from "../Banner/Banner";
import HowItWorks from "../Banner/Works/HowItWorks";
import Feedbac from "../Feedbac/Feedbac";
import Pic from "../Slider/Pic";
import Massage from "../Slider/Call/Massage";
import SeceletRole from "../lone/SeceletRole";

// Common animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Banner can have a slightly bigger entrance */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      >
        <Banner />
      </motion.div>

      {/* SeceletRole */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SeceletRole />
      </motion.div>

      {/* How It Works */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <HowItWorks />
      </motion.div>

      {/* Feedback */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Feedbac />
      </motion.div>

      {/* Slider Pics */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Pic />
      </motion.div>

      {/* Massage Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Massage />
      </motion.div>
    </div>
  );
};

export default Home;
