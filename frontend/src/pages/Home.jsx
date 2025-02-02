import React from "react";
import logo from "../assets/download.jpg";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeatures from "../component/CardFeatures";
import AllProduct from "../component/Allproduct";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Home() {
    const ProductData = useSelector((state) => state.product.products); // Corrected to access the 'products' array
    const HomeProductCartList = ProductData.slice(0, 4); // Slicing the 'products' array
    const ProductDataListVegetable = ProductData.filter((el) => el.category === "Vegetable");
    const mode = useSelector((state) => state.theme.darkMode);
    const loadingArray = new Array(4).fill(null); // Placeholder array
    const categoryList = [...new Set(ProductData.map((el) => el.category))]; // Get unique categories

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleOrderNowClick = () => {
        navigate("/cart"); // Navigate to the cart page when clicked
    };

    return (
        <div className={`px-4 py-6 ${mode ? "bg-gray-950 text-white" : "bg-200-300 text-black shadow-lg"} transition-colors duration-300`}>
            <div className="flex flex-col md:flex-row gap-8 py-6 px-2 md:px-10">
                {/* Left Section: Intro and CTA */}
                <div className="w-full md:w-1/2 mt-20">
                    <div className="flex gap-2 items-center">
                        <span className="bg-slate-400 rounded-lg py-1 px-3 text-sm font-semibold text-white">
                            Bike Delivery
                        </span>
                        <img src={logo} className="h-10" alt="Delivery Logo" />
                    </div>
                    <div className="py-4">
                        <h1 className={`text-4xl md:text-6xl font-bold leading-tight ${mode ? "text-white" : "text-black"}`}>
                            The Fastest Delivery to{" "}
                            <span className="text-red-600">Your Home</span>
                        </h1>
                        <p className={`py-4 text-lg ${mode ? "text-slate-300" : "text-gray-600"}`}>
                            Experience swift delivery services for all your needs. Quality products at your doorstep,
                            at the speed of light!
                        </p>
                        <button 
                            className="bg-red-500 text-white px-5 py-3 rounded-md shadow-md hover:bg-red-600 transition duration-200"
                            onClick={handleOrderNowClick} // Attach the click handler
                        >
                            Order Now
                        </button>
                    </div>
                </div>

                {/* Right Section: Product Cards */}
                <div className="w-full md:w-1/2 flex flex-wrap gap-6 justify-center">
                    {HomeProductCartList.length > 0 ? (
                        HomeProductCartList.map((el) => (
                            <HomeCard
                                key={el._id}
                                id={el._id}
                                name={el.name}
                                image={el.image}
                                price={el.price}
                                category={el.category}
                            />
                        ))
                    ) : (
                        loadingArray.map((_, index) => <HomeCard key={index} />)
                    )}
                </div>
            </div>

            {/* Fresh Vegetables Section */}
            <div className="mt-10">
                <h2 className={`font-bold text-2xl ${mode ? "text-white" : "text-slate-800"} mb-6 text-center md:text-left`}>
                    Fresh Vegetables
                </h2>
                <div className="flex flex-wrap justify-center md:justify-evenly gap-6 ">
                    {ProductDataListVegetable.length > 0 ? (
                        ProductDataListVegetable.map((el) => (
                            <CardFeatures
                                key={el._id}
                                id={el._id}
                                name={el.name}
                                image={el.image}
                                price={el.price}
                                category={el.category}
                            />
                        ))
                    ) : (
                        loadingArray.map((_, index) => <CardFeatures key={index} />)
                    )}
                </div>
            </div>

            {/* All Products Section */}
            <div className="mt-10">
                <h2 className={`font-bold text-2xl ${mode ? "text-white" : "text-slate-800"} mb-5`}>
                    Filter Products by Category
                </h2>
                <AllProduct />
            </div>
        </div>
    );
}
