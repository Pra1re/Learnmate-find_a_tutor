import React, { useContext, useEffect, useState } from 'react';
import { authcontext } from '../provider/authprovider';
import Loading from './loading';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const Myaddedtutors = () => {
  const [tutor, settutor] = useState([]);
  const [loading, setLoading] = useState(true);

  const { book, setBook } = useContext(authcontext);
  const { mytutor, setmytutor } = useContext(authcontext);
  const {logout} = useContext(authcontext)
const navigate=useNavigate()

  useEffect(() => {
    axios
    .get("https://assignment-11-server-five-xi.vercel.app/mycol", { withCredentials: true })
    .then((res) => {
      settutor(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      if (err.response && err.response.status === 401) {
        
        logout();
        navigate('/login');
      }
    });
  }, []);

  const handleBooking = (tutor) => {
    setmytutor((prev) => [...prev, tutor]);
    setBook((prev) => ({ ...prev, [tutor._id]: true }));
    Swal.fire({
      icon: 'success',
      title: 'Booked Successfully',
      text: `${tutor.name} has been added to your booked tutors.`,
    });
  };

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

  const dlt = (tutor) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to remove this tutor from your list?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, keep it",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`https://assignment-11-server-five-xi.vercel.app/mycol/${tutor._id}`, {
                    withCredentials: true,
                });

                if (response.status === 200 && response.data.message === "Tutor removed successfully") {
                   
                    setmytutor((prev) => prev.filter((item) => item._id !== tutor._id));

                    Swal.fire({
                        icon: "success",
                        title: "Removed",
                        text: "The tutor has been removed from your list.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed",
                        text: "There was an issue removing the tutor.",
                    });
                }
            } catch (err) {
                console.error("Error:", err);

                
                if (err.response?.status === 401) {
                    console.log("401 Unauthorized detected");
                    logout();
                    navigate("/login");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to remove the tutor.",
                    });
                }
            }
        }
    });
};



  if (loading) {
    return <Loading />;
  }

  if(tutor.length==0){

    return<div className=' mb-40 mt-40 text-center text-xl dark:text-white'>Currently no tutor is added by the user</div>
    
      }

      return (
        <div className="w-[95%] m-auto mt-24 text-center mb-40">
          <table className="min-w-full table-auto text-center hidden lg:table">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white text-center">
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Language</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Reviews</th>
                <th className="py-2 px-4">Lessons</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutor.map((tutor) => (
                <tr key={tutor._id} className="border-b dark:text-white text-center">
                  <td className="py-2 px-4">
                    <img
                      src={tutor.image}
                      alt={tutor.language}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{tutor.name}</td>
                  <td className="py-2 px-4">{tutor.language}</td>
                  <td className="py-2 px-4">${tutor.price}</td>
                  <td className="py-2 px-4">{tutor.description}</td>
                  <td className="py-2 px-4">{tutor.review || 0}</td>
                  <td className="py-2 px-4">{tutor.lessonsCompleted} Lessons</td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2 justify-center">
                      <Link to={`/updateinfo/${tutor._id}`} className="btn btn-sm btn-primary">
                        Update
                      </Link>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleReview(tutor._id)}
                      >
                        Review
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => dlt(tutor)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      
          {/* Stacked Layout for Small Screens */}
          <div className="block lg:hidden">
            {tutor.map((tutor) => (
              <div key={tutor._id} className="border-b dark:text-white mb-4 pb-4">
                <div className="flex justify-center mb-2">
                  <img
                    src={tutor.image}
                    alt={tutor.language}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                <p><strong>Name:</strong> {tutor.name}</p>
                <p><strong>Language:</strong> {tutor.language}</p>
                <p><strong>Price:</strong> ${tutor.price}</p>
                <p><strong>Description:</strong> {tutor.description}</p>
                <p><strong>Reviews:</strong> {tutor.review || 0}</p>
                <p><strong>Lessons:</strong> {tutor.lessonsCompleted} Lessons</p>
                <div className="flex gap-2 justify-center mt-2">
                  <Link to={`/updateinfo/${tutor._id}`} className="btn btn-sm btn-primary">
                    Update
                  </Link>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleReview(tutor._id)}
                  >
                    Review
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => dlt(tutor)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
      
};

export default Myaddedtutors;
