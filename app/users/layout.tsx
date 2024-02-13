import SideBar from "@/components/side-bar";
import getUsers from "@/lib/get-users";
import React from "react";
import UsersList from "./_components/user-list";
interface UsersLayoutProps {
  children: React.ReactNode;
}
async function UsersLayout({ children }: UsersLayoutProps) {
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <UsersList users={users} />
        {children}
      </div>
    </SideBar>
  );
}

export default UsersLayout;
