"use client";
import LeftBar from "@/app/_components/LeftBar";
import Sidebar from "@/app/_components/Sidebar";
import ReactQueryProvider from "@/app/_utils/ReactQueryProvider";
import { AuthProvider } from "../_utils/getLogin";
import Header from "../_components/Header";

export default function EchoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <div className="grid h-screen grid-cols-[auto_1fr_auto] gap-4">
          <div className="h-full overflow-hidden">
            <LeftBar />
          </div>

          <main className="overflow-scroll">
            <Header />
            {children}
          </main>

          <div className="h-full overflow-hidden">
            <Sidebar />
          </div>
        </div>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
