import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import GoogleButton from 'react-google-button'

import { auth } from '../firebase'

const style = {
    wrapper: `flex justify-center items-center h-full`, 
    message: `text-center text-gray-600 text-lg mb-4`, 
    signin: `flex justify-center`
}

const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Sign-in error:", error);
    }
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
