import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyLoanApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["myLoanApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const email = user.email.toLowerCase();
      const res = await axiosSecure.get(`/loan-application?email=${email}`);
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
      await axiosSecure.patch(`/loan-application/cancel/${id}`);
      Swal.fire("Cancelled", "Loan application cancelled", "success");
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Loans ({applications.length})
      </h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">No loan applications found.</p>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th>Loan ID</th>
                <th>Loan Info</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td className="font-mono text-xs">
                    {app.loanId?.slice(-6)}
                  </td>

                  <td>
                    <p className="font-semibold">{app.loanTitle}</p>
                    <p className="text-sm text-gray-500">
                      Interest: {app.interestRate}%
                    </p>
                  </td>

                  <td className="font-semibold">
                    ৳ {app.loanAmount}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        app.status === "Pending"
                          ? "badge-warning"
                          : app.status === "Approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="space-x-2">
                    {/* View */}
                    <Link
                      to={`/dashboard/loan/${app._id}`}
                      className="btn btn-xs btn-info"
                    >
                      View
                    </Link>

                    {/* Cancel */}
                    {app.status === "Pending" && (
                      <button
                        onClick={() => handleCancel(app._id)}
                        className="btn btn-xs btn-error"
                      >
                        Cancel
                      </button>
                    )}

                    {/* Pay / Paid */}
                    {app.applicationFeeStatus === "Unpaid" ? (
                      <button className="btn btn-xs btn-primary">
                        Pay
                      </button>
                    ) : (
                      <span className="badge badge-success">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyLoanApplications;
