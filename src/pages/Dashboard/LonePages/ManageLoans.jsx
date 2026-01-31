import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios"; // ⚡ Import axios for image upload

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: loans = [], isLoading, refetch } = useQuery({
    queryKey: ["my-created-loans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan?email=${user.email}`);
      return res.data;
    },
  });

  // ---------------- Modal State ----------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();

  const openUpdateModal = (loan) => {
    setSelectedLoan(loan);
    setValue("loanTitle", loan.loanTitle);
    setValue("category", loan.category);
    setValue("interestRate", loan.interestRate);
    setValue("maxLoanLimit", loan.maxLoanLimit);
    setValue("description", loan.description);
    setValue("emiPlans", loan.emiPlans);
    setValue("requiredDocuments", loan.requiredDocuments);
    setValue("showOnHome", loan.showOnHome);
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
  const handleShowOnHome = async (id, status) => {
    await axiosSecure.patch(`/loan/show-home/${id}`, { showOnHome: !status });
    refetch();
  };

  // ---------------- Delete Loan ----------------
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  // ---------------- Search Filter ----------------
  const filteredLoans = loans.filter(
    (loan) =>
      loan.loanTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Created Loans <span className="text-primary">({loans.length})</span>
      </h2>

      {/* --------- Search Bar --------- */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by title or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-80"
        />
      </div>

      {/* --------- Loans Table --------- */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra w-full">
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
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan, index) => (
                <tr key={loan._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={loan.loanImage || "https://i.ibb.co/6bQ7J7F/loan.jpg"}
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
                  <td className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="btn btn-sm btn-info flex-1 hover:scale-105 transition-transform duration-200"
                      onClick={() => openUpdateModal(loan)}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="btn btn-sm btn-error flex-1 hover:scale-105 transition-transform duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No loans found.
                </td>
              </tr>
            )}
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

              {/* EMI & Required Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label font-semibold">EMI Plans</label>
                  <input
                    type="text"
                    {...register("emiPlans", { required: true })}
                    className="input input-bordered w-full"
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

export default ManageLoans;
