import React, { useState } from "react";
import signup from "../assets/signup.gif";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handlePasswordToggle = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;
      
        if (email && password) {
          try {
            console.log(`${import.meta.env.VITE_SERVER_DOMAIN}/login`);
            const fetchData = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
      
            const dataRes = await fetchData.json();  // Parse the JSON response
      
            toast(dataRes.message);  // Always show the message
      
            // Check if alert is true (successful login) and show an additional toast
            if (dataRes.alert) {
              toast.success("You logged in successfully!");  // Successful login toast
              navigate("/Home");
            } else {
              toast.error("Login failed, please check your credentials.");  // Failure toast
            }
          } catch (error) {
            console.error("Login failed", error);
            toast.error("An error occurred during login. Please try again.");  // Error toast
          }
        } else {
          toast.error("Please enter all required fields");  // Error for missing fields
        }
      };      

    return (
        <div className="py-2 md:pt-4">
            <div className="shadow drop-shadow-md flex p-4 flex-col w-full max-w-sm bg-white m-auto rounded-2xl">
                <div className="w-full">
                    <img
                        src={signup}
                        alt="signup"
                        className="w-20 overflow-hidden rounded-full shadow-md m-auto shadow-slate-500 drop-shadow-sm"
                    />
                </div>
                <form className="w-full py-3" onSubmit={handleSubmit}>
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
                    <button className="bg-red-500 text-white text-xl p-2 px-6 hover:bg-red-700 rounded-full block m-auto">
                        Login
                    </button>
                </form>
                <p className="mt-3">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="text-blue-400 hover:underline">
                        Sign-up
                    </Link>
                </p>
            </div>
        </div>
    );
}
