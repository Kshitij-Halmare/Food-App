import React from "react";
import { useSelector } from "react-redux";
import image from "../assets/istockphoto-1316145932-612x612.jpg";

export default function AboutUs() {
    const mode = useSelector((state) => state.theme.darkMode);
    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${mode ? "bg-gray-950 text-white" : "bg-gray-100 text-black"}`}>
            <div className={`max-w-5xl w-full rounded-3xl shadow-2xl p-8 ${mode ? "bg-gray-800" : "bg-white"}`}>
                <img 
                    src={image} 
                    alt="Delicious food" 
                    className="w-full h-72 object-cover rounded-2xl mb-8"
                />
                <h1 className="text-5xl font-bold text-center text-green-600 mb-6">About Us</h1>
                <p className={`text-lg text-center mb-8 ${mode ? "text-gray-200" : "text-gray-700"}`}>
                    Welcome to <span className="font-semibold text-green-500">Foodie Haven</span>, your ultimate destination for delicious meals delivered straight to your door. Our mission is to bring the best dishes from your favorite local restaurants and chefs directly to you, ensuring quality, freshness, and satisfaction in every bite.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-3xl font-semibold text-green-600 mb-4">Our Vision</h2>
                        <p className={`leading-relaxed ${mode ? "text-gray-300" : "text-gray-600"}`}>
                            To create a platform that connects food lovers with diverse cuisines from around the world, fostering a community of joy and togetherness through the love of food.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-green-600 mb-4">Why Choose Us?</h2>
                        <ul className={`list-disc list-inside leading-relaxed ${mode ? "text-gray-300" : "text-gray-600"}`}>
                            <li>Fresh and high-quality ingredients</li>
                            <li>Wide variety of cuisines and options</li>
                            <li>Fast and reliable delivery service</li>
                            <li>Easy-to-use app with secure payment options</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <h2 className="text-3xl font-semibold text-green-600 mb-4">Our Story</h2>
                    <p className={`leading-relaxed ${mode ? "text-gray-300" : "text-gray-600"}`}>
                        Founded with the idea of making great food accessible to everyone, Foodie Haven began as a small initiative to connect local chefs with their communities. Today, we proudly serve thousands of happy customers, delivering smiles one meal at a time.
                    </p>
                </div>

                <div className="mt-10">
                    <h2 className="text-3xl font-semibold text-green-600 text-center mb-6">Contact Us</h2>
                    <p className={`leading-relaxed text-center ${mode ? "text-gray-300" : "text-gray-600"}`}>
                        Have questions or feedback? We'd love to hear from you! Reach out to us at <span className="font-semibold text-green-500">support@foodiehaven.com</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}
