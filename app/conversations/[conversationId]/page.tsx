import EmptyState from "@/components/empty-state";
import getConversationById from "@/lib/get-conversationby-id";
import getMessages from "@/lib/get-messages";
import React from "react";
import Header from "./_components/header";
import Body from "./_components/body";
import ChatForm from "./_components/form";

interface ConversationIdPageProps {
  conversationId: string;
}

async function ConversationIdPage({
  params,
}: {
  params: ConversationIdPageProps;
}) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <ChatForm />
      </div>
    </div>
  );
}

export default ConversationIdPage;
