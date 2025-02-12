import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
import Tutors from './tutors';
import Firstbanner from './firstbanner';
import Stats from './stats';
import UserReviews from './review';
import WhyChooseUs from './why';
import PopularLanguages from './populerlang';






const Home = () => {
    return (
        <div >
            <Firstbanner></Firstbanner>
            <Stats></Stats>
            <Tutors/>
            <UserReviews></UserReviews>
            <PopularLanguages/>
            <WhyChooseUs></WhyChooseUs>
            
            
           
            
            

        </div>
    );
};

export default Home;