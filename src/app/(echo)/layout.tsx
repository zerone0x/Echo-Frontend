"use client";
import LeftBar from "@/app/_components/LeftBar";
import Sidebar from "@/app/_components/Sidebar";
import ReactQueryProvider from "@/app/_utils/ReactQueryProvider";
import { AuthProvider } from "../_utils/getLogin";
import Header from "../_components/Header";
import { SearchProvider } from "../_utils/SearchContext";
import { PublishProvider } from "../_utils/getPublishType";

export default function EchoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <SearchProvider>
          <PublishProvider>
            <div className="grid h-screen gap-4 bg-[#F3FFF9] px-4 sm:grid-cols-[1fr_2fr_1fr] sm:gap-6 sm:px-6 md:grid-cols-[0.7fr_2fr_0.7fr] md:gap-8 md:px-8 lg:grid-cols-[0.7fr_2fr_0.7fr] lg:gap-8 lg:px-24">
              <div className="h-full overflow-hidden">
                <LeftBar />
              </div>

              <main className="overflow-scroll border-l-2 border-r-2">
                <Header />
                <div className="min-h-screen">{children}</div>
              </main>

              <div className="h-full overflow-hidden">
                <Sidebar />
              </div>
            </div>
          </PublishProvider>
        </SearchProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
