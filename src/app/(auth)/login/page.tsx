"use client";
import { Metadata } from "next";
import SignInButton from "@/app/_components/SignInButton";
import { loginUser } from "@/app/_utils/actions";
import { useFormStatus } from "react-dom";
import { ToastContainer } from "react-toastify";
import SubmitButton from "@/app/_components/SubmitButton";
import LoginForm from "@/app/_components/LoginForm";

// export const metadata: Metadata = {
//   title: "Login",
// };

function Login() {
  return <LoginForm />;
}
export default Login;
