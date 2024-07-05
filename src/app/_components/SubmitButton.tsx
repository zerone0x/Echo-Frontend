"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-[#675AF2] rounded-full px-8 py-3 text-white font-semibold  transition-all disabled:cursor-not-allowed disabled:bg-gray-500 "
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
