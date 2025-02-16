"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInput from "../chat/ChatInput";
import {
  getMessagesOfConversation,
  SendMessage,
  getUserByName,
} from "@/app/_services/fetchDataAPI";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { FormatTime } from "@/app/_utils/FormatData";
import { useSocket } from "@/app/_context/getSocket";

interface Message {
  _id: string;
  message: string;
  createdAt: string;
  isCurrentUser: boolean;
}

interface Participant {
  name: string;
  ProfileImage: string;
}

interface ConversationData {
  messages: Message[];
  participants: Participant[];
}

interface ChatWindowProps {
  chatUser: string;
}

export default function ChatWindow({ chatUser }: ChatWindowProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { onlineUsers } = useSocket();
  console.log("onlineUsers", onlineUsers);
  console.log("chatUser", chatUser);

  // Fetch user details including ID
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery(["user", chatUser], () => getUserByName(chatUser), {
    enabled: !!chatUser,
  });
  const isOnline = onlineUsers.includes(userData?._id);
  const {
    data: ConversationData,
    error,
    isLoading,
  } = useQuery<ConversationData>(
    ["Conversation", chatUser],
    () => getMessagesOfConversation(chatUser),
    {
      enabled: !!chatUser,
      refetchInterval: 3000, // Poll every 3 seconds for new messages
    },
  );

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [ConversationData?.messages]);

  if (isLoading || userLoading) return <Spinner />;
  if (error || userError) return <div>Error loading messages</div>;

  const messages = ConversationData?.messages || [];
  const avatar =
    ConversationData?.participants.filter(
      (participant: Participant) => participant.name == chatUser,
    )[0]?.ProfileImage || "";
  return (
    <div className="flex h-full flex-col">
      {/* Chat header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10">
            <Image
              src={avatar}
              alt={`${chatUser} avatar`}
              layout="fill"
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="font-semibold">{chatUser}</h2>
            {isOnline ? (
              <p className="text-sm text-green-500">Online</p>
            ) : (
              <p className="text-sm text-gray-500">Offline</p>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message: Message) => (
            <div
              key={message._id}
              className={`flex ${
                message.isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isCurrentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{message.message}</p>
                <p
                  className={`text-right text-xs ${
                    message.isCurrentUser ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {FormatTime(message.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Chat input */}
      <div className="border-t border-gray-200 p-4">
        <ChatInput chatUser={chatUser} />
      </div>
    </div>
  );
}
