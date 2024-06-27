import LeftBar from "@/_components/LeftBar";
import Sidebar from "@/_components/Sidebar";
import ReactQueryProvider from "@/_utils/ReactQueryProvider";
import { Roboto } from "next/font/google"; // 添加字体导入

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
    <div
      className={`${lato.className} bg-[#BEFAF8] flex h-screen justify-between`}
    >
      <ReactQueryProvider>
        <LeftBar />
        <main className="flex-1">{children}</main>
        <Sidebar />
      </ReactQueryProvider>
    </div>
  );
}
