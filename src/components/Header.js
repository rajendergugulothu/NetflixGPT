import React from 'react'
import { auth } from '../utils/fireBase';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,} from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, LOGO_URL, SUP_LAN } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store =>store.user);

  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {  
        const {uid, email, displayname, photoURL }= user;
        dispatch(addUser({uid: uid, email: email, displayname: displayname, photoURL: photoURL}));
        navigate ("/browse");
      }
      else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

   


//unsubscribe when component unmounts
    return ()=> unsubscribe();

  },[]);



  const handleGptSearchClick = ()=>{
    //toggle gpt search
    dispatch(toggleGptSearchView());

  };


  const handleLanguageChange = (e)=>{
   dispatch(changeLanguage(e.target.value));

  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b z-10 flex flex-col md:flex-row md:justify-between">
      <img  className="w-44 mx-auto md:mx-0" src={LOGO}
      alt="logo"/>

    {user && 
    <div className="flex p-2 justify-between">
      {showGptSearch && (
      <select className="p-2 bg-gray-900 text-white m-2 rounded-lg" onChange={handleLanguageChange}>
        {SUP_LAN.map((lang) => (<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
      ))} 
      </select>
    )}
      
      <button className="py-2 px-4 mx-4 my-2 bg-red-700 text-white rounded-lg"
      onClick={handleGptSearchClick}>

        {showGptSearch? "Homepage": "GPT Search"}
        </button>

        <img className="w-12 h-12" alt="usericon" src={LOGO_URL}/>
        <button onClick={handleSignOut}
        className="font-bold text-white">Sign Out</button>
      </div>}
    </div>
  )
};

export default Header;
