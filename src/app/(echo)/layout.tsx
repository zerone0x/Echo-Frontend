"use client";
import ReactQueryProvider from "@/app/_utils/ReactQueryProvider";
import { AuthProvider } from "@/app/_utils/getLogin";
import { SearchProvider } from "@/app/_utils/SearchContext";
import { PublishProvider } from "@/app/_utils/getPublishType";
import { ReactQueryDevtools } from "react-query/devtools";
import { SocketProvider } from "../_context/getSocket";
export default function ContextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <SocketProvider>
          <SearchProvider>
            <PublishProvider>{children}</PublishProvider>
          </SearchProvider>
        </SocketProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
