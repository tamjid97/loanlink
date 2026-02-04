import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Application Submission",
    desc: "Customers submit a secure digital application by providing verified personal and financial information.",
  },
  {
    id: "02",
    title: "Internal Review & Validation",
    desc: "Our automated systems and compliance team validate eligibility, creditworthiness, and documentation.",
  },
  {
    id: "03",
    title: "Approval & Offer Generation",
    desc: "Approved applicants receive a formal loan offer with clear terms, rates, and repayment schedules.",
  },
  {
    id: "04",
    title: "Disbursement & Monitoring",
    desc: "Funds are disbursed directly to the customer’s account with ongoing support and account monitoring.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const HowItWorks = () => {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-sm font-semibold tracking-widest text-yellow-500 uppercase">
            Process Overview
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            How Our Loan Operations Work
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Our operational framework is designed to ensure security, transparency,
            and efficiency at every stage of the loan lifecycle.
          </p>
        </motion.div>

        {/* Process Grid */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.15)" }}
              className="
                relative
                rounded-xl
                border
                border-gray-200
                p-10
                bg-white
                transition
              "
            >
              {/* Step Number */}
              <div className="absolute -top-5 left-8 bg-white px-3 text-lg font-bold text-yellow-500">
                {step.id}
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Divider */}
              <div className="mt-4 h-px w-12 bg-yellow-400"></div>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
