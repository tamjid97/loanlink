import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const AllLoan = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all loans
  const { data: loans = [], isLoading, refetch } = useQuery({
    queryKey: ["dashboard-all-loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan");
      return res.data;
    },
  });

  // ---------------- Update Modal State ----------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  const openUpdateModal = (loan) => {
    setSelectedLoan(loan);

    setValue("loanTitle", loan.loanTitle);
    setValue("category", loan.category);
    setValue("interestRate", loan.interestRate);
    setValue("maxLoanLimit", loan.maxLoanLimit);
    setValue("description", loan.description);

    // ✅ emiPlans যদি array হয়, join করো, না হলে string ধরো
    const emiPlansValue = Array.isArray(loan.emiPlans)
      ? loan.emiPlans.join(", ")
      : loan.emiPlans || "";
    setValue("emiPlans", emiPlansValue);

    setValue("requiredDocuments", loan.requiredDocuments || "");
    setValue("showOnHome", !!loan.showOnHome);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
    reset();
  };

  // ---------------- Submit Update ----------------
  const submitUpdate = async (data) => {
    try {
      let loanImageURL = selectedLoan.loanImage;

      // যদি নতুন image আপলোড হয়
      if (data.loanImage && data.loanImage[0]) {
        const formData = new FormData();
        formData.append("image", data.loanImage[0]);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
          formData
        );
        loanImageURL = imgRes.data.data.url;
      }

      const updatedData = {
        ...data,
        loanImage: loanImageURL,
        emiPlans: data.emiPlans.split(",").map((p) => p.trim()),
      };

      await axiosSecure.put(`/loan/${selectedLoan._id}`, updatedData);
      Swal.fire("Updated!", "Loan updated successfully", "success");
      closeModal();
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update loan", "error");
    }
  };

  // ---------------- Show on Home toggle ----------------
  const handleShowOnHome = async (loan) => {
    if (!loan?._id) return;
    try {
      await axiosSecure.patch(`/loan/show-home/${loan._id}`, {
        showOnHome: !loan.showOnHome,
      });
      Swal.fire("Updated!", "Loan show-on-home status updated.", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update loan.", "error");
    }
  };

  // ---------------- Delete Loan ----------------
  const handleDelete = async (loanId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This loan will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/loan/${loanId}`);
        refetch();
        Swal.fire("Deleted!", "Loan has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete loan.", "error");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        All Loans <span className="text-primary">({loans.length})</span>
      </h2>

      {/* --------- Loans Table --------- */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={loan.loanImage}
                    alt={loan.loanTitle}
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) =>
                      (e.target.src = "https://i.ibb.co/6bQ7J7F/loan.jpg")
                    }
                  />
                </td>
                <td>{loan.loanTitle}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.category}</td>
                <td>{loan.createdBy?.name || "Admin"}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={!!loan.showOnHome}
                    onChange={() => handleShowOnHome(loan)}
                  />
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => openUpdateModal(loan)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(loan._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --------- Update Modal --------- */}
      {isModalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-base-100 rounded-2xl p-6 w-full max-w-4xl relative shadow-lg">
            <button
              className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold text-primary mb-4 text-center">
              Update Loan
            </h2>

            <form onSubmit={handleSubmit(submitUpdate)} className="space-y-6">
              {/* Loan Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label font-semibold">Loan Title</label>
                  <input
                    type="text"
                    {...register("loanTitle", { required: true })}
                    placeholder="Enter loan title"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label font-semibold">Category</label>
                  <select
                    {...register("category", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select category</option>
                    <option value="Personal">Personal Loan</option>
                    <option value="Business">Business Loan</option>
                    <option value="Education">Education Loan</option>
                    <option value="Home">Home Loan</option>
                  </select>
                </div>
              </div>

              {/* Interest & Max Loan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label font-semibold">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("interestRate", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label font-semibold">Max Loan Limit</label>
                  <input
                    type="number"
                    {...register("maxLoanLimit", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="label font-semibold">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered w-full min-h-[120px]"
                />
              </div>

              {/* EMI & Required Docs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label font-semibold">EMI Plans</label>
                  <input
                    type="text"
                    {...register("emiPlans", { required: true })}
                    className="input input-bordered w-full"
                    placeholder="e.g. 3 months, 6 months, 12 months"
                  />
                </div>
                <div>
                  <label className="label font-semibold">Required Documents</label>
                  <input
                    type="text"
                    {...register("requiredDocuments", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Loan Image & Show on Home */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label font-semibold">Loan Image</label>
                  <input
                    type="file"
                    {...register("loanImage")}
                    className="file-input file-input-bordered w-full"
                  />
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <input
                    type="checkbox"
                    {...register("showOnHome")}
                    className="toggle toggle-success"
                  />
                  <span className="font-medium">Show this loan on Home page</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Update Loan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLoan;
