"use client";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { logOut } from "../_services/fetchDataAPI";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignOut}>
      <button
        type="submit"
        className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full"
        disabled={isLoading}
      >
        <FaArrowRightFromBracket className="h-5 w-5 text-primary-600" />
        <span>{isLoading ? "Signing out..." : "Sign out"}</span>
      </button>
    </form>
  );
}

export default SignOutButton;
