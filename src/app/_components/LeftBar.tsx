import Publish from "./Publish";
import SearchBar from "./SearchBar";

async function LeftBar() {
  return (
    <div className="ml-auto hidden max-w-64 flex-col gap-4 lg:flex">
      <SearchBar />
      <Publish isPage={false} />
    </div>
  );
}

export default LeftBar;
