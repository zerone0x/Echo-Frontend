import { useState } from "react";
import SignUpForm from "@/app/_components/SignUpForm";
import LoginForm from "@/app/_components/LoginForm";
import SignInButton from "./SignInButton";

function Welcome() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="text-3xl">Echo</header>
      <div className="border border-gray-300 rounded-lg p-4 mt-10">
        <div className="flex gap-10 mt-10 items-center justify-center">
          <button
            className="bg-[#675AF2] text-white rounded-2xl py-3 px-6"
            onClick={() => setActiveTab("login")}
          >
            login
          </button>
          <button
            className="bg-[#675AF2] text-white rounded-2xl py-3 px-6"
            onClick={() => setActiveTab("signup")}
          >
            signup
          </button>
        </div>

        <div className="flex flex-col gap-10 mt-10 items-center justify-center">
          <h1 className="text-3xl font-semibold">
            {activeTab === "login" ? "Come on in!" : "Sign up for Echo"}
          </h1>
          <SignInButton />
          {activeTab === "login" ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
