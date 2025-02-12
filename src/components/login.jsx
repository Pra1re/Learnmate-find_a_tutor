import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authcontext } from "../provider/authprovider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login, setuser, googleLogin } = useContext(authcontext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        setuser(user);
        toast.success("Successfully logged in!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("Wrong credentials!"); 
      });
  };

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

  return (
    <div className="hero min-h-screen bg-base-200 dark:bg-gray-800">
      <div className="hero-content flex flex-col lg:flex-row items-center justify-between lg:gap-16 w-full px-4 md:px-16">
        {/* Welcome Section */}
        <div className="text-center lg:text-left lg:max-w-md mb-8 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold dark:text-white">Welcome Back!</h1>
          <p className="py-6 text-gray-600 dark:text-gray-300">
            Sign in to continue your journey. Access your account and explore all the features that help you stay connected,
            productive, and informed. If you're new, feel free to create an account and get started.
          </p>
        </div>

        {/* Login Form */}
        <div className="card w-full max-w-sm p-6 bg-base-100 shadow-lg rounded-lg dark:bg-gray-900">
          <form onSubmit={handlesubmit} className="space-y-6">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                required
              />
              <label className="label">
                <Link
                  to="/forget"
                  state={{ email: email }}
                  className="label-text-alt link link-hover dark:text-blue-400"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            {/* Buttons */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full mb-4">Login</button>
              <div className="flex justify-between gap-4 w-[95%]">
                {/* Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline w-1/2 flex items-center justify-center dark:text-white"
                >
                  <img
                    src="https://th.bing.com/th/id/OIP.lsGmVmOX789951j9Km8RagHaHa?rs=1&pid=ImgDetMain"
                    alt="google-logo"
                    className="w-6 h-6 mr-2"
                  />
                  Google
                </button>

                {/* Sign Up Link */}
                <Link to="/register" className="btn btn-outline w-1/2 flex items-center justify-center dark:text-white">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
