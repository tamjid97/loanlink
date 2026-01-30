import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApplicationLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);

  // 🔥 Fetch all loan applications (Admin)
  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["allLoanApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan-applications");
      return res.data;
    },
  });

  // ✅ Filter applications based on status
  const filteredApplications = applications.filter((app) => {
    if (statusFilter === "All") return true;
    return app.status === statusFilter;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">
          Loan Applications ({filteredApplications.length})
        </h1>

        <select
          className="select select-bordered w-48"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Loan ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id}>
                <td className="font-mono text-xs">{app._id.slice(-6)}</td>
                <td>{app.userName || `${app.firstName} ${app.lastName}`}</td>
                <td>{app.userEmail}</td>
                <td>{app.loanCategory}</td>
                <td className="font-semibold">৳ {app.loanAmount}</td>
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
                    {app.status || "Pending"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="btn btn-xs btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for View */}
      {selectedApp && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-4">Loan Application Details</h3>

            <div className="space-y-2 text-sm">
              <p>
                <b>User:</b> {selectedApp.firstName} {selectedApp.lastName}
              </p>
              <p>
                <b>Email:</b> {selectedApp.userEmail}
              </p>
              <p>
                <b>Loan Title:</b> {selectedApp.loanTitle}
              </p>
              <p>
                <b>Category:</b> {selectedApp.loanCategory}
              </p>
              <p>
                <b>Amount:</b> ৳ {selectedApp.loanAmount}
              </p>
              <p>
                <b>Interest Rate:</b> {selectedApp.interestRate}%
              </p>
              <p>
                <b>Status:</b> {selectedApp.status}
              </p>
              <p>
                <b>Applied At:</b>{" "}
                {new Date(selectedApp.date).toLocaleString()}
              </p>
              {selectedApp.documents && (
                <p>
                  <b>Documents:</b> {selectedApp.documents}
                </p>
              )}
            </div>

            <div className="modal-action">
              <button onClick={() => setSelectedApp(null)} className="btn">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ApplicationLoans;
