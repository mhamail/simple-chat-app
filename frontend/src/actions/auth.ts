import axios from "axios";
// import Cookies from 'js-cookie';
import { setCookie, deleteCookie, getCookie } from "cookies-next";
interface User {
  username?: string;
  email: string;
  password: string;
}

// Authentication functions
export const signin = (user: User) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_AUTH}/messenger/user-login`,
    user
  );
};

export const signup = (user: User) => {
  return axios.post(`${process.env.NEXT_PUBLIC_AUTH}/auth/signup`, user);
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    deleteCookie(key);
  }
};

export const accessToken = getCookie("authToken");

// Local storage functions
export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const removeAuthenticate = (localStorageKey: string, token: string) => {
  removeLocalStorage(localStorageKey);
  removeCookie(token);
};

// Authentication helper functions
export const authenticate = (data: any, next: () => void) => {
  setCookie("authToken", data.token);
  setLocalStorage("userData", data.checkUser);
  next();
};

export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("authToken");
    if (cookieChecked) {
      if (localStorage.getItem("userData")) {
        return JSON.parse(localStorage.getItem("userData")!);
      }
    }
  }
};
