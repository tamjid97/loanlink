import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SeceletRole = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["home-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan/home");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  // সর্বোচ্চ 6টি loan দেখাবো
  const displayedLoans = loans.slice(0, 6);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Available Loans
      </h2>

      {/* ----------- Loan Cards Grid ----------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedLoans.map((loan) => (
          <div
            key={loan._id}
            className="flex flex-col bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Loan Image */}
            <div className="h-56 w-full overflow-hidden rounded-t-2xl">
              <img
                src={loan.loanImage || "https://i.ibb.co/6bQ7J7F/loan.jpg"}
                alt={loan.loanTitle}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                {loan.loanTitle}
              </h3>

              <p className="text-gray-500 mb-2 line-clamp-2">{loan.description}</p>

              <div className="flex justify-between text-sm mb-4">
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
                className="btn btn-primary mt-auto w-full rounded-xl hover:scale-105 transition-transform duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      {loans.length > 6 && (
        <div className="flex justify-center mt-10">
          <Link
            to="/all-loans"
            className="btn btn-outline btn-primary px-10 rounded-xl"
          >
            See All
          </Link>
        </div>
      )}
    </section>
  );
};

export default SeceletRole;
