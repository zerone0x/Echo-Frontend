"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/_utils/getLogin";
import ChatList from "@/app/_components/chat/ChatList";
import ChatWindow from "@/app/_components/chat/ChatWindow";
import { ParamsProps } from "@/app/_config/type";

function page({ params }: ParamsProps) {
  const username = params.username;
  const { currentUserId } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="flex h-screen">
      {/* Chat list sidebar */}
      <div className="w-1/3 border-r border-gray-200">
        <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      </div>

      {/* Chat window */}
      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <ChatWindow chatUser={username} />
        </div>
      </div>
    </div>
  );
}

export default page;
