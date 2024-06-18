import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import Publish from "@/_components/Publish";
import Sidebar from "@/_components/Sidebar";
import SearchBar from "@/_components/SearchBar";

export const metadata: Metadata = {
  title: "Echo",
  description: "Share your posts to friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <div>
          <SearchBar />
          <Publish />
        </div>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
        <Sidebar />
      </body>
    </html>
  );
}
