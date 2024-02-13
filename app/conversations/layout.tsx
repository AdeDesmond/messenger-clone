import SideBar from "@/components/side-bar";
import React from "react";
import ConversationList from "./_components/conversation-list";
import { getConversation } from "@/lib/get-conversations";

interface ConversationsLayoutProps {
  children: React.ReactNode;
}

async function ConversationLayout({ children }: ConversationsLayoutProps) {
  const conversations = await getConversation();
  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}

export default ConversationLayout;
