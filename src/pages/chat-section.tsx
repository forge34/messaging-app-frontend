import "../styles/css/chat-section.css";
import ChatCard from "../components/chat-card";
import SearchInput from "../components/search-input";
import { useQuery } from "@tanstack/react-query";
import { getUserConversations } from "../utils/queries";
import { ConversationSchema } from "../utils/schema";
import { Outlet } from "react-router-dom";
import { useMemo } from "react";
import { last } from "../utils/functions";

export default function ChatSection() {
  const { data } = useQuery(getUserConversations());

  const sortedConversation = useMemo(() => {
    return data?.sort((a: ConversationSchema, b: ConversationSchema) => {
      if (!last(a.messages) || !last(b.messages)) return 0;

      if (last(a.messages)?.createdAt > last(b.messages)?.createdAt) {
        return -1;
      } else if (last(a.messages)?.createdAt < last(b.messages)?.createdAt) {
        return 1;
      }

      return 0;
    });
  }, [data]);

  return (
    <div className="chat-section">
      <div className="chat-sidebar">
        <h1>Chats</h1>
        <SearchInput></SearchInput>

        {sortedConversation?.map((conversation: ConversationSchema) => {
          const lastMsg =
            conversation?.messages[conversation.messages.length - 1];
          return (
            <ChatCard
              conversationImg={conversation.conversationImg as string}
              conversationTitle={conversation.title}
              conversationLastMsg={lastMsg?.body}
              conversationId={conversation.id}
              key={conversation.id}
              conversationLastSent={lastMsg?.createdAt}
            ></ChatCard>
          );
        })}
      </div>
      <Outlet></Outlet>
    </div>
  );
}
