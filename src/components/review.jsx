import React, { useEffect, useState } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

const UserReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://assignment-11-server-five-xi.vercel.app/review')
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-700 py-24 mb-24">
            <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                What Our Users Say
            </h2>
            <div className="relative overflow-hidden">
                <div className="marquee">
                    <div className="marquee-content flex">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-600 shadow-md rounded-lg p-4 m-2 w-80 flex-shrink-0"
                            >
                                <div className="flex items-center mb-2">
                                    <h3 className="font-bold text-lg dark:text-white">
                                        {review.name}
                                    </h3>
                                    {review.verified && (
                                        <FaCheckCircle className="text-green-500 ml-2" />
                                    )}
                                </div>
                                <div className="flex items-center mb-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar
                                            key={i}
                                            className={
                                                i < Math.round(review.rating)
                                                    ? 'text-yellow-500'
                                                    : 'text-gray-300'
                                            }
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {review.description}
                                </p>
                            </div>
                        ))}
                        
                        {reviews.map((review, index) => (
                            <div
                                key={`${index}-duplicate`}
                                className="bg-white dark:bg-gray-600 shadow-md rounded-lg p-4 m-2 w-80 flex-shrink-0"
                            >
                                <div className="flex items-center mb-2">
                                    <h3 className="font-bold text-lg dark:text-white">
                                        {review.name}
                                    </h3>
                                    {review.verified && (
                                        <FaCheckCircle className="text-green-500 ml-2" />
                                    )}
                                </div>
                                <div className="flex items-center mb-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar
                                            key={i}
                                            className={
                                                i < Math.round(review.rating)
                                                    ? 'text-yellow-500'
                                                    : 'text-gray-300'
                                            }
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {review.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .marquee {
                    display: flex;
                    align-items: center;
                    overflow-x: hidden;
                    position: relative;
                }

                .marquee-content {
                    display: flex;
                    animation: scroll 250s linear infinite;
                }

                @keyframes scroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-100%);
                    }
                }
            `}</style>
        </div>
    );
};

export default UserReviews;
