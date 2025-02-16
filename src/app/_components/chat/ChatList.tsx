"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "react-query";
import {
  getConversationDetails,
  searchFeeds,
} from "@/app/_services/fetchDataAPI";
import Spinner from "../Spinner";
import { FormatTime } from "@/app/_utils/FormatData";
import { useRouter } from "next/navigation";

interface ChatListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({
  selectedChat,
  onSelectChat,
}: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const {
    data: ConversationDetails,
    error,
    isLoading: isConversationLoading,
  } = useQuery(["ChatList"], () => getConversationDetails(), {});

  console.log(ConversationDetails);

  // const filteredChats = mockChats.filter((chat) =>
  //   chat.username.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  const filteredChats = ConversationDetails;
  return (
    <div className="flex h-full flex-col">
      {/* Search bar */}
      <div className="p-4">
        <Input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      {isConversationLoading ? (
        <Spinner />
      ) : (
        <ScrollArea className="flex-1">
          <div className="space-y-2 p-4">
            {filteredChats.map((chat: any) => (
              <div
                key={chat.conversationId}
                className={`flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-100 ${
                  selectedChat === chat.conversationId ? "bg-gray-100" : ""
                }`}
                onClick={() => router.push(`/chat/${chat.otherUsername}`)}
              >
                <div className="relative h-12 w-12">
                  <Image
                    src={chat.otherUserAvatar}
                    alt={chat.otherUsername}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{chat.otherUsername}</h3>
                    <span className="text-sm text-gray-500">
                      {/* // need to format the date */}
                      {FormatTime(chat.lastMessageTime)}
                    </span>
                  </div>
                  <p className="truncate text-sm text-gray-600">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
