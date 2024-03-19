import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import React from 'react'
import GoogleButton from 'react-google-button'

import { auth } from '../firebase'

const style = {
    wrapper: `flex justify-center items-center h-full`, 
    message: `text-center text-gray-600 text-lg mb-4`, 
    signin: `flex justify-center`
}

const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
}

const SignIn = () => {
    return (
        <div className={style.wrapper}>
            <div>
                <p className={style.message}>Sign in to join the chat!</p> 
                <div className={style.signin}>
                    <GoogleButton onClick={googleSignIn}/>
                </div>
            </div>
        </div>
    )
}

export default SignIn