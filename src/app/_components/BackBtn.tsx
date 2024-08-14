"use client";

import { useRouter } from "next/navigation";
function BackBtn() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 w-full border-b-2 bg-[#FAF8F1] p-4">
      <div className="top-mid-header">
        <button
          onClick={() => router.back()}
          className="text-black hover:text-[#675AF2] hover:underline"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default BackBtn;
