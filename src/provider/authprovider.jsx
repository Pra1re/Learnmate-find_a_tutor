import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile,
    updateEmail,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const authcontext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
import axios from 'axios';

const Authprovider = ({ children }) => {


  const [user, setuser] = useState(null);
  const [photo, setphoto] = useState("");
  const [load, setload] = useState(true);
  const [mytutor,setmytutor]=useState([])
  const [book, setBook] = useState({});
  const [confirm, setconfirm] = useState({});
  const [preftutor,setpreftutor]=useState([]);

  const logout = () => {
    setload(true);
    signOut(auth)
      .then(() => {
        
      })
      .catch((error) => {
        
      });
  };
  
  const toggletheme=()=>{

    document.documentElement.classList.toggle("dark")

  }
  const login = (email, password) => {
    setload(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createuser = (email, password) => {
    setload(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (user, profileData) => {
    return updateProfile(user, profileData)
      .then(() => {
        setuser({ ...user, ...profileData });
      })
      .catch((error) => console.error("Error updating profile:", error));
  };
  const updateUserEmail = (user, newEmail) => {
    return updateEmail(user, newEmail)
        .then(() => {
            setuser({ ...user, email: newEmail });
        })
        .catch(error => console.error("Error updating email:", error));
};


const updateUserPassword = (user, newPassword) => {
    return updatePassword(user, newPassword)
        .catch(error => console.error("Error updating password:", error));
};
const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };
  
  const authinfo = {
    user,
    setuser,
    createuser,
    logout,
    login,
    load,
    setload,
    photo,
    setphoto,
    updateUserProfile, 
    updateUserEmail, 
    updateUserPassword,
    googleLogin,
    mytutor,
    setmytutor,
    book,
    setBook,
    confirm, 
    setconfirm,
    preftutor,
    setpreftutor,
    toggletheme,
  };

  



  useEffect(() => {
    const stay = onAuthStateChanged(auth, (currentuser) => {
      setuser(currentuser);
      console.log("set user = ",currentuser);
      if(currentuser?.email){
     const user={email:currentuser.email}
     axios.post('https://assignment-11-server-five-xi.vercel.app/jwt',user,{withCredentials:true})
     .then((res)=>{
      console.log("axios = ",res.data)
      setload(false);
    })

      }
      else{
        axios.post('https://assignment-11-server-five-xi.vercel.app/logout',{},{

          withCredentials:true

        })
        .then((res)=>{
          console.log("logout = ",res.data)
          setload(false);
        })
      }
      
    });
    return stay;
  }, []);

  return <authcontext.Provider value={authinfo}>{children}</authcontext.Provider>;
};

export default Authprovider;
