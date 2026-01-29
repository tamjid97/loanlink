import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ApplyLons = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [loan, setLoan] = useState(null);
  const [loadingLoan, setLoadingLoan] = useState(true);

  const { register, handleSubmit, reset } = useForm();

  // Fetch loan details to auto-fill
  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axiosSecure.get(`/loan/${id}`);
        setLoan(res.data);
      } catch (err) {
        console.error("Error fetching loan:", err);
      } finally {
        setLoadingLoan(false);
      }
    };
    fetchLoan();
  }, [id, axiosSecure]);

  const onSubmit = async (data) => {
    if (!loan) return;

    const finalData = {
      ...data,
      loanId: id,
      loanTitle: loan.loanTitle,
      interestRate: loan.interestRate,
      userEmail: "user@example.com", // TODO: Replace with logged-in user's email
      status: "Pending",
      applicationFeeStatus: "Unpaid",
      date: new Date().toLocaleDateString(),
    };

    try {
      const result = await Swal.fire({
        title: "Confirm Application",
        text: "Do you want to submit this loan application?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, submit",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axiosSecure.post("/loan-application", finalData);
        await Swal.fire({
          title: "Success",
          text: "Your loan application has been submitted!",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to submit application",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loadingLoan) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!loan) {
    return (
      <p className="text-center text-red-500 mt-10">
        Loan details not found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-primary">
            Apply for {loan.loanTitle}
          </h2>
          <p className="text-gray-500 mt-2">
            Fill out the form below to apply for this loan
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Auto-filled fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label font-semibold">User Email</label>
              <input
                type="email"
                value="user@example.com"
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="label font-semibold">Loan Title</label>
              <input
                type="text"
                value={loan.loanTitle}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="label font-semibold">Interest Rate (%)</label>
              <input
                type="text"
                value={loan.interestRate}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>

          {/* User input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label font-semibold">First Name</label>
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="Enter first name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label font-semibold">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Enter last name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label font-semibold">Contact Number</label>
              <input
                type="text"
                {...register("contactNumber", { required: true })}
                placeholder="Enter contact number"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label font-semibold">National ID / Passport</label>
              <input
                type="text"
                {...register("nidPassport", { required: true })}
                placeholder="Enter NID or Passport"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label font-semibold">Income Source</label>
              <input
                type="text"
                {...register("incomeSource", { required: true })}
                placeholder="e.g., Salary, Business"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label font-semibold">Monthly Income</label>
              <input
                type="number"
                {...register("monthlyIncome", { required: true })}
                placeholder="Enter monthly income"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label font-semibold">Loan Amount</label>
              <input
                type="number"
                {...register("loanAmount", { required: true })}
                placeholder="Enter desired loan amount"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label font-semibold">Reason for Loan</label>
              <input
                type="text"
                {...register("loanReason", { required: true })}
                placeholder="Reason for applying"
                className="input input-bordered w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label font-semibold">Address</label>
              <textarea
                {...register("address", { required: true })}
                placeholder="Enter your address"
                className="textarea textarea-bordered w-full"
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <label className="label font-semibold">Extra Notes</label>
              <textarea
                {...register("extraNotes")}
                placeholder="Any additional information"
                className="textarea textarea-bordered w-full"
                rows={2}
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="btn btn-primary w-full text-lg"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLons;
