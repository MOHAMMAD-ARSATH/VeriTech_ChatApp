import React, { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

import Message from "./Message";
import { db } from "../firebase";
import SendMessage from "./SendMessage";

const style = {
  main: `
    flex flex-col p-[10px] relative 
    overflow-y-auto max-h-[calc(100vh - 80px)] 
    scrollbar-width-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-5 overflow-hidden`,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const mainRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesData);
      scrollToBottom();
    });
    return unsubscribe;
  }, []);

  const scrollToBottom = () => {
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  };

  return (
    <>
      <main ref={mainRef} className={style.main}>
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            prevMessageDate={
              index > 0
                ? messages[index - 1].timestamp.toDate().toDateString()
                : null
            }
          />
        ))}
      </main>
      <SendMessage scrollToBottom={scrollToBottom} />
    </>
  );
};

export default Chat;