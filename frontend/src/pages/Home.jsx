import React, { useEffect, useState } from "react";
import logo from "../assets/download.jpg";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeatures from "../component/CardFeatures";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/Allproduct";

export default function Home() {
    const ProductData = useSelector((state) => state.product);
    const HomeProductCartList = ProductData.slice(0, 4);
    const ProductDataListVegetable = ProductData.filter(el => el.category === "Vegetable");
    console.log(ProductDataListVegetable);      

    const loadingArray = new Array(4).fill(null); // Placeholder array
    const categoryList = [...new Set(ProductData.map(el => el.category))]; // Get unique categories
    console.log(categoryList);

    return (
        <div className="ml-4">
            {/* Banner Section */}
            <div className="flex flex-col md:flex-row gap-4 py-4 px-2">
                <div className="w-full md:w-1/2">
                    <div className="flex gap-2 items-center">
                        <span className="bg-slate-400 rounded-lg py-1 px-2">Bike Delivery</span>
                        <img src={logo} className="h-10" alt="Delivery Logo" />
                    </div>
                    <div className="py-4">
                        <h1 className="text-4xl md:text-7xl font-bold">
                            The Fastest Delivery to <span className="text-red-600">Your Home</span>
                        </h1>
                        <p className="py-4 text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In molestiae at ut! Ratione, eum
                            aperiam perferendis doloremque recusandae blanditiis quam quaerat.
                        </p>
                        <button className="text-bold shadow-md shadow-black bg-red-500 text-slate-100 px-3 py-1 rounded-md">
                            Order Now
                        </button>
                    </div>
                </div>

                {/* Right Section: Product Cards */}
                <div className="w-full md:w-1/2 mt-14 flex flex-wrap gap-4 justify-center items-stretch">
                    {HomeProductCartList.length > 0 ? (
                        HomeProductCartList.map(el => (
                            <HomeCard
                                key={el._id}  // Pass the id
                                id={el._id}  // Make sure to pass the id prop
                                name={el.name}
                                image={el.image}
                                price={el.price}
                                category={el.category}
                            />
                        ))
                    ) : (
                        loadingArray.map((_, index) => (
                            <HomeCard key={index} />
                        ))
                    )}
                </div>
            </div>

            {/* Fresh Vegetables Section */}
            <div>
                <h2 className="font-bold text-2xl text-slate-800">Fresh Vegetables</h2>
                <div className="mt-4 flex flex-wrap md:justify-evenly md:space-y-4 justify-center gap-4">
                    {ProductDataListVegetable.length > 0 ? (
                        ProductDataListVegetable.map(el => (
                            <CardFeatures
                                key={el._id}  // Pass the id
                                id={el._id}  // Make sure to pass the id prop
                                name={el.name}
                                image={el.image}
                                price={el.price}
                                category={el.category}
                            />
                        ))
                    ) : (
                        loadingArray.map((_, index) => (
                            <CardFeatures key={index} />
                        ))
                    )}
                </div>
            </div>
            <AllProduct/>
        </div>
    );
}
