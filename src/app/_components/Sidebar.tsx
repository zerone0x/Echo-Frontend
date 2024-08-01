"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { navLinks } from "../_config/data";

function Sidebar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex text-4xl sm:flex sm:items-center sm:justify-evenly md:flex-col md:items-start md:justify-start lg:flex-col lg:items-start lg:justify-start">
        <li className="hidden sm:hidden md:inline-block lg:inline-block">
          <Image
            src={logo}
            quality={100}
            alt="The Echo App Logo"
            width={70}
            height={70}
          />
        </li>
        {navLinks.map((link, index) => (
          <li key={`${link.name}-${index}`}>
            <Link
              className={`flex items-center gap-4 px-5 py-3 text-3xl font-semibold transition-colors hover:cursor-pointer ${pathname === link.href ? "text-blue-400" : "text-black"} `}
              href={link.href}
            >
              {link.icon}
              <span className="hidden lg:inline-block">{link.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
