import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/app/_utils/ReactQueryProvider";
import Publish from "@/app/_components/Publish";
import Sidebar from "@/app/_components/Sidebar";
import SearchBar from "@/app/_components/SearchBar";
import { AuthProvider } from "@/app/_data/getLogin";
import { Roboto } from "next/font/google";
import LeftBar from "@/app/_components/LeftBar";
const lato = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Echo",
    default: "Echo",
  },
  description:
    "Use Echo social app to express your thoughts and connect with others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-[#BEFAF8] `}>{children}</body>
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
// - #EF7F31
