import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApplicationLon = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);

  // 🔥 Admin: সব loan application আনবে
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["allLoanApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan-applications");
      return res.data;
    },
  });

  // ✅ Safe filter (All = সব data)
  const filteredApplications = applications.filter((app) => {
    if (statusFilter === "All") return true;
    return app.status === statusFilter;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Loan Applications ({filteredApplications.length})
        </h1>

        {/* Filter */}
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Loan ID</th>
              <th>User</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id}>
                <td className="font-mono text-xs">
                  {app.loanId?.slice(-6)}
                </td>

                <td>
                  <p className="font-semibold">{app.userName}</p>
                  <p className="text-sm text-gray-500">{app.userEmail}</p>
                </td>

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

      {/* View Modal */}
      {selectedApp && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-4">
              Loan Application Details
            </h3>

            <div className="space-y-2 text-sm">
              <p><b>User:</b> {selectedApp.userName}</p>
              <p><b>Email:</b> {selectedApp.userEmail}</p>
              <p><b>Loan Title:</b> {selectedApp.loanTitle}</p>
              <p><b>Category:</b> {selectedApp.loanCategory}</p>
              <p><b>Amount:</b> ৳ {selectedApp.loanAmount}</p>
              <p><b>Interest:</b> {selectedApp.interestRate}%</p>
              <p><b>Status:</b> {selectedApp.status}</p>
              <p><b>Applied At:</b> {selectedApp.createdAt}</p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedApp(null)}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ApplicationLon;
