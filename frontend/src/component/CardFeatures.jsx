import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardFeatures({ id, name, image, price, category }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`menu/${id}`)}  // Ensure `id` is passed as a prop
            className="bg-white shadow-md shadow-black rounded-2xl text-center p-4 w-full max-w-xs sm:max-w-sm md:max-w-none lg:w-1/4 cursor-pointer"
        >
            {name ? (
                <>
                    {/* Responsive image handling with hover effect */}
                    <div className="relative overflow-hidden rounded-md">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-32 object-cover "
                        />
                    </div>
                    <h3 className="font-bold text-lg mt-2">{name}</h3>
                    <p className="text-gray-600">{category}</p>
                    <p className="text-red-500 font-semibold">Rs {price}/-</p>
                    <button className="text-center w-full py-2 bg-yellow-400 rounded-md mt-2 hover:bg-yellow-500 transition-all duration-200">
                        Add to Cart
                    </button>
                </>
            ) : (
                // Placeholder for loading state
                <div className="animate-pulse">
                    <div className="bg-gray-300 w-full h-32 rounded-md"></div>
                    <div className="mt-2 bg-gray-300 h-6 rounded w-3/4 mx-auto"></div>
                    <div className="mt-2 bg-gray-300 h-4 rounded w-1/2 mx-auto"></div>
                    <div className="mt-2 bg-gray-300 h-6 rounded w-1/2 mx-auto"></div>
                </div>
            )}
        </div>
    );
}
