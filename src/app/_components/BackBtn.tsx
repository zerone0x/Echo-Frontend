"use client";
import { useRouter } from "next/navigation";

function BackBtn() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="back-btn">
      Back
    </button>
  );
}

export default BackBtn;
