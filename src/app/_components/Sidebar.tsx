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
  const name = authData?.name;
  const ProfileImage = authData?.ProfileImage;
  return (
    <nav className="pt-4">
      <ul className="flex text-4xl sm:flex sm:items-center sm:justify-evenly md:flex-col md:items-center md:justify-start md:gap-3 lg:flex-col lg:items-start lg:justify-start">
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

        <li className="inline-block">
          <SignOutButton />
        </li>
        <li className="sm:inline-block md:inline-block lg:hidden">
          <UserAvator name={name} ProfileImage={ProfileImage} size={14} />
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
