"use client";
import { useEffect } from "react";
import Loading from "./loading";
import { redirect } from "next/navigation";

export default function App() {
  useEffect(() => {
    redirect("/home");
  }, []);

  return <Loading />;
}
