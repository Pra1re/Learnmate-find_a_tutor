import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { authcontext } from "../provider/authprovider";

const Layout = () => {
  const [array, setArray] = useState([]); 
  const {toggletheme}=useContext(authcontext)

  const handleAddTrainer = (trainer) => {
    setArray((prevArray) => [...prevArray, trainer]);
  };

  return (
    <div className="dark:bg-black">
      <Navbar />
      <Outlet/> 
      <Footer />
    </div>
  );
};

export default Layout;
