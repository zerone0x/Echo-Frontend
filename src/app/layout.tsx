import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { FaPen } from "react-icons/fa6";
import Link from "next/link";
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
      <body className={`${lato.className} min-h-screen w-full text-stone-900`}>
        {children}
        <Link
          href={`/publish`}
          className="fixed bottom-1/10 right-1/10 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 lg:hidden"
        >
          <FaPen />
        </Link>
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
// - #EF7F31
