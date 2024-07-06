"use client";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaStar } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoBookmarkSharp, IoEarth } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import logo from "../../../public/logo.png";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { navLinks } from "../_config/data";

function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col text-4xl">
      <ul>
        <li>
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
              className={`flex items-center gap-4 px-5 py-3 text-3xl font-semibold transition-colors hover:cursor-pointer ${pathname === link.href ? "text-blue-400" : "text-primary-800"}`}
              href={link.href}
            >
              {link.icon}
              <span className="hidden md:inline-block">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <SignOutButton />
    </nav>
  );
}

export default Sidebar;
