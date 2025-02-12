import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { authcontext } from "../provider/authprovider";
import axios from "axios";

const Updateinfo = () => {
  const { user,logout } = useContext(authcontext);
  const { id } = useParams();
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    image: "",
    language: "",
    description: "",
    price: "",
    tutorEmail: "",
    activeSession: false,
    lessonsCompleted: "",
    duration: "",
    rating: "",
    maxStudents: "",
    level: "",
  });

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`https://assignment-11-server-five-xi.vercel.app/tutor/${id}`, { withCredentials: true });
        setFormData(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch tutor data";
        Swal.fire("Error", errorMessage, "error");

         logout();
         navigate('/login')
      }
    };
  
    fetchItemData();
  }, [id]);
  
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, ...updateData } = formData;

    try {
        // Update the primary data
        const response1 = await axios.put(`https://assignment-11-server-five-xi.vercel.app/data/${_id}`, updateData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        
        try {
            const response2 = await axios.put(`https://assignment-11-server-five-xi.vercel.app/mycol/${_id}`, updateData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (response2.status === 200) {
                console.log("Optional path updated successfully.");
            }
        } catch (error) {
            
            if (error.response?.status === 404) {
                console.warn("Optional path does not exist, skipping update.");
            } else {
                console.error("Error updating optional path:", error);
            }
        }

       
        if (response1.status === 200) {
            Swal.fire("Success", "Tutor information updated successfully!", "success");
        } else {
            Swal.fire("Error", "Failed to update tutor information", "error");
        }
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || "An error occurred while updating";
        Swal.fire("Error", errorMessage, "error");
    }
};

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-700 dark:text-white  shadow-md rounded-md mt-10 mb-20">
      <h2 className="text-2xl font-bold text-center mb-6">
        Update Tutor Information
      </h2>
      <form className="space-y-4 dark:text-white" onSubmit={handleSubmit}>
      {Object.keys(formData).map(
  (key) =>
    key !== "_id" && (
      <div key={key}>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-white  mb-2"
          htmlFor={key}
        >
          {key.charAt(0).toUpperCase() +
            key.slice(1).replace(/([A-Z])/g, " $1")}
        </label>
        {key === "description" ? (
          <textarea
            id={key}
            value={formData[key]}
            onChange={handleChange}
            className="dark:bg-gray-500 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
            disabled={["name", "tutorEmail", "review", "booked"].includes(key)}
          />
        ) : key === "activeSession" ? (
          <div>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
            ></label>
            <select
              id={key}
              value={formData[key]}
              onChange={(e) =>
                handleChange({
                  target: { id: key, value: e.target.value === "true" },
                })
              }
              className="dark:bg-gray-500 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={["name", "tutorEmail", "review", "booked"].includes(key)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        ) : (
          <input
            type={
              key === "price" ||
              key === "lessonsCompleted" ||
              key === "maxStudents"
                ? "number"
                : "text"
            }
            id={key}
            value={formData[key]}
            onChange={handleChange}
            className="dark:bg-gray-500 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            step={key === "rating" ? "0.1" : undefined}
            min={key === "rating" ? "1" : undefined}
            max={key === "rating" ? "5" : undefined}
            required
            disabled={["name", "tutorEmail", "review", "booked"].includes(key)}
          />
        )}
      </div>
    )
)}

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Updateinfo;
