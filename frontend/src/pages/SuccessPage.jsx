import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <AiOutlineCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment! Your transaction was successful.
        </p>
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2"
          onClick={() => navigate("/home")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
