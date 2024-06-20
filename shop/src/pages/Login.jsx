import React from 'react'
import { githubLogo, googleLogo } from '../assets'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../redux/Slice';

function Login() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleGoogleLogin(e){
      e.preventDefault();
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(addUser({
          _id : user.uid,
          name: user.displayName,
          email: user.email,
          iamge: user.photoURL,
        })
        )
        setTimeout(() => {
          navigate("/")
        }, 1500);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
  });
}

  function handleSignOut(){
    signOut(auth).then(() => {
      toast.success('Log out successfully');
      dispatch(removeUser())
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className='w-full flex flex-col items-center justify-center gap-10 py-20'>
        <div className='w-full flex items-center justify-center gap-10'>
            <div onClick={handleGoogleLogin} className='text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:hover:border-blue-600 cursor-pointer duration-300'>
               <img className='w-8' src = {googleLogo} alt="googleLogo"/>
               <span className='text-sm text-gray-900'>Sign in with Google</span>
            </div>
            <button onClick={handleSignOut} className='bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 durTION-300'>Sign Out</button>
        </div>
{/* 
        <div className='w-full flex items-center justify-center gap-10'>
            <div className='text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:hover:border-blue-600 cursor-pointer duration-300'>
               <img className='w-8' src = {githubLogo} alt="googleLogo"/>
               <span className='text-sm text-gray-900'>Sign in with Github</span>
            </div>
            <button className='bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 durTION-300'>Sign Out</button>
        </div> */}
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
    </div>
  )
}

export default Login