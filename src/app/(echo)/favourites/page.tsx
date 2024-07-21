import Favorite from "@/app/_components/Favorite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite",
};

function FavoritePage() {
  return <Favorite />;
}

export default FavoritePage;
