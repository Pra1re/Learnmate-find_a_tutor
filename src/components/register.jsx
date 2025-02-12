import React, { useContext, useState } from 'react';
import { authcontext } from '../provider/authprovider';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const { createuser, setuser, updateUserProfile, googleLogin } = useContext(authcontext);
  
  const [passwordError, setPasswordError] = useState("");

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setuser(user);
        toast.success("Google login successful!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("Google login failed!");
      });
  };

  const validatePassword = (password) => {
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const lengthPattern = /.{6,}/;

    if (!upperCasePattern.test(password)) {
      return "Password must contain at least one uppercase letter.";
    } else if (!lowerCasePattern.test(password)) {
      return "Password must contain at least one lowercase letter.";
    } else if (!lengthPattern.test(password)) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const fname = form.get("fname");
    const lname = form.get("lname");
    const purl = form.get("purl");
    const email = form.get("email");
    const password = form.get("password");

    const passwordErrorMessage = validatePassword(password);
    if (passwordErrorMessage) {
      setPasswordError(passwordErrorMessage);
      return;
    } else {
      setPasswordError("");
    }

    createuser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setuser(user); 
        toast.success("Successfully registered"); 
        
        return updateUserProfile(user, {
          displayName: `${fname} ${lname}`,
          photoURL: purl,
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        toast.error("Registration failed");
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200 dark:bg-gray-800">
      <div className="hero-content flex flex-col lg:flex-row lg:justify-between lg:items-center w-full px-6 md:px-16">
        
        <div className="text-center lg:text-left lg:max-w-lg mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold dark:text-white">Create Your Account</h1>
          <p className="py-6 text-gray-600 dark:text-gray-300">
            Join us today to start your journey. Sign up to access exclusive features and connect with like-minded people.
            Whether you're here to learn, grow, or explore, we have something for you!
          </p>
        </div>

        
        <div className="card w-full max-w-lg p-6 bg-base-100 shadow-lg rounded-lg dark:bg-gray-900">
          <form onSubmit={handlesubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  name="fname"
                  className="input input-bordered dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lname"
                  className="input input-bordered dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
            </div>

            
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                name="purl"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
              />
            </div>

            
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                required
              />
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover dark:text-blue-400">
                  Forgot password?
                </a>
              </label>
            </div>

            
            <div className="form-control mt-6 space-y-4">
              <button className="btn btn-primary w-full">Sign up</button>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline flex items-center justify-center w-full sm:w-1/2 dark:text-white"
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.lsGmVmOX789951j9Km8RagHaHa?rs=1&pid=ImgDetMain"
                    alt="Google Logo"
                    className="w-6 h-6 mr-2"
                  />
                  Google
                </button>
                <Link
                  to="/login"
                  className="btn btn-outline flex items-center justify-center w-full sm:w-1/2 dark:text-white"
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
