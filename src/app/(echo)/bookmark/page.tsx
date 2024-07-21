import BookMark from "@/app/_components/BookMark";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookMark",
};

function BookmarkPage() {
  return <BookMark />;
}

export default BookmarkPage;
