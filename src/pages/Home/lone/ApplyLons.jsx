import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ApplyLons = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loan, setLoan] = useState(null);
  const [loadingLoan, setLoadingLoan] = useState(true);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axiosSecure.get(`/loan/${id}`);
        setLoan(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingLoan(false);
      }
    };
    fetchLoan();
  }, [id, axiosSecure]);

  const onSubmit = async (data) => {
    if (!loan || !user?.email) return;

    const finalData = {
      ...data,
      loanId: id,
      loanTitle: loan.loanTitle,
      interestRate: loan.interestRate,
      userEmail: user.email.toLowerCase(),
      status: "Pending",
      applicationFeeStatus: "Unpaid",
      date: new Date().toLocaleDateString(),
    };

    const confirm = await Swal.fire({
      title: "Confirm Application",
      text: "Are you sure you want to submit this loan application?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Submit",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.post("/loan-application", finalData);
      Swal.fire("Success", "Application submitted successfully", "success");
      reset();
    }
  };

  if (loadingLoan) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-base-100 shadow-xl rounded-2xl p-8 md:p-12">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-primary">
              Apply for {loan.loanTitle}
            </h1>
            <p className="text-gray-500 mt-2">
              Complete the form carefully to apply for this loan
            </p>
          </div>

          {/* Loan Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-base-200 p-4 rounded-xl">
              <p className="text-sm text-gray-500">User Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div className="bg-base-200 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Loan Title</p>
              <p className="font-semibold">{loan.loanTitle}</p>
            </div>
            <div className="bg-base-200 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="font-semibold">{loan.interestRate}%</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["First Name", "firstName"],
                ["Last Name", "lastName"],
                ["Contact Number", "contactNumber"],
                ["NID / Passport", "nidPassport"],
                ["Income Source", "incomeSource"],
                ["Monthly Income", "monthlyIncome"],
                ["Loan Amount", "loanAmount"],
                ["Reason for Loan", "loanReason"],
              ].map(([label, name]) => (
                <div key={name}>
                  <label className="label font-semibold">{label}</label>
                  <input
                    {...register(name, { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="label font-semibold">Address</label>
                <textarea
                  {...register("address", { required: true })}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold">Extra Notes</label>
                <textarea
                  {...register("extraNotes")}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
              </div>
            </div>

            <button className="btn btn-primary btn-lg w-full rounded-xl">
              Submit Loan Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLons;