"use client";
function SearchBar() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Echo"
        className="w-full rounded-full px-4 py-2 text-sm  placeholder:text-stone-800 transition-all duration-300 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-[#5648c4] "
      />
    </form>
  );
}

export default SearchBar;
