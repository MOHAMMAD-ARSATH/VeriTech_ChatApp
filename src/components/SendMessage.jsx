import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../firebase";

const style = {
  sendForm: `mt-7`,
  form: `h-14 w-full max-w-[728px] flex text-xl absolute bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[25%] bg-gray-300`,
};

const SendMessage = ({ scrollToBottom }) => {
  const [input, setInput] = useState("");

  const sendMsg = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please provide a valid message to proceed!");
      return;
    }
    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: input,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scrollToBottom();
  };

  return (
    <div className={style.sendForm}>
      <form className={style.form} onSubmit={sendMsg}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={style.input}
          type="text"
          placeholder="Message"
        />
        <button className={style.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;