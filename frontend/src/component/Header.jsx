import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    
    const handletheClick = () => {
        setShowMenu(prev => !prev);
    };
    
    return (
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 bg-white">
            {/* desktop */}
            <div className="flex items-center h-full justify-between">
                <Link to="">
                    <div className="h-14 pl-2">
                        <img src={logo} alt="logo" className="h-full" />
                    </div>
                </Link>
                <div className="flex items-center gap-4 md:gap-6">
                    <nav className="flex gap-4 text-base md:gap-6 md:text-lg">
                        <Link to={""}>Home</Link>
                        <Link to={"menu"}>Menu</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    <div className="text-2xl text-slate-600 relative">
                        <FaCartShopping />
                        <div className="bg-red-400 text-white text-sm text-center rounded-full px-1 m-0 absolute -top-3 -right-1.5">0</div>
                    </div>
                    <div className="text-slate-600 relative">
                        <div className="border-2 border-gray-500 cursor-pointer border-solid rounded-full p-1">
                            <IoPerson onClick={handletheClick} />
                        </div>
                        {showMenu && (
                            <div className="absolute flex flex-col right-2 bg-white border px-2 py-2 shadow drop-shadow-md">
                                <Link to={"newProduct"} className="text-slate-400 whitespace-nowrap cursor-pointer">New Product</Link>
                                <Link to={"login"} className="text-slate-400 whitespace-nowrap cursor-pointer">Login</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* mobile */}
        </header>
    );
}
