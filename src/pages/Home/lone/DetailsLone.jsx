// DetailsLone.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DetailsLone = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoan = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/loan/${id}`);
        const data = {
          ...res.data,
          emiPlans: Array.isArray(res.data.emiPlans)
            ? res.data.emiPlans
            : res.data.emiPlans?.split(",") || [],
        };
        setLoan(data);
      } catch (err) {
        console.error("Error fetching loan:", err);
        setLoan(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
        <span className="loading loading-spinner loading-lg text-sky-400"></span>
        <p className="mt-4 text-gray-300 text-sm tracking-wide">
          Loading loan details...
        </p>
      </div>
    );
  }

  if (!loan) {
    return (
      <p className="text-center text-red-500 mt-10 text-lg">
        Loan details not found
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Loan Image */}
        <div className="w-full h-64 overflow-hidden rounded-t-3xl">
          <img
            src={loan.loanImage || "https://i.ibb.co/6bQ7J7F/loan.jpg"}
            alt={loan.loanTitle}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) =>
              (e.target.src = "https://i.ibb.co/6bQ7J7F/loan.jpg")
            }
          />
        </div>

        {/* Loan Info */}
        <div className="p-8 flex flex-col gap-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">
            {loan.loanTitle}
          </h1>

          <p className="text-gray-600 text-center text-lg">
            {loan.description || "No description available."}
          </p>

          {/* Info Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-sm">
              <tbody>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="font-semibold px-4 py-3 bg-gray-100 text-gray-700">
                    Category
                  </td>
                  <td className="px-4 py-3 text-gray-800">{loan.category}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="font-semibold px-4 py-3 bg-gray-100 text-gray-700">
                    Interest Rate
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {loan.interestRate}%
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="font-semibold px-4 py-3 bg-gray-100 text-gray-700">
                    Max Limit
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    ${loan.maxLoanLimit}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="font-semibold px-4 py-3 bg-gray-100 text-gray-700">
                    Available EMI Plans
                  </td>
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    {loan.emiPlans.length > 0 ? (
                      loan.emiPlans.map((plan, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow-sm"
                        >
                          {plan}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Apply Button - always show */}
          <div className="mt-6">
            <Link
              to={`/apply-loan/${loan._id}`}
              className="btn btn-gradient w-full rounded-xl hover:scale-105 transition-transform duration-300 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsLone;