import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

import Message from "./Message";
import { db } from "../firebase";
import SendMessage from "./SendMessage";

const style = {
  main: `
    flex flex-col p-[10px] relative 
    overflow-y-auto max-h-[calc(100vh - 80px)] 
    scrollbar-width-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-5 overflow-hidden`,
  loading: `flex flex-col items-center justify-center text-gray-500 text-lg pt-10 gap-4`,
  spinner: `w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin`,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesData);
      setLoading(false);
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
        {loading ? (
          <div className={style.loading}>
            <div className={style.spinner}></div>
            <p>Loading chat messages...</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              prevMessageDate={
                index > 0
                  ? messages[index - 1].timestamp?.toDate().toDateString()
                  : null
              }
            />
          ))
        )}
      </main>
      <SendMessage scrollToBottom={scrollToBottom} />
    </>
  );
};

export default Chat;
