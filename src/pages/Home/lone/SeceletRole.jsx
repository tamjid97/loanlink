import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const SeceletRole = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], isLoading, error } = useQuery({
    queryKey: ["home-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan/home"); // backend route
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load loans. Please try again.
      </p>
    );
  }

  const displayedLoans = loans.slice(0, 6);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-12"
      >
        Available Loans
      </motion.h2>

      {/* Loan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedLoans.map((loan, index) => (
          <motion.div
            key={loan._id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
            className="flex flex-col bg-base-100 rounded-2xl shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="h-56 w-full overflow-hidden rounded-t-2xl">
              <img
                src={loan.loanImage || "https://i.ibb.co/6bQ7J7F/loan.jpg"}
                alt={loan.loanTitle}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) =>
                  (e.target.src = "https://i.ibb.co/6bQ7J7F/loan.jpg")
                }
              />
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{loan.loanTitle}</h3>
              <p className="text-gray-500 mb-4">{loan.category}</p>

              <div className="flex justify-between text-sm mb-6">
                <span>
                  💹 <strong>{loan.interestRate}%</strong> Interest
                </span>
                <span>
                  💰 <strong>${loan.maxLoanLimit}</strong>
                </span>
              </div>

              {/* View Details Button */}
              <Link
                to={`/Lone-Details/${loan._id}`}
                className="mt-auto btn btn-primary w-full rounded-xl hover:scale-105 transition-transform duration-300"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See All Button */}
      {loans.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Link
            to="/all-loans"
            className="btn btn-outline btn-primary px-10 rounded-xl hover:scale-105 transition-transform duration-300"
          >
            See All
          </Link>
        </motion.div>
      )}
    </section>
  );
};

export default SeceletRole;
