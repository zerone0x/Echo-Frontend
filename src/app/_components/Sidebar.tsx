"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { navLinks } from "../_config/data";
import UserAvator from "./UserAvator";
import { useAuth } from "../_utils/getLogin";

function Sidebar() {
  const pathname = usePathname();
  const { authData } = useAuth();
  return (
    <div className="flex sm:touch-pan-x sm:items-center sm:justify-center sm:overflow-x-auto sm:whitespace-nowrap md:flex-col md:items-center md:justify-center lg:flex-col lg:items-start lg:justify-center">
      <Image
        src={logo}
        quality={100}
        alt="The Echo App Logo"
        width={70}
        height={70}
        className="hidden sm:hidden md:inline-block md:text-center lg:inline-block"
      />
      <nav className="flex text-4xl sm:flex sm:items-center sm:justify-evenly sm:pt-0 md:flex-col md:items-center md:justify-start md:gap-3 lg:flex-col lg:items-start lg:justify-start lg:pt-4">
        {navLinks.map((link, index) => (
          <Link
            key={`${link.name}-${index}`}
            className={`flex items-center gap-4 px-5 py-3 text-3xl font-semibold transition-colors hover:cursor-pointer ${pathname === link.href ? "text-blue-400" : "text-black"} `}
            href={link.href}
          >
            {link.icon}
            <span className="hidden lg:inline-block">{link.name}</span>
          </Link>
        ))}
      </nav>
      <div className="inline-block md:pt-4 lg:pt-4">
        <SignOutButton />
      </div>
      <div className="inline-block sm:inline-block sm:pl-1 md:inline-block md:pt-4 lg:hidden">
        <UserAvator
          // @ts-ignore
          user={authData}
        />
      </div>
    </div>
  );
}

export default Sidebar;
