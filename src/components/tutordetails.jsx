import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './loading';
import Swal from 'sweetalert2';
import { authcontext } from '../provider/authprovider';
import axios from 'axios';

const Tutordetails = () => {
  const { id } = useParams(); 
  const [tutor, settutor] = useState(null);
  const [loading, setloading] = useState(true);
    const { mytutor, setmytutor } = useContext(authcontext);
      const {book, setBook,user} = useContext(authcontext)
      const navigate=useNavigate;
      const{logout}=useContext(authcontext)
  useEffect(() => {
    axios
  .get("https://assignment-11-server-five-xi.vercel.app/data", { withCredentials: true })
  .then((res) => {
    const found = res.data.find((s) => s._id === id);
    settutor(found);
    setloading(false);
  })
  .catch((err) => {
    console.error(err);
    if (err.response && err.response.status === 401) {
      logout()
      navigate('/login');
    }
  });

  }, [id]);


  




  if (loading) {
    return <Loading />;
  }

  if (!tutor) {
    return <p className="text-center text-gray-600">No tutor found with the given ID.</p>;
  }


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

  const handleBooking = async () => {
    console.log("Booking tutor with ID:", id);

    try {
        const updatedTutor = { ...tutor, booked: true };

        // POST request to add the booking
        const response = await axios.post("https://assignment-11-server-five-xi.vercel.app/book", updatedTutor, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Include credentials if required
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error("Failed to book the tutor");
        }

        // PUT request to update tutor data
        const response2 = await axios.put(`https://assignment-11-server-five-xi.vercel.app/data/${id}`, updatedTutor, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Include credentials if required
        });

        if (response2.status !== 200 && response2.status !== 201) {
            throw new Error("Failed to update tutor information");
        }

        Swal.fire("Success", "Tutor booked successfully!", "success");

        // Update state to reflect the booking
        setmytutor((prev) => [...prev, updatedTutor]);
        setBook((prev) => ({ ...prev, [id]: true }));

    } catch (error) {
        console.error("Error booking tutor:", error);

        // Handle unauthorized access
        if (error.response?.status === 401) {
            console.log("401 Unauthorized detected");
            logout();
            navigate("/login");
        } else {
            Swal.fire("Error", error.message || "An error occurred while booking", "error");
        }
    }
};





  return (
    <div className="mb-16 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-10">
      <div className="relative">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-full h-84 object-cover"
        />
        <h1 className="absolute bottom-4 left-4 text-white text-2xl font-bold bg-black bg-opacity-50 px-3 py-1 rounded">
          {tutor.name}
        </h1>
      </div>
      <div className="p-6">
        <p className="text-gray-700 dark:text-white text-lg">
          <span className="font-semibold">Language:</span> {tutor.language}
        </p>
        <p className="mt-2 text-gray-600 dark:text-white">{tutor.description}</p>
        <p className="mt-4 text-xl text-green-400 font-semibold">
          ${tutor.price}
        </p>
        <p className="mt-2 text-gray-700 dark:text-white">
          <span className="font-semibold">Email:</span> {tutor.tutorEmail}
        </p>
        <p className="mt-2 dark:text-white">
          <span
            className={`font-semibold ${
              tutor.activeSession ? "text-green-500" : "text-red-500"
            }`}
          >
            Active Session:
          </span>{" "}
          {tutor.activeSession ? "Yes" : "No"}
        </p>
        <p className="mt-2 text-gray-700 dark:text-white">
          <span className="font-semibold">Lessons Completed:</span>{" "}
          {tutor.lessonsCompleted}
        </p>
        <p className="mt-2 text-gray-700 dark:text-white">
          <span className="font-semibold">Duration:</span> {tutor.duration}
        </p>
        <p className="mt-2 text-yellow-500 font-semibold">
          <span className="font-semibold text-gray-700 dark:text-white">Rating:</span>{" "}
          {tutor.rating} / 5
        </p>
        <p className="mt-2 text-gray-700 dark:text-white">
          <span className="font-semibold">Max Students:</span>{" "}
          {tutor.maxStudents}
        </p>
        <p className="mt-2 text-gray-700 dark:text-white">
          <span className="font-semibold">Level:</span> {tutor.level}
        </p>
        <p className="mt-2 text-gray-700 dark:text-white mb-2">
          <span className="font-semibold">User Email:</span> {user.email}
        </p>
        <div className='flex justify-between mt-4'>
        <Link to={`/updateinfo/${id}`} className='btn btn-sm btn-primary '>Update</Link >
        <button
  className="btn btn-sm btn-primary"
  onClick={handleBooking}
  disabled={tutor.booked}
>
  {tutor.booked ? <span className="dark:text-gray-500">Booked</span>  : "Book"}
</button>

            <button
  className="btn btn-sm btn-primary"
  onClick={() => handleReview(tutor._id)}
>
  Review
</button></div>
      </div>


    </div>
  );
};

export default Tutordetails;
