import React from "react";
import Login from "@/components/login/Login";

const page = () => {
  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="shadow-lg p-10">
            <Login/>
        </div>
      </div>
    </div>
  );
};

export default page;
