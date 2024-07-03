function Header({ title }) {
  return (
    <header className="fixed top-0 w-4/6 md:w-3/5 lg:w-4/6 bg-blue-500 text-white p-4 z-10  ">
      {title}
    </header>
  );
}

export default Header;
