import React from "react";
import { useForm } from "react-hook-form";

const AddLoan = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddLoan = (data) => {
    console.log("Form Data 👉", data);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-primary">Add New Loan</h2>
          <p className="text-gray-500 mt-2">
            Fill out the form to create a new loan product
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleAddLoan)}
          className="space-y-6"
        >
          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loan Title */}
            <div>
              <label className="label font-semibold">Loan Title</label>
              <input
                type="text"
                {...register("loanTitle", { required: true })}
                placeholder="Enter loan title"
                className="input input-bordered w-full"
              />
              {errors.loanTitle && (
                <p className="text-red-500 text-sm mt-1">
                  Loan title is required
                </p>
              )}
            </div>

            {/* Category */}
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

            {/* Interest Rate */}
            <div>
              <label className="label font-semibold">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("interestRate", { required: true })}
                placeholder="e.g. 12.5"
                className="input input-bordered w-full"
              />
            </div>

            {/* Max Loan Limit */}
            <div>
              <label className="label font-semibold">
                Max Loan Limit
              </label>
              <input
                type="number"
                {...register("maxLoanLimit", { required: true })}
                placeholder="e.g. 500000"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label font-semibold">Description</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Write a brief loan description"
              className="textarea textarea-bordered w-full min-h-[120px]"
            />
          </div>

          {/* Documents & EMI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label font-semibold">
                Required Documents
              </label>
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

          {/* Image & Date */}
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

          {/* Toggle */}
          <div className="flex items-center gap-4 mt-4">
            <input
              type="checkbox"
              {...register("showOnHome")}
              className="toggle toggle-success"
            />
            <span className="font-medium">
              Show this loan on Home page
            </span>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button className="btn btn-primary w-full text-lg">
              Add Loan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoan;
