import EchoItem from "@/_components/EchoItem";
import Sidebar from "@/_components/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <body>
      <Sidebar />
      <main>
        <EchoItem />
      </main>
    </body>
  );
}
