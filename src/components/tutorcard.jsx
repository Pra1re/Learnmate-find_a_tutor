import React from 'react';

const Tutorcard = () => {
    return (
        <div className="w-full max-w-sm m-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <img 
        src={service.image} 
        alt={service.language} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
        <p className="text-gray-500 text-sm mt-2">{service.language} - {service.level}</p>
        <p className="text-gray-700 mt-2">{service.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-green-600 font-semibold">${service.price}</span>
          <span className="text-yellow-500">Rating: {service.rating}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-sm text-gray-600">{service.lessonsCompleted} Lessons</span>
          <span className="text-sm text-gray-600">{service.duration}</span>
        </div>
      </div>
      <div className="flex justify-center py-2 bg-gray-100">
        <a 
          href={`mailto:${service.tutorEmail}`} 
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Contact Tutor
        </a>
      </div>
    </div>
    );
};

export default Tutorcard;