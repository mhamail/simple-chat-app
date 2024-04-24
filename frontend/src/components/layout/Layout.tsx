"use client"
import React, { useEffect } from "react";
import { isAuth } from "@/actions/auth";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
// console.log(isAuth())
  useEffect(() => {
    if (!isAuth()) {
      router.push("/auth/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default Layout;