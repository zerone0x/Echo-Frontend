"use client";
import LeftBar from "@/app/_components/LeftBar";
import Sidebar from "@/app/_components/Sidebar";
import ReactQueryProvider from "@/app/_utils/ReactQueryProvider";
import { AuthProvider } from "../_utils/getLogin";

export default function EchoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-[auto_1fr_auto]">
      <ReactQueryProvider>
        <AuthProvider>
          <div className=" h-full overflow-hidden">
            <LeftBar />
          </div>

          <main className="    overflow-scroll">{children}</main>

          <div className="    h-full overflow-hidden">
            <Sidebar />
          </div>
        </AuthProvider>
      </ReactQueryProvider>
    </div>
  );
}
