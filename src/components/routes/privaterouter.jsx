import React, { useContext } from 'react';
import { Navigate, useLocation, useOutletContext } from 'react-router-dom';
import { authcontext } from '../../provider/authprovider';
import Loading from '../loading';

const Privaterouter = ({children}) => {
    
    const {user,load,setload}=useContext(authcontext)
    const location=useLocation()
    console.log("location in private route = ",location,location.pathname)

    if(load){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children
    }
    

    return (
        <Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default Privaterouter;