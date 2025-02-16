"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/_utils/getLogin";
import ChatList from "@/app/_components/chat/ChatList";

export default function Chat() {
  const { currentUserId } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r border-gray-200">
        <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      </div>

      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <p className="text-lg text-gray-600">
            Select a chat to start messaging
          </p>
        </div>
      </div>
    </div>
  );
}
