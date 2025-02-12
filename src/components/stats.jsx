import React, { useContext, useEffect, useState } from 'react';
import Loading from './loading';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { authcontext } from '../provider/authprovider';

const Stats = () => {
  const [tutor, setutor] = useState([]);
  const [load, setload] = useState(true);
  const [lang, setlang] = useState([]);
  const navigate = useNavigate;
  const { logout } = useContext(authcontext);

  useEffect(() => {
    axios
      .get("https://assignment-11-server-five-xi.vercel.app/dataforcat")
      .then((res) => {
        setutor(res.data);
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

  let x = 0;
  tutor.forEach((t) => {
    x += Number(t.review) || 0;
  });

  const distinctLanguages = new Set();
  tutor.forEach((t) => {
    if (t.language) {
      distinctLanguages.add(t.language);
    }
  });
  const distinctLanguageCount = distinctLanguages.size;

  useEffect(() => {
    fetch("https://assignment-11-server-five-xi.vercel.app/category")
      .then((response) => response.json())
      .then((data) => setlang(data));
    setload(false);
  }, []);

  if (load) {
    return <Loading></Loading>;
  }

  console.log("data in stats = ", tutor);
  const stats = {
    tutors: tutor.length,
    reviews: x,
    languages: distinctLanguageCount,
    users: tutor.length * 24,
  };

  const totalTutors = 500;
  const totalReviews = 2500;
  const totalLanguages = 50;
  const totalUsers = 1500;

  return (
    <div className="w-[90%] dark:w-[100%] m-auto mt-16 dark:bg-gray-900 dark:text-gray-200 py-24">
      <h1 className="text-center mb-8 font-bold text-5xl dark:text-gray-100">Statistics</h1>

      <p className="text-center text-lg text-gray-600 mb-16 w-[100%] md:w-[70%] m-auto dark:text-gray-300">
        Here's a quick look at the key statistics behind our platform. These numbers reflect the growing
        community and the value we are delivering to our users.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 dark:w-[95%] m-auto">
        {/* Tutors */}
        <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Tutors</h3>
          <p className="text-xl font-bold text-blue-500">{stats.tutors}</p>
          <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded-lg mt-2">
            <div
              className="bg-blue-500 h-4 rounded-lg"
              style={{ width: `${(stats.tutors / totalTutors) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-2">Professional tutors ready to guide you through your learning journey.</p>
        </div>

        {/* Reviews */}
        <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Reviews</h3>
          <p className="text-xl font-bold text-green-500">{stats.reviews}+</p>
          <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded-lg mt-2">
            <div
              className="bg-green-500 h-4 rounded-lg"
              style={{ width: `${(stats.reviews / totalReviews) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-2">Hundreds of reviews from satisfied learners. Join the community!</p>
        </div>

        {/* Languages */}
        <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Languages</h3>
          <p className="text-xl font-bold text-purple-500">{stats.languages}</p>
          <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded-lg mt-2">
            <div
              className="bg-purple-500 h-4 rounded-lg"
              style={{ width: `${(stats.languages / totalLanguages) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-2">Explore tutoring options in a variety of languages to match your learning needs.</p>
        </div>

        {/* Users */}
        <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Users</h3>
          <p className="text-xl font-bold text-red-500">{stats.users}+</p>
          <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded-lg mt-2">
            <div
              className="bg-red-500 h-4 rounded-lg"
              style={{ width: `${(stats.users / totalUsers) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-2">Join a growing number of learners benefiting from our services.</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
