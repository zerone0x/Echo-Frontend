"use client";
import LeftBar from "@/app/_components/LeftBar";
import Sidebar from "@/app/_components/Sidebar";
import ReactQueryProvider from "@/app/_utils/ReactQueryProvider";

export default function EchoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* <h1 className="text-red-500">fuckyou</h1> */}
      {children}
    </div>
  );
}
