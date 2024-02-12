import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const session = useSession();
  if (!session) return;
  return session.data?.user;
}
