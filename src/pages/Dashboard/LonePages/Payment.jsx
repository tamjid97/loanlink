import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/loan-application/${id}`)
      .then(res => setLoan(res.data));
  }, [id]);

  const handlePay = async () => {
    const paymentInfo = {
      loneId: loan._id,
      loneName: loan.loanTitle,
      senderEmail: user.email,
    };

    const res = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );

    window.location.replace(res.data.url);
  };

  if (!loan) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">Application Fee Payment</h1>

      <p><strong>Loan:</strong> {loan.loanTitle}</p>
      <p><strong>Amount:</strong> ৳ {loan.loanAmount}</p>
      <p><strong>Fee:</strong> $10</p>

      <button
        onClick={handlePay}
        className="btn btn-primary mt-6 w-full"
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default Payment;
