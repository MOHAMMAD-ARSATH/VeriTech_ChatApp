import React from "react";

import { auth } from "../firebase";

const style = {
  messageWrapper: `flex items-center py-3 px-3 relative w-full`,
  message: `shadow-xl py-3 px-3 break-all max-w-[50%] mt-7`,
  textStyle: `overflow-wrap break-word text-left`,
  name: `text-gray-600 text-xs italic`,
  sent: `bg-[#456FFF] text-white float-right rounded-xl`,
  received: `bg-[#e5e5ea] text-black float-left rounded-xl`,
  timestamp: `text-xs text-gray-500 mt-1 text-end italic`,
  date: `text-md text-gray-800 absolute top-0 left-1/2 transform -translate-x-1/2 italic mt-3`,
};

const Message = ({ message, prevMessageDate }) => {
  const isSentByCurrentUser = message.uid === auth.currentUser.uid;
  const messageClass = isSentByCurrentUser
    ? `${style.sent}`
    : `${style.received}`;

  const nameStyle = isSentByCurrentUser
    ? `${style.name} text-white`
    : style.name;
  const timestampStyle = isSentByCurrentUser
    ? `${style.timestamp} text-white`
    : style.timestamp;

  // Convert timestamp object to string
  const messageDate =
    message.timestamp && message.timestamp.toDate().toDateString();
  const messageTime =
    message.timestamp &&
    message.timestamp
      .toDate()
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Determine whether to show the date based on the comparison with the previous message's date
  const showDate = messageDate !== prevMessageDate;

  return (
    <div
      className={`${style.messageWrapper} ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {showDate && <p className={style.date}>{messageDate}</p>}
      <div className={`${style.message} ${messageClass}`}>
        <div>
          <p className={nameStyle}>
            {isSentByCurrentUser ? "You" : message.name}
          </p>
          <p className={style.textStyle}>{message.text}</p>
        </div>
        <p className={timestampStyle}>{messageTime}</p>
      </div>
    </div>
  );
};

export default Message;