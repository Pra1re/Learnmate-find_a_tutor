
import { createBrowserRouter } from "react-router-dom";

import Home from "../home";
 
import Layout from "../Layout";

import Login from "../login";
import Register from "../register";
import Privaterouter from "./privaterouter";
import Forget from "../forget";
import DynamicTitle from "../dynamictitle";
import NotFound from "../notfound";

import Updateinfo from "../updateinfo";
import Detailsbycat from "../detailsbycat";
import Addtutor from "../addtutor";
import Alldetail from "../alldetail";
import Tutordetails from "../tutordetails";
import Mybookedtutors from "../mybookedtutors";
import Myaddedtutors from "../myaddedtutors";


const Router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />, 
    children: [
      { path: "/", element:<DynamicTitle title="Home"> <Home /> </DynamicTitle>},
      {path:"/login",element:<DynamicTitle title="Login"><Login></Login></DynamicTitle>},
      {path:"/register",element:<DynamicTitle title="Register"><Register /></DynamicTitle>},
      {path: "/data/:id",element:<Privaterouter><DynamicTitle title="Category"><Detailsbycat /></DynamicTitle></Privaterouter>},
      {path: "/alltutor",element:<Privaterouter><DynamicTitle title="Tutors"><Alldetail /></DynamicTitle></Privaterouter>},
      {path: "/alltutor/data/tutor/:id",element:<Privaterouter><DynamicTitle title="Details"><Tutordetails /></DynamicTitle></Privaterouter>},
      {path: "/mytutor/tutor/:id",element:<Privaterouter><DynamicTitle title="Details"><Tutordetails /></DynamicTitle></Privaterouter>},
      {path: "/data/:language/tutor/:id",element:<Privaterouter><DynamicTitle title="Details"><Tutordetails /></DynamicTitle></Privaterouter>},
      {path: "/mybook",element:<Privaterouter><DynamicTitle title="Booking"><Mybookedtutors /></DynamicTitle></Privaterouter>},
      {path: "/myaddedtutor",element:<Privaterouter><DynamicTitle title="Mytutor"><Myaddedtutors /></DynamicTitle></Privaterouter>},
      {path:"/forget",element:<Forget />},
      //data/German/tutor
    
        {path:"/addtutor",element:<Privaterouter><DynamicTitle title="Contribute"><Addtutor/></DynamicTitle></Privaterouter>},

        {path:"/updateinfo/:id",element:<Privaterouter><DynamicTitle title="UpdateInfo"><Updateinfo/></DynamicTitle></Privaterouter>},


      {
        path: "*",
        element:<DynamicTitle title="NotFound"><NotFound /></DynamicTitle>, 
    
    
      },
    ],



  },


  
]);

export default Router;
