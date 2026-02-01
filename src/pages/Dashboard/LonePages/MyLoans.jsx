import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyLoanApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Fetch user's loan applications
  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["myLoanApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan-applications?email=${user.email.toLowerCase()}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Application?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/loan-application/cancel/${id}`);
        Swal.fire("Cancelled", "Loan application cancelled", "success");
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to cancel application", "error");
      }
    }
  };

  if (isLoading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Loans ({applications.length})</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">No loan applications found.</p>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Loan ID</th>
                <th>Loan Info</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td className="font-mono text-xs">{app._id.slice(-6)}</td>
                  <td>
                    <p className="font-semibold">{app.loanTitle}</p>
                    <p className="text-sm text-gray-500">Interest: {app.interestRate}%</p>
                  </td>
                  <td className="font-semibold">৳ {app.loanAmount}</td>
                  <td>
                    <span className={`badge ${
                      app.status === "Pending" ? "badge-warning" :
                      app.status === "Approved" ? "badge-success" :
                      "badge-error"
                    }`}>{app.status}</span>
                  </td>
                  <td className="flex flex-col sm:flex-row gap-2">
                    <button onClick={() => setSelectedLoan(app)} className="btn btn-xs btn-info flex-1">View</button>
                    {app.status === "Pending" && <button onClick={() => handleCancel(app._id)} className="btn btn-xs btn-error flex-1">Cancel</button>}
                    {app.applicationFeeStatus === "Unpaid" ? <button className="btn btn-xs btn-primary flex-1">Pay</button> : <span className="badge badge-success flex-1 text-center">Paid</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-lg relative shadow-lg">
            <button onClick={() => setSelectedLoan(null)} className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost">✕</button>
            <h2 className="text-2xl font-bold mb-4">{selectedLoan.loanTitle}</h2>
            <p><strong>Loan ID:</strong> {selectedLoan._id}</p>
            <p><strong>Amount:</strong> ৳ {selectedLoan.loanAmount}</p>
            <p><strong>Interest Rate:</strong> {selectedLoan.interestRate}%</p>
            <p><strong>Status:</strong> <span className={`badge ${
              selectedLoan.status === "Pending" ? "badge-warning" :
              selectedLoan.status === "Approved" ? "badge-success" : "badge-error"
            }`}>{selectedLoan.status}</span></p>
            <p><strong>Available EMI Plans:</strong> {Array.isArray(selectedLoan.emiPlans) ? selectedLoan.emiPlans.join(", ") : selectedLoan.emiPlans || "N/A"}</p>
            {selectedLoan.description && <p className="mt-2"><strong>Description:</strong> {selectedLoan.description}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLoanApplications;
