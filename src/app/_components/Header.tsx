"use client";
import { usePathname } from "next/navigation";
import { navLinks } from "../_config/data";
import Link from "next/link";

function Header() {
  const pathname = usePathname();
  console.log(pathname);
  const item = navLinks.filter((link) => link.href === pathname);
  console.log(item);

  if (item.length === 0) {
    return null;
  }
  return (
    <Link
      className={`fixed top-0  text-black p-4 z-10 bg-white w-full py-3 px-5  transition-colors flex items-center gap-4 font-semibold text-primary-800 text-3xl ${
        pathname === item[0].href ? "text-blue-400" : "text-primary-800"
      }`}
      href={item[0].href}
    >
      {item[0].icon}
      <span>{item[0].name}</span>
    </Link>
  );
}

export default Header;
