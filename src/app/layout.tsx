"use client";
import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/_utils/ReactQueryProvider";
import Publish from "@/_components/Publish";
import Sidebar from "@/_components/Sidebar";
import SearchBar from "@/_components/SearchBar";
import { AuthProvider } from "@/_data/getLogin";

// export const metadata: Metadata = {
//   title: "Echo",
//   description: "Share your posts to friends",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#BEFAF8] flex h-screen justify-between flex-1">
        <AuthProvider>
        <ReactQueryProvider>
          <div>
            <SearchBar />
            <Publish />
          </div>
            <main>{children}</main>
          <Sidebar />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
// - #445566
// - #FFFEF8
// - #FEDCO
// - #BEFAF8
// - #F3FFF9
// - #FAF8F1
// - #CC3355
// - | #EF7F31
