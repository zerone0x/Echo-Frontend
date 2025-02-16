"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IoSend } from "react-icons/io5";
import { SendMessage } from "@/app/_services/fetchDataAPI";
import { useQueryClient, useMutation } from "react-query";

interface ChatInputProps {
  chatUser: string;
}

export default function ChatInput({ chatUser }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation(
    (messageText: string) => SendMessage(chatUser, messageText),
    {
      onSuccess: () => {
        // Invalidate and refetch conversation data
        queryClient.invalidateQueries(["Conversation", chatUser]);
      },
      onError: (error) => {
        console.error("Failed to send message:", error);
        // You can add toast notification here for error handling
      },
    },
  );

  const handleSend = () => {
    if (message.trim()) {
      sendMessageMutation.mutate(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex space-x-2">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="min-h-[50px] flex-1 resize-none"
        disabled={sendMessageMutation.isLoading}
      />
      <Button
        onClick={handleSend}
        className="h-[50px] w-[50px] rounded-full p-0"
        disabled={!message.trim() || sendMessageMutation.isLoading}
      >
        <IoSend className="h-5 w-5" />
      </Button>
    </div>
  );
}
