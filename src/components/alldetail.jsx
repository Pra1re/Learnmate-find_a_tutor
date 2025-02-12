import React, { useContext, useEffect, useState } from 'react';
import Loading from './loading';
import { Link, useNavigate } from 'react-router';
import { authcontext } from '../provider/authprovider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alldetail = () => {
  const { mytutor, setmytutor } = useContext(authcontext);
  const [tutor, settutor] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { book, setBook, logout } = useContext(authcontext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://assignment-11-server-five-xi.vercel.app/data", { withCredentials: true })
      .then((res) => {
        settutor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          toast.error("Token mismatch Detected");
          logout();

          navigate('/login');
        }
      });
  }, []);

  const handleBooking = async (service) => {
    try {
      const updatedService = { ...service, booked: true };
      await axios.post('https://assignment-11-server-five-xi.vercel.app/book', updatedService, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      await axios.put(`https://assignment-11-server-five-xi.vercel.app/data/${service._id}`, updatedService, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      Swal.fire('Success', 'Tutor booked successfully!', 'success');
      setmytutor((prev) => [...prev, service]);
      setBook((prev) => ({ ...prev, [service._id]: true }));
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        toast.error("Token mismatch Detected")
        navigate('/login');
      } else {
        console.error('Error during booking:', error);
        Swal.fire('Error', error.message, 'error');
      }
    }
  };

  const handleReview = async (tutorId) => {
    try {
      await axios.put(`https://assignment-11-server-five-xi.vercel.app/review/${tutorId}`, {}, {
        headers: { 'Content-Type': 'application/json' },
      });

      Swal.fire('Success', 'Review count incremented for tutor.', 'success');
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        console.error('Error adding review:', err);
        Swal.fire('Error', 'Failed to add review.', 'error');
      }
    }
  };

 
  const filteredTutors = tutor.filter((t) =>
    t.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-[95%] m-auto mt-8 mb-16 " >
      
      <div className="mb-6 w-[50%] mt-4 ml-auto ">
        <input
          type="text"
          placeholder="Search by language..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="dark:bg-gray-900 dark:text-white w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      
      <div className="flex flex-wrap gap-6 lg:justify-between justify-center">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="p-2 dark:bg-gray-800 w-full max-w-sm flex flex-col justify-between rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={tutor.image}
                alt={tutor.language}
                className="w-full h-[350px] rounded-[12px] object-top object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{tutor.name}</h2>
                <p className="text-gray-500 dark:text-white text-sm mt-2">
                  {tutor.language} - {tutor.level}
                </p>
                <p className="text-gray-700 dark:text-white mt-2">{tutor.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-green-400 font-semibold">
                    ${tutor.price}
                  </span>
                  <span className="text-yellow-500">Rating: {tutor.rating}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm dark:text-white">
                    {tutor.lessonsCompleted} Lessons
                  </span>
                  <span className="text-sm text-gray-600 dark:text-white">{tutor.duration}</span>
                </div>
              </div>
              <div className="flex justify-between py-2 bg-gray-100 dark:bg-gray-800 px-4">
                <Link to={`data/tutor/${tutor._id}`} className="btn btn-sm btn-primary">
                  Details
                </Link>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleBooking(tutor)}
                  disabled={book[tutor._id] || tutor.booked}
                >
                  {book[tutor._id] || tutor.booked ? <span className="dark:text-gray-500">Booked</span>  : "Book"}
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleReview(tutor._id)}
                >
                  Review
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-white text-center w-full">No tutors found for the selected language.</p>
        )}
      </div>
    </div>
  );
};

export default Alldetail;
