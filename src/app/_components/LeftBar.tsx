import Publish from "./Publish";
import SearchBar from "./SearchBar";

async function LeftBar() {
  return (
    <div className="hidden lg:ml-auto lg:flex lg:max-w-64 lg:flex-col lg:gap-4">
      <SearchBar />
      <Publish isPage={false} />
    </div>
  );
}

export default LeftBar;
