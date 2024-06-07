"use client";
import useRegister from "@/hooks/useRegister";
import React, { useState } from "react";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { mutate, isLoading, isError, error } = useRegister();

  const handleRegister = async (e) => {
    e.preventDefault();
    mutate({ email, password, name });
  };
  function handleGoogleSignUp() {
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_URL;
  }
  function handleGithubSignUp() {
    window.location.href = process.env.NEXT_PUBLIC_GITHUB_URL;
  }

  return (
    <body className="text-center space-y-5">
      <h1 className="text-lg text-green-300">Sign up for Chatter</h1>
      <div className="flex flex-col">
        <button onClick={handleGoogleSignUp}>Sign up with Google</button>

        <button onClick={handleGithubSignUp}>Sign up with Github</button>
      </div>
      <form className="flex flex-col" onSubmit={handleRegister}>
        <label htmlFor="name">
          Your full name
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Your email address
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          A secret password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          Create a Chatter account
        </button>
      </form>
      {isError && (
        <p className="text-red-500">{error?.message || "An error occurred"}</p>
      )}
    </body>
  );
}

export default SignUp;
