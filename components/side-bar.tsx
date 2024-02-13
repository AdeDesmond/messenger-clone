import React from "react";
import DesktopSideBar from "./desktop-sidebar";
import MobileFooter from "./mobile-footer";
import getCurrentUser from "@/lib/get-current-user";
interface SideBarProps {
  children: React.ReactNode;
}
async function SideBar({ children }: SideBarProps) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSideBar currentUser={currentUser} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default SideBar;
DesktopSideBar;
