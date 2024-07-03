"use client";
import { Metadata } from "next";
import SignInButton from "@/app/_components/SignInButton";
import { loginUser } from "@/app/_utils/actions";
import { useFormStatus } from "react-dom";
import { ToastContainer } from "react-toastify";
import SubmitButton from "@/app/_components/SubmitButton";

// export const metadata: Metadata = {
//   title: "Login",
// };

function Login() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <ToastContainer />
      <h2 className="text-3xl font-semibold">Come on in!</h2>
      <SignInButton />
      <form className="flex flex-col" action={loginUser}>
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" name="password" required />
        </label>
        <SubmitButton pendingLabel="Loading...">Let's go →</SubmitButton>
      </form>
    </div>
  );
}
export default Login;
