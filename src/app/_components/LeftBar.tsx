// "use client";
// import { AuthProvider } from "@/_data/getLogin";
import Publish from "./Publish";
import SearchBar from "./SearchBar";

async function LeftBar() {
  return (
    <div className="hidden flex-col gap-4 lg:flex">
      <SearchBar />
      <Publish />
    </div>
  );
}

export default LeftBar;
