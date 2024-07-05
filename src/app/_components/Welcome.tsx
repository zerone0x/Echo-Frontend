import { useState } from "react";
import SignUpForm from "@/app/_components/SignUpForm";
import LoginForm from "@/app/_components/LoginForm";
import SignInButton from "./SignInButton";
import { BsTypeH1 } from "react-icons/bs";

function Welcome() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className=" max-w-3xl  mx-auto my-auto">
      <h1 className="text-3xl text-center py-2 font-semibold">Echo</h1>
      <div className="border border-gray-300 rounded-lg p-4 mt-10">
        <div className="flex gap-10 mt-10 items-center justify-center">
          <button
            className={`${activeTab === "login" ? "bg-[#675AF2] text-white" : "bg-white-400 text-black"} uppercase tracking-wide    rounded-2xl py-3 px-6`}
            onClick={() => setActiveTab("login")}
          >
            login
          </button>
          <button
            className={`${activeTab === "signup" ? "bg-[#675AF2] text-white" : "bg-white-400 text-black"} uppercase tracking-wide  rounded-2xl py-3 px-6`}
            onClick={() => setActiveTab("signup")}
          >
            sign up
          </button>
        </div>

        <div className="flex flex-col gap-10 mt-10 items-center justify-center">
          <h1 className="text-3xl font-semibold ">
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
