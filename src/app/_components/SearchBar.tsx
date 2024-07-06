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
        className="w-full rounded-full px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-[#5648c4] focus:ring-opacity-50"
      />
    </form>
  );
}

export default SearchBar;
