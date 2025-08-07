import { auth } from "../firebase";

const style = {
  button: `bg-gray-200 px-4 py-2 hover:bg-gray-100 rounded-xl shadow-md transition duration-300 ease-in-out font-semibold`,
};

const LogOut = () => {
  const signOut = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      auth.signOut();
    }
  };

  return (
    <button onClick={signOut} className={style.button}>
      Logout
    </button>
  );
};

export default LogOut;
