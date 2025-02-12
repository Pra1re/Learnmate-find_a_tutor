import { useContext, useEffect, useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authcontext } from "../provider/authprovider";

const Tutors = () => {
  const [services, setServices] = useState([]);
  const [bannerVisible, setBannerVisible] = useState(true);
  const MAX_CARDS = 9;
  const navigate=useNavigate;
  const{logout}=useContext(authcontext)
  useEffect(() => {
    axios
    .get("https://assignment-11-server-five-xi.vercel.app/category")
    .then((res) => {
      setServices(res.data);
    })
    .catch((err) => {
      console.error(err);
      if (err.response && err.response.status === 401) {
        logout();
        navigate('/login');
      }
    });
  }, []);
  const handleBannerClick = () => {
    setBannerVisible(false);
  };

  return (
    <div className=" mx-auto mb-20 dark:bg-gray-800 dark:w-[100%] py-1 dark:mt-12">
      {bannerVisible && (
        <div
          className={`md:w-[90%] w-[100%] dark:w-[100%] m-auto dark:bg-gray-900 dark:mb-0 banner-overlay flex items-center justify-center  h-[350px] text-white dark:text-white  rounded-none md:rounded-lg cursor-pointer shadow-lg transition-opacity duration-1000 ${
            bannerVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
          onClick={handleBannerClick}
        >
          <h1 className="text-5xl font-bold drop-shadow-lg">Find a Tutor</h1>
          
        </div>
      )}

      <div
        className={` grid gap-8  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
          bannerVisible ? "invisible h-0 " : "visible h-auto py-12 bg-gray-100 dark:bg-gray-700 px-4"
        } transition-all duration-1000`}
      >
        {services.slice(0, MAX_CARDS).map((service) => (
          <div key={service.id} className="flex justify-center">
            
            <Link
              to={`/data/${service.name}`}
              className="flex gap-4 items-center w-full max-w-sm bg-gray-200 dark:bg-black dark:text-white
              dark:hover:bg-gray-900 hover:bg-gray-200 p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <i className={service.image}></i>
              <div className="flex items-center justify-between  w-[90%]">
                <p className="text-xl font-semibold text-gray-800 dark:text-white">{service.name}</p>
                <i className="fa-solid fa-arrow-right text-lg text-gray-500 dark:text-white"></i>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;
