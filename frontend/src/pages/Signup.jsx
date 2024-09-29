import React, { useState } from "react";
import { toast } from "react-hot-toast";
import signup from "../assets/signup.gif";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { ImageToBeUploaded } from "../utility/imageToBeUploaded.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""
    });

    // Toggle visibility for password
    const handlePasswordToggle = () => {
        setPasswordVisible(prev => !prev);
    };

    // Toggle visibility for confirm password
    const handleConfirmPasswordToggle = () => {
        setConfirmPasswordVisible(prev => !prev);
    };

    // Handle image upload
    const handleTheProfileImage = async (e) => {
        const file = e.target.files[0]; // Correct file access
        if (file) {
            const data = await ImageToBeUploaded(file); // Upload image and get Base64 data
            setProfileImage(data); // Store uploaded image in state
            // console.log("Uploaded image data:", data);
            setData((prev) => ({
                ...prev,             // Spread previous state
                image: data          // Correctly add the image field
            }));
        }
    };
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(import.meta.env.VITE_SERVER_DOMAIN);
        const { firstName, email, password, confirmPassword } = data;
        console.log(data);
        if (firstName && email && password && confirmPassword) {
            if (password.length < 8 || confirmPassword.length < 8) {
                toast("Minimum Length of password should be 8");
            } else {
                if (password === confirmPassword) {
                    const fetchData = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/signup`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        }
                    );
                    console.log(fetchData);
                    const dataRes = await fetchData.json();
                    console.log(dataRes);
                    // alert();
                    toast(dataRes.message);
                    if (dataRes.alert) {
                        navigate("/login");
                    }
                } else {
                    toast("Passwords do not match");
                }
            }
        } else {
                toast("Please fill out all required fields");
        }
    };

    return (
        <div className="py-2 md:pt-4">
            <div className="relative shadow drop-shadow-md flex p-4 flex-col w-full max-w-sm bg-white m-auto rounded-2xl">
                <div className="w-24 h-24 rounded-full shadow-md m-auto bg-slate-50 shadow-slate-500 drop-shadow-sm relative">
                    {data.image ? (
                        <img src={data.image} alt="Profile" className="w-24 h-20 rounded-full object-cover overflow-hidden m-auto" />
                    ) : (
                        <img src={signup} alt="signup" className="w-24 h-20 rounded-full object-cover overflow-hidden m-auto" />
                    )}
                    <label htmlFor="profileImage" className="absolute inset-x-0 bottom-0 text-center text-sm cursor-pointer">
                        Upload
                        <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleTheProfileImage} />
                    </label>
                </div>

                {/* Signup Form */}
                <form className="w-full py-3" onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="rounded-md focus-within:outline-orange-200 mb-2 mt-1 w-full bg-slate-300 px-2 py-1 border-none"
                        value={data.firstName}
                        onChange={handleChange}
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="rounded-md focus-within:outline-orange-200 mb-2 mt-1 w-full bg-slate-300 px-2 py-1 border-none"
                        value={data.lastName}
                        onChange={handleChange}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="rounded-md focus-within:outline-orange-200 mb-2 mt-1 w-full bg-slate-300 px-2 py-1 border-none"
                        value={data.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Password</label>
                    <div className="flex px-2 mb-3 mt-1 bg-slate-300 rounded-md focus-within:outline focus-within:outline-orange-200">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            className="outline-none mb-2 mt-1 w-full bg-slate-300 border-none"
                            value={data.password}
                            onChange={handleChange}
                        />
                        <span
                            className="flex text-xl items-center cursor-pointer"
                            onClick={handlePasswordToggle}
                        >
                            {passwordVisible ? <MdOutlineRemoveRedEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="flex px-2 mb-3 mt-1 bg-slate-300 rounded-md focus-within:outline focus-within:outline-orange-200">
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="outline-none mb-2 mt-1 w-full bg-slate-300 border-none"
                            value={data.confirmPassword}
                            onChange={handleChange}
                        />
                        <span
                            className="flex text-xl items-center cursor-pointer"
                            onClick={handleConfirmPasswordToggle}
                        >
                            {confirmPasswordVisible ? <MdOutlineRemoveRedEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    <button className="bg-red-500 text-white text-xl p-2 px-6 hover:bg-red-700 rounded-full block m-auto">
                        Sign-up
                    </button>
                </form>
                <p className="mt-3">Already have an account? <Link to={"/login"} className="text-blue-400 hover:underline">Login</Link></p>
            </div>
        </div>
    );
}
