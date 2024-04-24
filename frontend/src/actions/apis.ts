"use server";
import axios from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { hasCookie } from "cookies-next";

export const getFriends = () => {
  const authToken = getCookie("authToken", { cookies });
  if (authToken) {
    return axios.get(`${process.env.NEXT_PUBLIC_AUTH}/messenger/get-friends`, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the authToken in the Authorization header
      },
    });
  }
};

export const getMessages = async (id: any) => {
  try {
    const authToken = getCookie("authToken", { cookies });
    if (!authToken) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH}/messenger/get-message/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
