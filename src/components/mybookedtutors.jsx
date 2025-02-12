import React, { useContext, useEffect, useState } from 'react';
import { authcontext } from '../provider/authprovider';
import Swal from 'sweetalert2';
import Loading from './loading';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Mybookedtutors = () => {
  const { confirm, setconfirm,logout } = useContext(authcontext);
  const [load, setload] = useState(true);
  const [mytutor, setmytutor] = useState([]);
const navigate =useNavigate;
  useEffect(() => {
    axios
    .get("https://assignment-11-server-five-xi.vercel.app/book", { withCredentials: true })
    .then((res) => {
      setmytutor(res.data);
      setload(false);
    })
    .catch((err) => {
      console.error(err);
      if (err.response && err.response.status === 401) {
        
        logout();
        navigate('/login');
      }
    });
  }, []);

  if (load) {
    return <Loading />;
  }

  if(mytutor.length==0){

return<div className=' mb-40 mt-40 text-center text-xl dark:text-white'>Currently no tutor available in booking list</div>

  }

  const handleconfirm = (mytutor) => {
    setconfirm((prev) => ({ ...prev, [mytutor._id]: true }));
    Swal.fire({
      icon: 'success',
      title: 'Booking Confirmed',
      text: `Your booking has been confirmed with ${mytutor.name}.`,
    });
  };

  const rmv = async (mytutor) => {
    const updatedtutor = { ...mytutor, booked: false };
    console.log('Deleting tutor with ID:', mytutor._id);
  
    try {
      
      const response = await axios.put(
        `https://assignment-11-server-five-xi.vercel.app/data/${mytutor._id}`,
        updatedtutor,
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
  
      if (response.status == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Booking removed',
          text: `Successfully removed this teacher`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.error || 'Booking removal failed',
        });
      }
    } catch (err) {
      console.error('You alreay confirmed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You confirmed for final booking.',
      });
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this tutor from your list?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          
          const deleteResponse = await axios.delete(
            `https://assignment-11-server-five-xi.vercel.app/book/${mytutor._id}`,
            { withCredentials: true }
          );
  
          if (deleteResponse.data.message === 'Tutor removed successfully') {
            setmytutor((prev) => prev.filter((tutor) => tutor._id !== mytutor._id));
            Swal.fire({
              icon: 'success',
              title: 'Removed',
              text: 'The tutor has been removed from your list.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'There was an issue removing the tutor.',
            });
          }
        } catch (err) {
          console.error('Error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to remove the tutor.',
          });
        }
      }
    });
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




  
  return (
    <div className="flex flex-wrap gap-6 lg:justify-between justify-center md:w-[95%] m-auto mt-8">
      {mytutor.map((mytutor) => (
        <div
          key={mytutor._id}
          className={`p-2 dark:bg-gray-700  w-full max-w-sm flex flex-col justify-between rounded-lg shadow-lg overflow-hidden ${
            confirm[mytutor._id] ? 'opacity-50' : 'opacity-100'
          }`}
        >
          <img
            src={mytutor.image}
            alt={mytutor.language}
            className="w-full h-[350px] rounded-[12px] object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {mytutor.name}
            </h2>
            <p className="text-gray-500 text-sm mt-2 dark:text-white">
              {mytutor.language} - {mytutor.level}
            </p>
            <p className="text-gray-700 dark:text-white mt-2">{mytutor.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-green-400 font-semibold">
                ${mytutor.price}
              </span>
              <span className="text-yellow-500">Rating: {mytutor.rating}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-gray-600 dark:text-white">
                {mytutor.lessonsCompleted} Lessons
              </span>
              <span className="text-sm text-gray-600 dark:text-white">{mytutor.duration}</span>
            </div>
          </div>
          <div className="flex justify-between py-2 bg-gray-100 dark:bg-gray-700 px-4">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleconfirm(mytutor)}
              disabled={confirm[mytutor._id]}
            >
              {confirm[mytutor._id] ? 'Confirmed' : 'Confirm'}
            </button>
            <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleReview(mytutor._id)}
                >
                  Review
                </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => rmv(mytutor)}
              disabled={confirm[mytutor._id]}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mybookedtutors;
