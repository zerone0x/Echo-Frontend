// "use client";
// import { AuthProvider } from "@/_data/getLogin";
import Publish from "./Publish";
import SearchBar from "./SearchBar";

async function LeftBar() {
  return (
    <div>
      <SearchBar />
      <Publish />
    </div>
  );
}

export default LeftBar;
