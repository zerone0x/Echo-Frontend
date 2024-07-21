"use client";

import NotFound from "./not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
};

// Only can catch errors that happened in rendering but not in callback function
// Cant catch errors in root layout
export default function Error({ error, reset }: { error: any; reset: any }) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button className="btn" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
