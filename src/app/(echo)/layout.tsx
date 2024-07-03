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
    <div className="flex h-screen">
      <ReactQueryProvider>
        <AuthProvider>
          <div className="flex-none w-1/6 md:w-1/5 lg:w-1/6 bg-gray-200 h-full overflow-hidden">
            <LeftBar />
          </div>

          <main className="flex-1 w-4/6 md:w-3/5 lg:w-4/6 bg-white  overflow-auto">
            {children}
          </main>

          <div className="flex-none w-1/6 md:w-1/5 lg:w-1/6 bg-gray-200 h-full overflow-hidden">
            <Sidebar />
          </div>
        </AuthProvider>
      </ReactQueryProvider>
    </div>
  );
}
