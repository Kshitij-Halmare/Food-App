import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AllProduct from "../component/Allproduct";
import { addCartItems } from "../redux/productSlice";

export default function Menu() {
    const { id } = useParams(); // Get the id from the URL
    const ProductData = useSelector((state) => state.product.products); // Fetch product data from Redux
    const [all, setAll] = useState(false);
    const mode = useSelector((state) => state.theme.darkMode);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addCartItems({
            id: id,
            name: name,
            price: price,
            category: category,
            image: image,
        }));
    };

    // Use useEffect to update the 'all' state when 'id' changes
    useEffect(() => {
        if (id === ":all") {
            setAll(true);
        } else {
            setAll(false);
        }
        setLoading(ProductData.length === 0); // Check if data is loaded
    }, [id, ProductData]);

    // Render AllProduct component if 'all' is true
    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (all) {
        return <AllProduct />;
    }

    // Find the product by id
    const selectedProduct = ProductData.find((product) => product._id === id);

    // Handle the case where the product is not found
    if (!selectedProduct) {
        return <div className="text-center text-gray-500">Product not found...</div>;
    }

    const { name, image, price, category, description } = selectedProduct;

    return (
        <div className={`p-6 w-full ${mode ? "bg-gray-950 text-white" : "bg-gray-200 text-gray-900"}`}>
            <div className={`max-w-2xl mx-auto p-8 gap-4 md:flex  rounded-lg shadow-md ${mode ? "bg-black shadow shadow-white" : "bg-white shadow-xl shadow-black"}`}>
                <img
                    src={image}
                    alt={name}
                    className="w-96 h-64 object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <div className="p-4">
                    <h1 className="text-3xl font-bold mt-4">{name}</h1>
                    <p className="text-lg text-gray-600">{category}</p>
                    <p className="text-red-500 font-semibold mt-2">Rs {price}/-</p>
                    <p className="mt-4">{description}</p>
                    <div className="flex gap-4 mt-6">
                        <button className="bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded-md transition duration-200">Buy</button>
                        <button className="bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded-md transition duration-200">Add_to_Cart</button>
                    </div>
                </div>
            </div>
            <h2 className={`font-bold ml-6 mt-10 text-4xl ${mode ? "text-gray-100" : "text-slate-800"} mb-3`}>
                Related Products
            </h2>
            <AllProduct />
        </div>
    );
}
