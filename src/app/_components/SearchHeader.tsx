function SearchHeader({ header, icon }) {
  return (
    <h3 className="flex w-full gap-3 border-y-2 p-4">
      {icon} {header}
    </h3>
  );
}

export default SearchHeader;
