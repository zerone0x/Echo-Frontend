"use client";

import NotFound from "./not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
};

// Only can catch errors that happened in rendering but not in callback function
// Cant catch errors in root layout
export default function Error({ error, reset }) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
