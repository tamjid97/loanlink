import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all loan applications (then filter pending)
  const { data: loans = [], isLoading, refetch } = useQuery({
    queryKey: ["pending-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan-applications");
      return res.data.filter((loan) => loan.status === "Pending");
    },
  });

  const handleApprove = async (loanId) => {
    try {
      await axiosSecure.patch(`/loan-application/${loanId}/approve`);
      Swal.fire("Approved!", "Loan has been approved.", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to approve loan.", "error");
    }
  };

  const handleReject = async (loanId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This loan application will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, reject it",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/loan-application/${loanId}/reject`);
        Swal.fire("Rejected!", "Loan has been rejected.", "success");
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to reject loan.", "error");
      }
    }
  };

  const openModal = (loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLoan(null);
    setIsModalOpen(false);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Pending Loan Applications
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Loan ID</th>
              <th>Borrower Info</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((loan, index) => (
                <tr key={loan._id}>
                  <td>{index + 1}</td>
                  <td>{loan._id}</td>
                  <td>
                    <p className="font-semibold">{loan.firstName} {loan.lastName}</p>
                    <p className="text-sm text-gray-500">{loan.userEmail}</p>
                  </td>
                  <td>{loan.loanAmount}</td>
                  <td>{loan.date}</td>
                  <td className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleApprove(loan._id)}
                      className="btn btn-sm btn-success flex-1 hover:scale-105 transition-transform duration-200"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(loan._id)}
                      className="btn btn-sm btn-error flex-1 hover:scale-105 transition-transform duration-200"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => openModal(loan)}
                      className="btn btn-sm btn-info flex-1 hover:scale-105 transition-transform duration-200"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No pending loans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-base-100 rounded-2xl p-6 w-full max-w-2xl relative shadow-lg">
            <button
              className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">
              Loan Details
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Loan ID:</span> {selectedLoan._id}
              </p>
              <p>
                <span className="font-semibold">Borrower:</span> {selectedLoan.firstName} {selectedLoan.lastName} ({selectedLoan.userEmail})
              </p>
              <p>
                <span className="font-semibold">Amount:</span> {selectedLoan.loanAmount}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {selectedLoan.date}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {selectedLoan.status}
              </p>
              <p>
                <span className="font-semibold">Reason:</span> {selectedLoan.loanReason || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Extra Notes:</span> {selectedLoan.extraNotes || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingLoans;
