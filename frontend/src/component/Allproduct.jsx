import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AllProduct from "../component/Allproduct";

export default function Menu() {
    const { id } = useParams();
    const ProductData = useSelector((state) => state.product);
    const [all, setAll] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (id === ":all") { // Check for "all"
          return(
            <AllProduct/>
          )
        } 
    }, [id]);

    // Avoid unnecessary re-computation using useMemo
    const selectedProduct = useMemo(() => {
        return ProductData.find((product) => product._id === id);
    }, [ProductData, id]);

    // Product not found fallback
    if (!selectedProduct) {
        return <div>Product not found or still loading...</div>;
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
