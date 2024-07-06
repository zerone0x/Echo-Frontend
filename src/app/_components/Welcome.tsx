import { useState } from "react";
import SignUpForm from "@/app/_components/SignUpForm";
import LoginForm from "@/app/_components/LoginForm";
import SignInButton from "./SignInButton";
import { BsTypeH1 } from "react-icons/bs";

function Welcome() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="mx-auto my-auto max-w-3xl">
      <h1 className="py-2 text-center text-3xl font-semibold">Echo</h1>
      <div className="mt-10 rounded-lg border border-gray-300 p-4">
        <div className="mt-10 flex items-center justify-center gap-10">
          <button
            className={`${activeTab === "login" ? "bg-[#675AF2] text-white" : "bg-white-400 text-black"} rounded-2xl px-6 py-3 uppercase tracking-wide`}
            onClick={() => setActiveTab("login")}
          >
            login
          </button>
          <button
            className={`${activeTab === "signup" ? "bg-[#675AF2] text-white" : "bg-white-400 text-black"} rounded-2xl px-6 py-3 uppercase tracking-wide`}
            onClick={() => setActiveTab("signup")}
          >
            sign up
          </button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-10">
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
