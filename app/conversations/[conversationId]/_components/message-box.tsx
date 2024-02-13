"use client";

import Avatar from "@/components/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}
function MessageBox({ data, isLast }: MessageBoxProps) {
  const session = useCurrentUser();
  const isOwn = session?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = cn("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = cn(isOwn && "order-2");
  const body = cn("flex flex-col gap-2", isOwn && "items-end");
  const message = cn(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data?.image ? "rounded-md pb-0" : "rounded-full py-2 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.created_at), "p")}
          </div>
        </div>
        <div className={message}>
          {data?.image ? (
            <Image
              src={data.image}
              alt="image"
              height={288}
              width={288}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
}

export default MessageBox;
