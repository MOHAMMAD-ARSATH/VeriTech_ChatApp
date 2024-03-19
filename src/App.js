import React from 'react';
import { auth } from './firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth'

import Navbar from './components/Navbar.jsx'
import Chat from './components/Chat.jsx';
import SignIn from './components/SignIn';

const style = {
  appContainer: `max-w-[728px] mx-auto text-center`,
  sectionContainer: `flex flex-col h-[100vh] bg-gray-100 shadow-xl border relative`
}

const App = () => {

  const [user] = useAuthState(auth);

  return (
    <div className={style.appContainer}>
      <section className={style.sectionContainer}>
        <Navbar />
        {user ? <Chat /> : <SignIn />}
      </section>
    </div>
  )
}

export default App;