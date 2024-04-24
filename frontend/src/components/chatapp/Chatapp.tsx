"use client";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { isAuth } from "@/actions/auth";
import { getCookie } from "cookies-next";
// const socket = io(`${process.env.NEXT_PUBLIC_SOCKET}`);

const ChatApp: React.FC = ({ recieverId, message }: any) => {
  const auth = isAuth();
  const authToken = getCookie("authToken");
  const [messages, setMessages] = useState<string[]>(message ?? []);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  // const socket:any = useRef();
  // console.log(socket.current)
  //   useEffect(()=>{
  //     socket.current = io(`ws://localhost:8000`)
  //   },[])
  useEffect(() => {
    const newSocket = io("ws://localhost:8000");
    newSocket.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // console.log(socket);

  const data: any = {
    senderId: auth?._id,
    senderName: auth?.userName,
    recieverId,
  };

  const sendMessage = async () => {
    data.message = inputMessage;

    try {
      // Send the message to the backend via HTTP request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH}/messenger/send-message`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authToken in the Authorization header
          },
        }
      );

      // If the HTTP request is successful, emit the message via WebSocket
      if (response) {
        socket.emit("sendMessage", inputMessage);
        setInputMessage(""); // Clear the input message field
      } else {
        // Handle the case where the HTTP request fails
        console.error("Failed to send message via HTTP");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto shadow-md p-2 shadow-blue-500">
      <div className="flex flex-col justify-between h-[calc(100vh-20px)]">
        <div className="overflow-y-auto text-white py-10 p-5">
          {messages?.length === 0 ? (
            <h2>No Message</h2>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                {msg}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 border rounded-lg mr-2 focus:outline-none text-black"
          />
          <button
            onClick={() => sendMessage()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
