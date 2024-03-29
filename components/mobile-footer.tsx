"use client";

import useConversation from "@/hooks/use-conversation";
import useRoutes from "@/hooks/use-routes";
import React from "react";
import MobileItem from "./mobile-item";

function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }
  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((item) => (
        <MobileItem
          key={item.href}
          href={item.href}
          active={item.active}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}

export default MobileFooter;
