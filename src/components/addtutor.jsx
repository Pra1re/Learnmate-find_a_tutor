import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { authcontext } from '../provider/authprovider';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Addtutor = () => {
    const { user, preftutor, setpreftutor, logout } = useContext(authcontext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        language: '',
        description: '',
        price: '',
        tutorEmail: user?.email || '',
        activeSession: true,
        lessonsCompleted: '',
        duration: '',
        rating: '',
        maxStudents: '',
        level: '',
        review: 0, // Default value for review
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: id === 'review' || id === 'price' || id === 'rating' || id === 'lessonsCompleted' || id === 'maxStudents'
                ? parseFloat(value) || 0
                : id === 'activeSession'
                ? e.target.checked
                : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://assignment-11-server-five-xi.vercel.app/data', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.status === 200 || response.status === 201) {
                Swal.fire('Success', 'Tutor added successfully!', 'success');

                const newTutor = { ...formData };
                setpreftutor((prev) => [...prev, newTutor]);

                setFormData({
                    name: '',
                    image: '',
                    language: '',
                    description: '',
                    price: '',
                    tutorEmail: user?.email || '',
                    activeSession: true,
                    lessonsCompleted: '',
                    duration: '',
                    rating: '',
                    maxStudents: '',
                    level: '',
                    review: 0, // Reset review to default value
                });
            } else {
                throw new Error('Failed to add tutor');
            }
        } catch (err) {
            Swal.fire('Invalid token');
            if (err.response && err.response.status === 401) {
                logout();
                navigate('/login');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 dark:text-white bg-gray-100 shadow-md rounded-md mt-10 mb-20 dark:bg-gray-700">
            <h2 className="text-2xl font-bold text-center mb-6">Add Preferred Tutor</h2>
            <form className="space-y-4 dark:text-white" onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2 dark:text-white"
                            htmlFor={key}
                        >
                            {key
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                        {key === 'description' ? (
                            <textarea
                                id={key}
                                placeholder={`Enter ${key}`}
                                value={formData[key]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                                rows="4"
                                required
                            />
                        ) : key === 'activeSession' ? (
                            <select
                                id={key}
                                value={formData[key] ? 'Yes' : 'No'}
                                onChange={(e) =>
                                    handleChange({ target: { id: key, value: e.target.value === 'Yes' } })
                                }
                                className="dark:bg-gray-600 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        ) : (
                            <input
                                type={
                                    key === 'price' ||
                                    key === 'rating' ||
                                    key === 'lessonsCompleted' ||
                                    key === 'maxStudents' ||
                                    key === 'review' // Include review as a number input
                                        ? 'number'
                                        : 'text'
                                }
                                id={key}
                                placeholder={`Enter ${key}`}
                                value={formData[key]}
                                onChange={handleChange}
                                className="dark:bg-gray-600 dark:text-white w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={key !== 'level'}
                            />
                        )}
                    </div>
                ))}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Add Tutor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Addtutor;
