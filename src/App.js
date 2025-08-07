import { auth } from './firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth'

import Navbar from './components/Navbar.jsx'
import Chat from './components/Chat.jsx';
import SignIn from './components/SignIn';

const style = {
  appContainer: `max-w-[728px] mx-auto text-center`,
  sectionContainer: `flex flex-col h-[100vh] bg-gray-100 shadow-xl border relative`,
  loadingContainer: `flex flex-col items-center justify-center h-screen text-gray-500 text-lg gap-4`,
  spinner: `w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin`,
};

const App = () => {

 const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.spinner}></div>
        <p>Loading app...</p>
      </div>
    );
  }

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
