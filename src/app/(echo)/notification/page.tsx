import Content from "@/app/_components/Content";
import Header from "@/app/_components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification",
};

function page() {
  return (
    <>
      <Content>
        <Header title="Notification" />
      </Content>
    </>
  );
}

export default page;
