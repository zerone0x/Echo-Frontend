"use client";
import useRegister from "@/_hooks/useRegister";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { mutate, isLoading, isError, error } = useRegister();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    mutate(
      { email, password, name },
      {
        onSuccess: (response) => {
          router.push("/home"); // Correctly redirect using router
        },
        onError: (error) => {
          console.error("Register failed:", error);
        },
      },
    );
  };
  function handleGoogleSignUp() {
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_URL;
  }
  function handleGithubSignUp() {
    window.location.href = process.env.NEXT_PUBLIC_GITHUB_URL;
  }

  return (
    <body className="bg-rainbow-gradient text-center space-y-5">
      <h1 className="text-lg text-green-300">Sign up for Echo</h1>
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
          Create a Echo account
        </button>
      </form>
      {isError && (
        <p className="text-red-500">{error?.message || "An error occurred"}</p>
      )}
    </body>
  );
}

export default SignUp;
