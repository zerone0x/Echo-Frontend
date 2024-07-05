"use client";
import React, { useState } from "react";
import { Metadata } from "next";
import SignUpForm from "@/app/_components/SignUpForm";
import LoginForm from "@/app/_components/LoginForm";

// export const metadata: Metadata = {
//   title: "Sign up",
// };
function SignUp() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="align-center">
      <div>
        <button onClick={() => setActiveTab("login")}>login</button>
        <button onClick={() => setActiveTab("signup")}>signup</button>
      </div>
      {activeTab === "login" ? <LoginForm /> : <SignUpForm />}
    </div>
  );
}
export default SignUp;
