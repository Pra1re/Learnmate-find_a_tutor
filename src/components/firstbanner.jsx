import { motion } from "framer-motion";
import { Link } from "react-router";

const Firstbanner = () => {
  return (
    <div className="bg-gray-900 dark:bg-black">

      <div className="w-[92%] m-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-900 pb-16 pt-12 md:pb-36 md:pt-20 dark:bg-black">
      
      <motion.div
        className="w-full md:w-[35%] relative hidden md:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          style={{
            borderTopLeftRadius: "50px",
            borderBottomRightRadius: "50px",
            zIndex: 10,
          }}
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt=""
          className="w-[330px] h-96 translate-x-4 object-cover relative"
        />
        <div
          className="text-white w-[70%] mt-[-190px] mr-[30px] h-[200px] opacity-40 absolute left-[25%]"
          style={{
            borderBottomRightRadius: "50px",
            zIndex: 5,
          }}
        >
          <img
            src="https://th.bing.com/th/id/OIP.QDOrGZALDEVfk-jz8Gr1YgHaGD?rs=1&pid=ImgDetMain"
            alt=""
            style={{
              borderBottomRightRadius: "50px",
            }}
          />
        </div>
      </motion.div>
  
      
      <motion.div
        className="px-4 pb-8 md:pb-12 ml-0 md:pl-[50px] w-full md:w-[70%]"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-bold text-2xl md:text-5xl leading-normal mb-2 text-white">
          Connect with Expert Language Tutors
        </h1>
        <p className="mt-2 text-sm md:text-lg text-white">
          Master the art of communication with personalized one-on-one sessions
          in English, French, Spanish, and more. Our tutors are here to guide
          you in learning new languages effectively, whether for professional
          growth, travel, or personal development.
        </p>
        <Link
          to="/alltutor"
          className="block shadow-md shadow-yellow-600 w-[100px] md:w-[110px] py-1 bg-yellow-400 text-slate-800 mt-6 rounded-3xl text-center text-sm md:text-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-500"
        >
          Explore
        </Link>
      </motion.div>
      </div>
    </div>
  );
  
};

export default Firstbanner;
