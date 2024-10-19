import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AllProduct from "../component/Allproduct";

export default function Menu() {
    const { id } = useParams(); // Get the id from the URL
    const ProductData = useSelector((state) => state.product); // Fetch product data from Redux
    const [all, setAll] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    // Use useEffect to update the 'all' state when 'id' changes
    useEffect(() => {
        console.log(id);
        if (id == ":all") {
            setAll(true);
        } else {
            setAll(false);
        }
        setLoading(false); // Set loading to false after checking id
    }, [id]);

    // Render AllProduct component if 'all' is true
    if (all) {
        console.log("yes");
        return <AllProduct />;
    }

    // Find the product by id
    const selectedProduct = ProductData.find((product) => product._id === id);

    // Handle the case where the product is not found
    if (!selectedProduct) {
        return <div>Product not found or still loading...</div>; // Customize this fallback
    }

    const { name, image, price, category, description } = selectedProduct;

    return (
        <div className="mt-6">
            <div className="max-w-2xl bg-white mx-auto p-4 gap-4 md:flex">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-105 rounded-md"
                />
                <div className="p-4">
                    <h1 className="text-3xl font-bold mt-4">{name}</h1>
                    <p className="text-lg text-gray-600">{category}</p>
                    <p className="text-red-500 font-semibold mt-2">Rs {price}/-</p>
                    <p className="mt-4">{description}</p>
                    <button className="mt-4 bg-yellow-400 py-2 px-4 rounded-md">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
