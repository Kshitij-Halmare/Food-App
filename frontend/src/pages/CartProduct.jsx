import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCartItems, subtractCartItems, deleteCartItems } from "../redux/productSlice";
import { MdDelete } from "react-icons/md";

function CartProduct({ id, name, price, category, image, qty, total }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme).darkMode;

  const handleAddToCart = () => {
    dispatch(increaseCartItems({
      id,
      name,
      price,
      category,
      image,
    }));
  };

  const handleSubtractToCart = () => {
    dispatch(subtractCartItems({
      id,
      price,
    }));
  };

  const handleDelete = () => {
    dispatch(deleteCartItems(id));
  };

  return (
    <div className="pb-10">
      <div className={`flex flex-col md:flex-row w-full p-4 shadow-2xl justify-between rounded-xl items-center ${mode ? "bg-black text-white shadow-white drop-shadow-sm" : "bg-white"}`}>
        {/* Product Image and Details */}
        <div className="flex w-full md:w-auto items-center">
          <img src={image} alt={name} className="w-40 h-40 md:w-48 md:h-48 object-cover shadow-xl rounded-md" />
          <div className="pl-6 md:pl-10 w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold mt-4">{name}</h1>
            <p className="text-sm md:text-lg text-gray-600">{category}</p>
            <p className="text-red-500 font-semibold mt-2">Rs {price}/-</p>
            <div className="flex gap-2 md:gap-4 items-center mt-2 md:mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-yellow-400 py-0.5 px-2 rounded-md text-lg md:text-2xl"
              >
                +
              </button>
              <p className="font-semibold text-lg md:text-xl">{qty}</p>
              <button
                onClick={handleSubtractToCart}
                className="bg-yellow-400 py-0.5 px-2 rounded-md text-lg md:text-2xl"
              >
                -
              </button>
            </div>
          </div>
        </div>

        {/* Total Price and Delete Button */}
        <div className="flex flex-col items-center md:items-end mt-6 md:mt-0 w-full md:w-auto">
          <MdDelete className="text-2xl mb-2 md:mb-8 cursor-pointer text-red-500" onClick={handleDelete} />
          <h1 className="font-bold text-lg md:text-xl">
            Total: Rs <span>{total}</span>/-
          </h1>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
