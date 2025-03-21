import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct"; // Assuming CartProduct is in the same directory
import { selectCartTotals } from "../redux/productSlice"; // Assuming you have a selector to get totals
import image from "../assets/image_processing20201106-11709-18misc6.gif";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

const Cart = () => {
  const cartItems = useSelector((state) => state.product.cartItem); // Get cart items from redux
  const { totalQty, totalPrice } = useSelector(selectCartTotals); // Get total quantity and price from redux
  const mode = useSelector((state) => state.theme.darkMode); // Get dark mode status from redux
  const user = useSelector((state) => state.user); // Get user data from redux

  const handlePayment = async () => {
    const stripePromise = await loadStripe(import.meta.env.VITE_SERVER_PUBLIC_KEY);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/checkout-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cartItems }),
      });

      if (!res.ok) {
        toast.error("Failed to initiate payment.");
        return;
      }

      const resData = await res.json();
      toast.success("Redirecting to Payment Gateway...");
      stripePromise.redirectToCheckout({ sessionId: resData.id });
    } catch (err) {
      console.error("Error during payment:", err);
      toast.error("Something went wrong during payment.");
    }
  };

  return (
    <div className={`flex flex-col md:flex-row justify-between pt-10 p-4 ${mode ? "bg-gray-900" : ""}`}>
      {/* Cart Items Section - Right */}
      <div className="md:w-3/4 w-full mb-6 md:mb-0 px-5">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartProduct
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              category={item.category}
              image={item.image}
              qty={item.qty}
              total={item.total}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <img src={image} alt="Your cart is empty" className="px-20 max-h-100px" />
          </div>
        )}
      </div>

      {/* Cart Summary Section - Left */}
      <div
        className={`md:w-1/4 w-full p-6 max-h-56 shadow-lg rounded-xl ${
          mode ? "bg-black text-white shadow-md shadow-white" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Cart Summary</h2>
        <div className="border-b pb-4 mb-4">
          <p className="text-lg">
            Total Quantity: <span className="font-semibold">{totalQty}</span>
          </p>
          <p className="text-lg">
            Total Price: <span className="font-semibold">Rs {totalPrice}/-</span>
          </p>
        </div>
        {user && user._id ? (
          <button
            onClick={handlePayment}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Proceed to Payment
          </button>
        ) : (
          <p className="text-center text-red-500 font-semibold">
            Please log in to proceed to payment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
