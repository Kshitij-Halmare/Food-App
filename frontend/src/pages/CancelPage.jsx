import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function CancelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <AiOutlineCloseCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment process was cancelled. If this was a mistake, you can try again.
        </p>
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2"
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
}
