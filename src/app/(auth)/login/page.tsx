"use client";
import { useState } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import ThirdAuth from "@/_components/thirdAuth";
import useLogin from "@/_hooks/useLogin";
import { AuthProvider } from "@/_data/getLogin";
import { Metadata } from "next";
import SignInButton from "@/_components/SignInButton";
import { authUserLogin } from "@/_services/fetchDataAPI";

// export const metadata: Metadata = {
//   title: "Login",
// };

function Login() {
  const handleLogin = async (e) => {
    console.log(e.target);
    const email = e.target.email.value;
    const password = e.target.password.value;
    await authUserLogin(email, password);
  };
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">Come on in!</h2>
      <SignInButton />
      <form className="flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" name="password" required />
        </label>
        <button type="submit">Let's go →</button>
      </form>
    </div>
  );
}
export default Login;
