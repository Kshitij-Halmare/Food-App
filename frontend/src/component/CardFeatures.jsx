import React from "react";
import { Link } from "react-router-dom";
import { addCartItems } from "../redux/productSlice";
import { useDispatch,useSelector } from "react-redux";
import toast from "react-hot-toast"

export default function CardFeatures({ id, name, image, price, category }) {
    const mode=useSelector((state)=>state.theme).darkMode;
    const dispatch = useDispatch();
    // console.log(image);
    const handleAddToCart = () => {
        dispatch(addCartItems({
            id: id,
            name: name,
            price: price,
            category: category,
            image: image,
        }));
    };

    return (
        <div className={`hover:scale-105 ${mode ? "bg-black shadow-md shadow-white":"bg-white shadow-md shadow-black"}  rounded-2xl text-center p-4 w-full md:w-64 cursor-pointer`}>
            {/* Wrap the clickable content in a Link */}
            <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                {name ? (
                    <>
                        {/* Responsive image handling with hover effect */}
                        <div className="relative overflow-hidden rounded-md">
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-32 object-cover"
                            />
                        </div>
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
            </Link>
            {/* Add to Cart button */}
            <button 
                className="text-center w-full py-2 bg-yellow-400 rounded-md mt-2 hover:bg-yellow-500 transition-all duration-200" 
                onClick={handleAddToCart} // Corrected function call
            >
                Add to Cart
            </button>
        </div>
    );
}
