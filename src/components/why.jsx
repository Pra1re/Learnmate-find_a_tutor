import React from 'react';
import { FaUserTie, FaClock, FaWallet, FaChalkboardTeacher } from 'react-icons/fa';

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaUserTie className="text-blue-500 text-4xl" />,
            title: "Expert Tutors",
            description: "Learn from certified and experienced language professionals.",
        },
        {
            icon: <FaClock className="text-green-500 text-4xl" />,
            title: "Flexible Scheduling",
            description: "Book lessons at a time that works for you, 24/7 availability.",
        },
        {
            icon: <FaWallet className="text-yellow-500 text-4xl" />,
            title: "Affordable Pricing",
            description: "Quality education at prices that fit your budget.",
        },
        {
            icon: <FaChalkboardTeacher className="text-purple-500 text-4xl" />,
            title: "Interactive Learning",
            description: "Engage with live lessons, quizzes, and real-world practice.",
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-800 py-12 mb-12">
            <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                Why Choose Us?
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
                Discover the benefits of learning with us. Our platform is designed to help you achieve your goals efficiently and enjoyably.
            </p>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 text-center"
                    >
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="font-bold text-lg mb-2 dark:text-white">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
