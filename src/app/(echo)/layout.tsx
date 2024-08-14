"use client";
import LeftBar from "@/app/_components/LeftBar";
import Sidebar from "@/app/_components/Sidebar";
import ReactQueryProvider from "@/app/_utils/ReactQueryProvider";
import { AuthProvider } from "../_utils/getLogin";
import Header from "../_components/Header";
import { SearchProvider } from "../_utils/SearchContext";
import { PublishProvider } from "../_utils/getPublishType";
import Link from "next/link";
import { FaPen } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { toast } from "react-toastify";

export default function EchoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  // const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/getUserJwt");
        const userName = await response.json();

        if (!userName) {
          // console.log(pathname);
          // setToastShown(true)
          // console.log('================================');
          // toast.error('Please sign up or login first')
          router.push("/");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchUser();
  }, [router, pathname]);
  if (loading) {
    return <Loading />;
  }

  return (
    <ReactQueryProvider>
      <AuthProvider>
        <SearchProvider>
          <PublishProvider>
            <div className="grid h-screen gap-4 bg-[#FAF8F1] sm:gap-6 sm:px-0 md:grid-cols-[0fr_2fr_0.5fr] md:gap-8 md:px-4 lg:grid-cols-[0.7fr_0.7fr_0.7fr] lg:gap-8 lg:px-20">
              <div className="h-full overflow-hidden">
                <LeftBar />
              </div>

              <main className="overflow-scroll border-l-2 border-r-2 lg:min-w-[500px]">
                <Header />
                <div className="min-h-screen">{children}</div>
              </main>

              <div className="h-full overflow-hidden">
                <Sidebar />
              </div>
            </div>
            <Link
              href={`/publish`}
              className="fixed bottom-1/10 right-1/10 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#CC3355] text-white shadow-lg hover:bg-[#CC3355] focus:outline-none focus:ring-2 focus:ring-[#CC3355] lg:hidden"
            >
              <FaPen />
            </Link>
          </PublishProvider>
        </SearchProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
