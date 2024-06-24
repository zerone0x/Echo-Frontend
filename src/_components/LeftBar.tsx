"use client";
import { AuthProvider } from "@/_data/getLogin";
import Publish from "./Publish";
import SearchBar from "./SearchBar";

function LeftBar() {
  return (
    <AuthProvider>
      <div>
        <SearchBar />
        <Publish />
      </div>
    </AuthProvider>
  );
}

export default LeftBar;
