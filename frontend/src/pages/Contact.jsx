import React from "react";
import { useSelector } from "react-redux";
import contactImage from "../assets/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Importing React Icons

export default function Contact() {
    const mode = useSelector((state) => state.theme.darkMode);
    return (
        <div className={`${mode ? "bg-gray-950 text-white" : "bg-gradient-to-b from-blue-50 to-gray-100 text-black"} min-h-screen flex flex-col items-center justify-center p-6`}>
            <div className={`max-w-4xl w-full ${mode ? "bg-gray-800 text-white" : "bg-white"} rounded-3xl shadow-2xl p-8 relative`}>
                <img
                    src={contactImage}
                    alt="Contact Us"
                    className="w-full h-72 object-cover rounded-t-3xl mb-6"
                />
                <h1 className="text-5xl font-extrabold text-center text-blue-700 dark:text-blue-300 mb-8">Contact Us</h1>
                <p className={`text-lg text-center mb-8 leading-relaxed ${mode ? "text-gray-200" : "text-gray-700"}`}>
                    We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us anytime.
                </p>

                <div className="mt-8 text-center">
                    <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-300 mb-6">Get in Touch</h2>
                    <p className={`${mode ? "text-gray-200" : "text-gray-700"}`}>
                        Email us at <span className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">support@foodiehaven.com</span>
                        <br /> Or call us at <span className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">+123-456-7890</span>
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-300 mb-6">Follow Us</h2>
                    <div className="flex justify-center space-x-8">
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition duration-300">
                            <FaFacebookF className="text-4xl" />
                        </a>
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition duration-300">
                            <FaTwitter className="text-4xl" />
                        </a>
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition duration-300">
                            <FaInstagram className="text-4xl" />
                        </a>
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition duration-300">
                            <FaLinkedinIn className="text-4xl" />
                        </a>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-300 text-center mb-6">Our Location</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                        123 Foodie Street, Culinary City, FL 12345
                    </p>
                    <iframe
                        className="w-full h-64 mt-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509372!2d144.9537353155042!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5776d7a76b85d3b!2sVictoria%20State%20Library!5e0!3m2!1sen!2sus!4v1614214316561!5m2!1sen!2sus"
                        allowFullScreen=""
                        loading="lazy"
                        title="Location Map"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
