import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <Analytics />
        <SpeedInsights />
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
