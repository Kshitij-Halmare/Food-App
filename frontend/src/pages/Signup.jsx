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
    const [profileImage, setProfileImage] = useState(signup);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""
    });

    const handlePasswordToggle = () => {
        setPasswordVisible(prev => !prev);
    };

    const handleConfirmPasswordToggle = () => {
        setConfirmPasswordVisible(prev => !prev);
    };

    const handleTheProfileImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const data = await ImageToBeUploaded(file);
            setProfileImage(data);
            setData((prev) => ({
                ...prev,
                image: profileImage
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
        
        const { firstName, email, password, confirmPassword } = data;
    
        // Check for all required fields
        if (firstName && email && password && confirmPassword) {
            // Ensure the password meets minimum length and matches the confirm password
            if (password.length < 8 || confirmPassword.length < 8) {
                toast("Minimum length of password should be 8 characters.");
            } else if (password !== confirmPassword) {
                toast("Passwords do not match.");
            } else {
                try {
                    // Send user data to server for signup
                    const fetchData = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),  // Send the user data
                    });
    
                    // Get the response data from the server
                    const dataRes = await fetchData.json();
                    
                    // Show a toast message with the server response
                    toast(dataRes.message);
                    
                    // If signup is successful, get the token and store it
                    if (dataRes.token) {
                        localStorage.setItem("token", dataRes.token);
                        console.log("token.set");  // Store the JWT token in localStorage
                        navigate("/login");  // Redirect to login page after successful signup
                    }
                } catch (error) {
                    // Catch any errors that occur during the signup process
                    console.error("Signup error", error);
                    toast("Signup error, please try again.");
                }
            }
        } else {
            // Show a toast if any required fields are missing
            
            toast("Please fill out all required fields.");
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
