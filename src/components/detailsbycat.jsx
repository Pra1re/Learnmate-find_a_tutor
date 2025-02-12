import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./loading";
import "../index.css";
import { authcontext } from "../provider/authprovider";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
const Detailsbycat = () => {
  const { id } = useParams();
  const [service, setService] =useState([])
  const [loading, setLoading] = useState(true);
  const { mytutor, setmytutor,logout } = useContext(authcontext);
    const [tutor, settutor] = useState([]);
    const {book, setBook} = useContext(authcontext)
    const navigate=useNavigate
const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios
  .get("https://assignment-11-server-five-xi.vercel.app/data", { withCredentials: true })
  .then((res) => {
    const foundService = res.data.filter((s) => s.language === id);
    console.log("Found service:", foundService);
    setService(foundService);
    setLoading(false);
  })
  .catch((err) => {
    console.error("Error fetching service details:", err);
    setLoading(false);
    if (err.response && err.response.status === 401) {
     
      logout();
      navigate('/login');
    }
  });
  }, [id]);
  console.log("service = ", service);
  if (loading) {
    return <Loading />;
  }
  const handleBooking = async (service) => {
    try {
        const updatedService = { ...service, booked: true };
        
        // Send the booking request
        await axios.post('https://assignment-11-server-five-xi.vercel.app/book', updatedService, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });

        // Update the service data
        await axios.put(`https://assignment-11-server-five-xi.vercel.app/data/${service._id}`, updatedService, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });

        Swal.fire('Success', 'Tutor booked successfully!', 'success');
        
        // Update the state with the new booking
        setmytutor((prev) => [...prev, service]);
        setBook((prev) => ({ ...prev, [service._id]: true }));
    } catch (error) {
        // Handle errors, including unauthenticated users
        if (error.response?.status === 401) {
            logout();
            navigate('/login');
        } else {
            console.error('Error during booking:', error);
            Swal.fire('Error', error.message, 'error');
        }
    }
};


  if (!service) {
    return <p>Service details not found</p>;
  }
  

  const filteredTutors = service.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );





  const handleReview = async (tutorId) => {
    try {
        const response = await axios.put(`https://assignment-11-server-five-xi.vercel.app/review/${tutorId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
  
        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Review Added',
                text: `Review count incremented for tutor.`,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.data?.error || 'Failed to add review.',
            });
        }
    } catch (err) {
        if (err.response?.status === 401) {
            console.log('401 Unauthorized detected');
            logout();
            navigate('/login');
        } else {
            console.error('Error adding review:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response?.data?.error || 'Failed to add review.',
            });
        }
    }
  };

        if(loading){
          <Loading></Loading>
        }

  return (

<div className="w-[95%] m-auto mb-16">
  <div className="mb-6 w-[50%] mt-4 ml-auto">
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    <div className="flex flex-wrap gap-6  mt-8 justify-center lg:justify-between">
      {filteredTutors.map((service) => (
        <div key={service._id} className="p-2 dark:bg-gray-800 flex flex-col justify-between w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={service.image}
            alt={service.language}
            className="w-full h-[350px] rounded-[12px] object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {service.name}
            </h2>
            <p className="text-gray-500 dark:text-white text-sm mt-2">
              {service.language} - {service.level}
            </p>
            <p className="text-gray-700 dark:text-white mt-2">{service.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-green-400 font-semibold">
                ${service.price}
              </span>
              <span className="text-yellow-500">Rating: {service.rating}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-gray-600 dark:text-white">
                {service.lessonsCompleted} Lessons
              </span>
              <span className="text-sm text-gray-600 dark:text-white">{service.duration}</span>
            </div>
          </div>
          <div className="flex justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800">
          <Link to={`tutor/${service._id}`} className="btn btn-sm btn-primary">
              Details
            </Link>
            <button
  className="btn btn-sm btn-primary "
  onClick={() => handleBooking(service)}
  disabled={book[service._id] || service.booked}
>
  {book[service._id] || service.booked ? <span className="dark:text-gray-500">Booked</span> : "Book"}
</button>
<button
  className="btn btn-sm btn-primary"
  onClick={() => handleReview(service._id)}
>
  Review
</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Detailsbycat;
