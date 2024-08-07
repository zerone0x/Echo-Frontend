"use client";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { logOut } from "../_services/fetchDataAPI";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await logOut();
      localStorage.removeItem("user");
      router.push("/");
      toast.success("Logout successfully");
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
        className="flex w-full items-center gap-4 px-5 py-3 text-3xl font-semibold text-primary-800 transition-colors"
        disabled={isLoading}
      >
        <FaArrowRightFromBracket />
        <span className="hidden lg:inline-block">
          {isLoading ? "Signing out..." : "Sign out"}
        </span>
      </button>
    </form>
  );
}

export default SignOutButton;
