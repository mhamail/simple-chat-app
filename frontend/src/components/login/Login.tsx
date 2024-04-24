"use client";
import React, { useState } from "react";
import { authenticate, removeAuthenticate, signin } from "../../actions/auth";
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      removeAuthenticate("userData", "jwt");
      signin({ email, password }).then((response) => {
        authenticate(response.data, () => {
          router.replace("/");
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
        <h2 className="text-3xl font-semibold text-center">Login</h2>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
