function SearchHeader({
  header,
  icon,
}: {
  header: string;
  icon: React.ReactNode;
}) {
  return (
    <h3 className="flex w-full gap-3 border-y-2 bg-[#F0FFF0] p-4">
      {icon} {header}
    </h3>
  );
}

export default SearchHeader;
