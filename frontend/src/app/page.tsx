import React from "react";
import ChatAppScreen from "@/screen/ChatAppScreen";
import { getFriends, getMessages } from "@/actions/apis";

const page = async () => {
  const res = await getFriends();
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center w-full">
      <ChatAppScreen friends={res?.data?.friends} />
    </div>
  );
};

export default page;
