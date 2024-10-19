import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png"; // Default logo
import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { IoPerson } from "react-icons/io5";
import { logout } from "../redux/useSlice"; // Redux logout action
import { toast } from "react-hot-toast"; // For toast notifications

export default function Header() {
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
    const email = import.meta.env.VITE_ADMIN_EMAIL;
    const menuRef = useRef(null);

    const handleTheClick = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        // Dispatch logout action to clear user data from Redux
        dispatch(logout());
        // Immediately update the local state to false
        setLoggedIn(false);
        // Show a toast notification for successful logout
        toast.success("You have logged out successfully!");
        // Redirect to login page
        navigate("/login");
    };

    // Close the dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false); // Close the dropdown if clicking outside
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoggedIn(!!token);
    }, []);

    return (
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-20 bg-white">
            <div className="flex items-center h-full justify-between">
                <Link to="/">
                    <div className="h-14 pl-2">
                        <img
                            src={logo}
                            alt="logo"
                            className="h-full object-cover rounded-full"
                        />
                    </div>
                </Link>
                <div className="flex items-center gap-4 relative">
                    {/* Cart Icon */}
                    {/* Navigation Links for Desktop */}
                    <nav className="hidden md:flex gap-4 text-base md:gap-6 md:text-lg">
                        <Link to="/menu/:all">Menu</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                    <div className="text-2xl text-slate-600 relative hidden md:block">
                        <FaCartShopping />
                        <div className="bg-red-400 text-white text-sm text-center rounded-full px-1 m-0 absolute -top-3 -right-1.5">
                            0
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="text-slate-600 relative" ref={menuRef}>
                        <div
                            className="border-2 border-gray-500 cursor-pointer border-solid rounded-full p-1"
                            onClick={handleTheClick}
                        >
                            {userData.image ? (
                                <img
                                    src={userData.image}
                                    alt="User"
                                    className="h-8 w-8 rounded-full"
                                />
                            ) : (
                                <IoPerson className="h-8 w-8" />
                            )}
                        </div>
                        {showMenu && (
                            <div className="absolute flex flex-col right-0 bg-white border border-gray-300 px-2 py-2 shadow-md z-10">
                                {email === userData.email && (
                                    <Link
                                        to="/newProduct"
                                        className="text-slate-400 whitespace-nowrap cursor-pointer"
                                    >
                                        New Product
                                    </Link>
                                )}
                                {loggedIn ? (
                                    <p
                                        className="text-slate-400 whitespace-nowrap cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </p>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="text-slate-400  whitespace-nowrap cursor-pointer"
                                    >
                                        Login
                                    </Link>
                                )}
                                {/* Navigation Links for Mobile */}
                                <div className="flex flex-col md:hidden hover:bg-slate-300">
                                    <Link to="/menu" className="text-slate-400">Menu</Link>
                                    <Link to="/about" className="text-slate-400">About</Link>
                                    <Link to="/contact" className="text-slate-400">Contact</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
