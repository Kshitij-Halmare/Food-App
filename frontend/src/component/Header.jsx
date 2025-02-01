import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png"; // Default logo
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; // Fixed import
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { IoPerson } from "react-icons/io5";
import { logout } from "../redux/useSlice"; // Redux logout action
import { toast } from "react-hot-toast"; // For toast notifications
import { MdOutlineLightMode, MdLightMode } from "react-icons/md"; // Import both icons
import { login, setUserImage } from "../redux/useSlice";


export default function Header() {
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const items = useSelector((state) => state.product.cartItem); // Correct cart item selector
  const countofItems = items.length;
  const { darkMode } = useSelector((state) => state.theme); // Get darkMode state from redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const email = import.meta.env.VITE_ADMIN_EMAIL;
  const menuRef = useRef(null);

  const handleTheClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    setLoggedIn(false);
    toast.success("You have logged out successfully!");
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
    console.log(token);
    // if(token){
    //   const decoded = jwtDecode(token);
    //   console.log(decoded);
    //   dispatch(login(decoded));
    // }
    token!=null?setLoggedIn(true):setLoggedIn(false);
  }, []);
  console.log(loggedIn);
  return (
    <header className={`fixed shadow-md w-full h-16 px-2 md:px-4 z-20 transition-colors ${darkMode ? 'bg-black text-white drop-shadow-md shadow-white' : 'bg-white text-black shadow-slate-300'}`}>
      <div className={`flex items-center h-full justify-between ${darkMode ? "text-white" : "text-black"}`}>
        <Link to="/">
          <div className="pl-2">
            <img
              src={logo}
              alt="logo"
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4 relative">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to="/">Home</Link>
            <Link to="/menu/:all">Menu</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link> 
          </nav>
          {/* Toggle dark mode icon */}
          {darkMode ? (
              <MdLightMode
                onClick={() => dispatch({ type: 'theme/toggleDarkMode' })}
                className="text-yellow-500 text-2xl cursor-pointer"
              />
            ) : (
              <MdOutlineLightMode
                onClick={() => dispatch({ type: 'theme/toggleDarkMode' })}
                className="text-gray-700 text-2xl cursor-pointer"
              />
            )}
          <Link to="/cart">
            <div className="text-2xl relative md:block">
              <FaCartShopping className={`${darkMode ? 'text-gray-200' : 'text-slate-600'}`} />
              <div className="bg-red-500 text-white text-sm text-center rounded-full px-1 m-0 absolute -top-3 -right-1.5">
                {countofItems}
              </div>
            </div>
          </Link>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <div
              className={`border-2 cursor-pointer rounded-full p-1 ${darkMode ? 'border-gray-600' : 'border-gray-500'}`}
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
              <div className={`absolute flex flex-col right-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border px-2 py-2 shadow-md z-10`}>
                {email === userData.email && (
                  <Link
                    to="/newProduct"
                    className="text-slate-400 dark:text-gray-300 whitespace-nowrap cursor-pointer hover:bg-gray-700 hover:text-white p-1 rounded-md"
                  >
                    New Product
                  </Link> 
                )}
                {loggedIn || !userData ? (
                  <p
                    className="text-slate-400 dark:text-gray-300 whitespace-nowrap cursor-pointer hover:bg-gray-700 hover:text-white p-1 rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to="/login"
                    className="text-slate-400 dark:text-gray-300  whitespace-nowrap cursor-pointer hover:bg-gray-700 hover:text-white p-1 rounded-md"
                  >
                    Login
                  </Link>
                )}
                {/* Navigation Links for Mobile */}
                <div className="flex border-t mt-2 flex-col md:hidden hover:bg-slate-300 dark:hover:bg-gray-600">
                  <Link to="/menu/:all" className="text-slate-400 dark:text-gray-300 p-1">Menu</Link>
                  <Link to="/about" className="text-slate-400 dark:text-gray-300 p-1">About</Link>
                  <Link to="/contact" className="text-slate-400 dark:text-gray-300 p-1">Contact</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
