import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: loans = [], isLoading, refetch } = useQuery({
    queryKey: ["my-created-loans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan?email=${user.email}`);
      return res.data;
    },
  });

  const handleShowOnHome = async (id, status) => {
    await axiosSecure.patch(`/loan/show-home/${id}`, { showOnHome: !status });
    refetch();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This loan will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/loan/${id}`);
      refetch();
      Swal.fire("Deleted!", "Loan has been deleted.", "success");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        My Created Loans <span className="text-primary">({loans.length})</span>
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((loan, index) => (
                <tr key={loan._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={loan.loanImage}
                      alt={loan.loanTitle}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>
                  <td className="font-semibold">{loan.loanTitle}</td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.category}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={loan.showOnHome}
                      onChange={() =>
                        handleShowOnHome(loan._id, loan.showOnHome)
                      }
                    />
                  </td>
                  <td className="flex gap-2">
                    <Link
                      to={`/dashboard/update-loan/${loan._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  You haven’t created any loans yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLoans;
