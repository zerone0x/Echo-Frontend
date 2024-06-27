// "use client";
// import { AuthProvider } from "@/_data/getLogin";
import { showCurrUser } from "@/_services/fetchDataAPI";
import Publish from "./Publish";
import SearchBar from "./SearchBar";

async function LeftBar() {
  const CurrentUser = await showCurrUser();
  console.log(CurrentUser);
  return (
    // <AuthProvider>
    <div>
      <SearchBar />
      {/* <Publish /> */}
    </div>
  );
}

export default LeftBar;
