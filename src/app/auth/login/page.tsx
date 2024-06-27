"use client"; // Ensure this directive is placed correctly
import { useState } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import ThirdAuth from "@/_components/thirdAuth";
import useLogin from "@/_hooks/useLogin";
import { AuthProvider } from "@/_data/getLogin";
import { Metadata } from "next";
import SignInButton from "@/_components/SignInButton";

// export const metadata: Metadata = {
//   title: "Login",
// };

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutate, isLoading, isError, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: (response) => {
          redirect("/home");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      },
    );
  };

  return (
    <AuthProvider>
      {/* <div className="bg-rainbow-gradient text-center space-y-5">
        <h1 className="text-lg text-green-300"></h1> */}
      <div className="flex flex-col gap-10 mt-10 items-center">
        <h2 className="text-3xl font-semibold">Come on in!</h2>
        <SignInButton />
        <form className="flex flex-col" onSubmit={handleLogin}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={isLoading}>
            Let's go →
          </button>
          {isError && (
            <p>
              Error: {error?.response?.data?.message || "An error occurred"}
            </p>
          )}
        </form>
      </div>
    </AuthProvider>
  );
}

export default Login;
