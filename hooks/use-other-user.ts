import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useMemo } from "react";
import { useCurrentUser } from "./use-current-user";

export function useOtherUser(
  conversation: FullConversationType | { users: User[] }
) {
  const session = useCurrentUser();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.email;
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    return otherUser[0];
  }, [session, conversation]);

  return otherUser;
}
