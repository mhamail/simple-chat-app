"use client";
import { getMessages } from "@/actions/apis";
import ChatApp from "@/components/chatapp/Chatapp";
import React, { useState, useEffect } from "react";

const ChatAppScreen = ({ friends }: any) => {
  const [recieverId, setRecieverId] = useState<any>("");
  const [messages, setMessages] = useState<any>("");
  // console.log(messages);

  const handleRecieverId = async (id: any) => {
    setRecieverId(id);
    let res: any = await getMessages(id);
    console.log(res);
    // setMessages(res.da);
  };
  return (
    <div className="flex w-full">
      <div className="w-1/12 my-10 flex justify-center">
        <div className="flex flex-col items-end">
          {friends?.map((item: any) => (
            <div
              key={item._id}
              onClick={() => handleRecieverId(item._id)}
              className="border mt-2 p-2 cursor-pointer"
            >
              {item.userName.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      <div className="w-11/12">
        <ChatApp
          // @ts-ignore
          recieverId={recieverId}
        />
      </div>
    </div>
  );
};

export default ChatAppScreen;
