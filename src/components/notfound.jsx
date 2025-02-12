import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <h2 className="text-4xl font-bold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
