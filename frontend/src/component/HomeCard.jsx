import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomeCard({ id, name, image, price, category }) {
    const mode = useSelector((state) => state.theme.darkMode);

    return (
        <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
            <div
                className={`${
                    mode
                        ? "bg-gray-900 text-gray-200 shadow-white"
                        : "bg-white text-gray-900 shadow-lg shadow-black"
                } shadow-lg rounded-xl text-center p-4 transition transform hover:scale-105 hover:shadow-xl h-80`} // Fixed height of 24rem (96)
            >
                {name ? (
                    <>
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <h3
                            className={`font-bold text-xl mt-3 ${
                                mode ? "text-gray-100" : "text-gray-800"
                            }`}
                        >
                            {name}
                        </h3>
                        <p className={`mt-1 ${mode ? "text-gray-400" : "text-gray-500"}`}>
                            {category}
                        </p>
                        <p className="text-red-500 font-semibold mt-2">
                            Rs {price}/-
                        </p>
                    </>
                ) : (
                    // Placeholder for loading state
                    <div className="animate-pulse">
                        <div className="bg-gray-300 w-full h-40 rounded-lg"></div>
                        <div className="mt-4 bg-gray-300 h-6 rounded w-3/4 mx-auto"></div>
                        <div className="mt-3 bg-gray-300 h-4 rounded w-1/2 mx-auto"></div>
                        <div className="mt-3 bg-gray-300 h-6 rounded w-1/2 mx-auto"></div>
                    </div>
                )}
            </div>
        </Link>
    );
}
