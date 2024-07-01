"use client";
import LeftBar from "@/app/_components/LeftBar";
import Sidebar from "@/app/_components/Sidebar";
import ReactQueryProvider from "@/app/_utils/ReactQueryProvider";
import { Roboto } from "next/font/google";
import { AuthProvider } from "../_utils/getLogin";

const lato = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export default function EchoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={` flex h-screen justify-between`}>
      {/* <ReactQueryProvider> */}
      <AuthProvider>
        <LeftBar />
        <main className="flex-1">{children}</main>
        <Sidebar />
      </AuthProvider>
      {/* </ReactQueryProvider> */}
    </div>
  );
}
