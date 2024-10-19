import React from "react";

export default function HomeCard({ name, image, price, category }) {
    return (
        <div className="bg-white shadow-md shadow-black rounded-2xl text-center p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            {name ? (
                <>
                    <img src={image} alt={name} className="w-full h-32 object-cover rounded-md" />
                    <h3 className="font-bold text-lg mt-2">{name}</h3>
                    <p className="text-gray-600">{category}</p>
                    <p className="text-red-500 font-semibold">Rs {price}/-</p>
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
