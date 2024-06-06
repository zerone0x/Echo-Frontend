"use client";
import useLogin from "@/hooks/useLogin";
import React, { useState } from "react";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading, isError, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    mutate({ email, password });
  };
  return (
    <body className="text-center space-y-5">
      <h1 className="text-lg text-green-300">Come on in!</h1>
      <div className="flex flex-col">
        <button>Sign in with Google</button>

        <button>Sign in with Github</button>
      </div>
      <form className="flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          Let's go →
        </button>
        {isError && <p>Error: {error.response}</p>}
      </form>
    </body>
  );
}

export default login;
