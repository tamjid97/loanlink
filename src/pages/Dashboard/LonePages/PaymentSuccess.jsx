import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const loanId = params.get("loanId");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (loanId) {
      axiosSecure.patch(`/loan-application/payment-success/${loanId}`);
    }
  }, [loanId]);

  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <h1 className="text-4xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-4 text-gray-500">
        Your application fee has been paid successfully.
      </p>
    </div>
  );
};

export default PaymentSuccess;
