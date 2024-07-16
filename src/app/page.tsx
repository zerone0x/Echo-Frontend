"use client";
import Welcome from "./_components/Welcome";
import { Metadata } from "next";

export default async function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F1]">
      <Welcome />
    </div>
  );
}
