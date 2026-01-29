import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const AddLoan = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  // ফর্ম সাবমিট হ্যান্ডলার
  const submitLoan = async (data) => {
    setLoading(true);
    try {
      let loanImageURL = "";

      // Image upload
      if (data.loanImage && data.loanImage[0]) {
        const formData = new FormData();
        formData.append("image", data.loanImage[0]);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
          formData
        );

        loanImageURL = imgRes.data.data.url;
      }

      const finalData = {
        ...data,
        loanImage: loanImageURL,
        date: new Date().toLocaleDateString(),
      };

      // Confirm SweetAlert
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to add this loan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        // POST to backend
        const res = await axios.post("http://localhost:3000/loan", finalData);
        console.log("Saved in DB 👉", res.data);

        await Swal.fire({
          title: "Success!",
          text: "Loan added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        reset();
      }

    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to add loan",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-primary">Add New Loan</h2>
          <p className="text-gray-500 mt-2">Fill out the form to create a new loan product</p>
        </div>

        <form onSubmit={handleSubmit(submitLoan)} className="space-y-6">
          {/* Grid Section */}
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

            <div>
              <label className="label font-semibold">Interest Rate (%)</label>
              <input
                type="number"
                step="0.01"
                {...register("interestRate", { required: true })}
                placeholder="e.g. 12.5"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Max Loan Limit</label>
              <input
                type="number"
                {...register("maxLoanLimit", { required: true })}
                placeholder="e.g. 500000"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="label font-semibold">Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Write a brief loan description"
              className="textarea textarea-bordered w-full min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label font-semibold">Required Documents</label>
              <input
                type="text"
                {...register("requiredDocuments", { required: true })}
                placeholder="NID, Bank Statement, Salary Slip"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">EMI Plans</label>
              <input
                type="text"
                {...register("emiPlans", { required: true })}
                placeholder="6, 12, 24 months"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label font-semibold">Loan Image</label>
              <input
                type="file"
                {...register("loanImage")}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div>
              <label className="label font-semibold">Date</label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <input
              type="checkbox"
              {...register("showOnHome")}
              className="toggle toggle-success"
            />
            <span className="font-medium">Show this loan on Home page</span>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="btn btn-primary w-full text-lg"
              disabled={loading}
            >
              {loading ? "Adding Loan..." : "Add Loan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoan;
