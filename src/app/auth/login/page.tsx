"use client"; // Ensure this directive is placed correctly
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ThirdAuth from "@/_components/thirdAuth";
import useLogin from "@/_hooks/useLogin";
import { AuthProvider } from "@/_data/getLogin";

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
          router.push("/home");
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      },
    );
  };

  return (
    <AuthProvider>
      <div className="bg-rainbow-gradient text-center space-y-5">
        <h1 className="text-lg text-green-300">Come on in!</h1>
        <ThirdAuth />
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
