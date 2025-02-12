import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authcontext } from "../provider/authprovider";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { div } from "framer-motion/client";

const Navbar = () => {
  const { user, logout, toggletheme } = useContext(authcontext);
  const lgout = () => {
    logout();
    toast.success("Successfully logged out");
  };

  return (
    <div className="navbar bg-gray-900 py-4 lg:px-6 px-4 shadow-md dark:bg-black">
    <motion.div
      className="navbar bg-gray-900 shadow-md dark:bg-black lg:w-[95%] m-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-start">
        
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 text-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <Link to="/">
              <li><a>Home</a></li>
            </Link>
            <Link to="/addtutor">
              <li><a>Become a Tutor</a></li>
            </Link>
            <Link to="/mybook">
              <li><a>My Bookings</a></li>
            </Link>
            <Link to="/alltutor">
              <li><a>Find Tutors</a></li>
            </Link>
            <Link to="/myaddedtutor">
              <li><a>My Listings</a></li>
            </Link>
            {user && user?.email ? (
              <>
                <li>
                  <a onClick={lgout} className="text-red-500">Logout</a>
                </li>
              </>
            ) : (
              <>
                <Link to="/login">
                  <li><a>Login</a></li>
                </Link>
                <Link to="/register">
                  <li><a>Register</a></li>
                </Link>
              </>
            )}
          </ul>
        </div>
  
        
        <Link
          to="/"
          className="btn btn-ghost text-2xl lg:text-3xl text-white font-bold"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          LearnMate
        </Link>
      </div>
  
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-300">
          <Link to="/">
            <li className="hover:text-white transition-colors"><a>Home</a></li>
          </Link>
          <Link to="/addtutor">
            <li className="hover:text-white transition-colors"><a>Become a Tutor</a></li>
          </Link>
          <Link to="/mybook">
            <li className="hover:text-white transition-colors"><a>My Bookings</a></li>
          </Link>
          <Link to="/alltutor">
            <li className="hover:text-white transition-colors"><a>Find Tutors</a></li>
          </Link>
          <Link to="/myaddedtutor">
            <li className="hover:text-white transition-colors"><a>My Listings</a></li>
          </Link>
        </ul>
      </div>
  
      
      <div className="navbar-end flex items-center gap-4">
        
        {user && user?.email ? (
          <div className="flex gap-4 items-center">
          <div className="dropdown dropdown-end">
            <div className="flex gap-2 items-center">
            <motion.img
              tabIndex={0}
              src={user.photoURL || "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg"}
              alt="User Profile"
              className="hidden lg:block profile-image w-[45px] h-[45px] rounded-full border-2 border-gray-700 cursor-pointer"
              title={user.displayName || "User"}
              whileHover={{ scale: 1.1 }}
            />
            <button
                  className="hidden lg:block btn btn-sm bg-red-600 text-white hover:bg-red-500 w-[fit-content]"
                  onClick={lgout}
                >
                  Logout
                </button></div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <span className="block px-4 py-2 text-sm text-gray-400">
                  {user.displayName || "User"}
                </span>
              </li>
              <li>
                <button
                  className="btn btn-sm bg-red-600 text-white hover:bg-red-500 w-full"
                  onClick={lgout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        ) : (
          <div className="hidden lg:flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Link className="btn btn-sm bg-gray-700 text-gray-300 hover:bg-gray-600" to="/login">
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Link className="btn btn-sm bg-gray-700 text-gray-300 hover:bg-gray-600" to="/register">
                Register
              </Link>
            </motion.div>
          </div>
        )}
  
        
        <div onClick={toggletheme} className="darktheme w-[26px] h-[26px] cursor-pointer" ></div>
      </div>
    </motion.div>
    </div>
  );
  
  
};

export default Navbar;
