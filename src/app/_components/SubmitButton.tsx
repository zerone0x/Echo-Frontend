"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="rounded-full bg-[#675AF2] px-8 py-3 font-semibold tracking-wide text-white transition-all disabled:cursor-not-allowed disabled:bg-gray-500"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
