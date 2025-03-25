import { useRef, useState} from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/fireBase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACK_IMG, LOGO_URL } from "../utils/constants";


const Login = () => {

const[isSignInForm, setIsSignInForm]= useState(true);
const[errorMessage, setErrorMessage] = useState(null);

const dispatch = useDispatch();

const email = useRef(null);
const password = useRef(null);
    

const handleButtonClick = ()=>{
    //validate the form data

   const message= checkValidData(email.current.value, password.current.value);
   setErrorMessage(message);
   if(message) return;

   if(!isSignInForm){
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)

  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(auth.user, {
      displayName: "name.current.value", photoURL:{LOGO_URL}
    })
    .then(() => {
      //update store once again
      const { uid, email, displayname, photoURL }= auth.currentUser; //auth will have the updated value
        dispatch(addUser({uid: uid, email: email, displayname: displayname, photoURL: photoURL}));
      // Profile updated!
      
    }).catch((error) => {
      // An error occurred
      setErrorMessage(error.message);
    });
    
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ errorMessage);
  });
   } else{
     //signin signup
     signInWithEmailAndPassword(auth,email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + errorMessage);
  });

   }
 
};

const toggleSignInForm = ()=>{
    setIsSignInForm(!isSignInForm);
    };

  return (
    <div>
      <Header/>
      <div className="absolute">
      <img src={BACK_IMG}
      alt="logo"/>
    </div> 

      <form onSubmit={(e) => e.preventDefault()} 
      className="w-full md:w-3/12 p-12 bg-black absolute my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">

      <h1 
      className="font-bold text-3xl py-4">
      {isSignInForm ? "Sign In": "Sign Up"}
      </h1>

      {!isSignInForm && <input type="test" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700"/> }

      <input ref={email}
      type="text" 
      placeholder="Email Address" 
      className="p-4 my-4 w-full bg-gray-700"
      />

      <input ref={password} 
      type="password" 
      placeholder="Password" 
      className="p-4 my-4 w-full bg-gray-700"
      />

      <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        
      <button 
      className="p-4 my-6 bg-red-800 w-full rounded-lg" 
      onClick={handleButtonClick}>
      {isSignInForm ? "Sign In": "Sign Up"}
      </button>

      <p className="py-4 cursor-pointer" 
      onClick={toggleSignInForm}>
      {isSignInForm ? "New to Netflix? Sign Up Now": "Already a  registered? Sign In Now"}
      </p>

      </form>
    </div>
  )
};

export default Login;
