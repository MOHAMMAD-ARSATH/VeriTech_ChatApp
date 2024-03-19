import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";
import LogOut from "./LogOut";

const style = {
  nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
  heading: `text-white text-3xl font-semibold tracking-wide uppercase italic`,
};

const Navbar = () => {
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <div className={style.nav}>
      <h1 className={style.heading}>chat app</h1>
      {user ? <LogOut /> : null}
    </div>
  );
};

export default Navbar;