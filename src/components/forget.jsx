import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forget = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    sendPasswordResetEmail(auth, email)
      .then(() => {
        
        toast.success("Password reset email sent! Please check your inbox.");
      
        window.location.href = "https://mail.google.com/";
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          toast.error("Invalid email address.");
        } else if (error.code === 'auth/user-not-found') {
          toast.error("No user found with this email.");
        } else {
          toast.error("Error sending reset email. Please try again.");
        }
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 shadow-2xl">
          <form className="card-body w-[fit-content]" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered w-[500px]"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forget;
