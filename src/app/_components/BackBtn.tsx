"use client";
import { useRouter } from "next/navigation";

function BackBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className=" text-white hover:text-[#675AF2] hover:underline"
    >
      Back
    </button>
  );
}

export default BackBtn;
