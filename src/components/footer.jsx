import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10">
            <div className="container mx-auto px-4">
                
                <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">
                    
                    <div className='lg:w-[30%]'>
                        <h3 className="text-lg font-bold mb-4 text-white">About Us</h3>
                        <p>
                            We are a leading platform for human language tutoring, connecting learners with expert tutors globally.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-blue-400">About</a></li>
                            <li><a href="/tutors" className="hover:text-blue-400">Find Tutors</a></li>
                            <li><a href="/contact" className="hover:text-blue-400">Contact Us</a></li>
                            <li><a href="/faq" className="hover:text-blue-400">FAQs</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
                        <p>Email: <a href="mailto:support@language-tutor.com" className="hover:text-blue-400">support@language-tutor.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="hover:text-blue-400">+1 234 567 890</a></p>
                        <p>Address: 123 Tutor Lane, Education City, USA</p>
                    </div>
                </div>
                
                <div className="flex justify-center space-x-4 mb-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-blue-600 text-white p-3 rounded-full">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-blue-400 text-white p-3 rounded-full">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-pink-500 text-white p-3 rounded-full">
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-blue-500 text-white p-3 rounded-full">
                        <FaLinkedinIn />
                    </a>
                </div>
                
                <div className="border-t border-gray-700 pt-6 text-center">
                    <p>&copy; {new Date().getFullYear()} Language Tutor. All rights reserved.</p>
                    <p>
                        <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a> | <a href="/terms" className="hover:text-blue-400">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
